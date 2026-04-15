"use client";

import { useState, useEffect } from "react";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { motion, AnimatePresence } from "framer-motion";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { openConnectModal } = useConnectModal();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isOpen || !isClient) return null;

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      {/* Backdrop - darker and more blur for focus */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/95 backdrop-blur-2xl z-0" 
      />
      
      {/* Modal - Absolute Center */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 40 }}
        className="relative w-full max-w-lg bg-zinc-950 border border-primary/30 p-8 sm:p-14 shadow-[0_0_150px_rgba(143,245,255,0.15)] z-10"
      >
        {/* Decorative Corner */}
        <div className="absolute top-0 right-0 w-32 h-32 border-t border-r border-secondary/20 pointer-events-none"></div>
        
        <div className="space-y-12 relative">
          <div className="space-y-3">
            <div className="font-label text-primary text-[11px] tracking-[0.6em] uppercase opacity-70">WAGMI // u.01</div>
            <h2 className="text-6xl font-black font-headline tracking-tighter italic uppercase text-white leading-[0.9]">WAGMI</h2>
          </div>

          <div className="flex flex-col gap-8">
            <button
              onClick={() => {
                openConnectModal?.();
                onClose();
              }}
              className="w-full group relative flex items-center justify-between p-8 bg-zinc-900 border border-zinc-800 hover:border-primary transition-all duration-300"
            >
              <div className="space-y-1 text-left relative z-10">
                <div className="font-headline font-bold text-2xl italic text-white uppercase group-hover:text-primary transition-colors">
                  WAGMI
                </div>
                <div className="font-label text-[10px] text-zinc-500 uppercase tracking-widest">
                  WALLET: Celo / WalletConnect / Injected
                </div>
              </div>
              <span className="material-symbols-outlined text-primary/40 group-hover:text-primary transition-colors relative z-10 text-4xl">
                account_balance_wallet
              </span>
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-primary group-hover:w-full transition-all duration-700"></div>
            </button>

          </div>

          <button 
            onClick={onClose}
            className="w-full py-6 font-label text-[13px] text-zinc-600 hover:text-white uppercase tracking-[0.5em] transition-all hover:bg-white/5"
          >
            [ ABORT_WAGMI_STREAMS ]
          </button>
        </div>
      </motion.div>
    </div>
  );

  // Use a portal to ensure the modal isn't constrained by any parent containers
  // This is especially important if ancestors have transforms or perspectives
  return typeof document !== "undefined" 
    ? require("react-dom").createPortal(
        <AnimatePresence>
          {isOpen && modalContent}
        </AnimatePresence>,
        document.body
      )
    : null;
}
