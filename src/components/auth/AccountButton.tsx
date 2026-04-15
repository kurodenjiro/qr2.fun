"use client";

import { useAccount as useWagmiAccount, useDisconnect as useWagmiDisconnect } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";

export default function AccountButton() {
  const { address: wagmiAddress, isConnected: isWagmiConnected } = useWagmiAccount();
  const { openConnectModal } = useConnectModal();
  const { disconnect: wagmiDisconnect } = useWagmiDisconnect();

  const isConnected = isWagmiConnected;
  
  // Truncate address for display
  const displayAddress = isWagmiConnected
    ? `${wagmiAddress?.slice(0, 6)}...${wagmiAddress?.slice(-4)}`
    : null;

  const handleDisconnect = () => {
    if (isWagmiConnected) wagmiDisconnect();
  };

  if (!isConnected) {
    return (
      <button
        onClick={() => openConnectModal?.()}
        className="flex items-center justify-center gap-1.5 sm:gap-2 h-8 w-8 sm:h-auto sm:w-auto px-0 sm:px-4 py-0 sm:py-2 bg-primary/10 border border-primary/30 text-primary hover:bg-primary hover:text-on-primary transition-all group active:scale-95 duration-200"
      >
        <span className="material-symbols-outlined text-[18px] sm:text-xl group-hover:rotate-12 transition-transform">account_circle</span>
        <span className="font-headline font-bold text-xs uppercase tracking-widest hidden md:inline">Connect</span>
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <div className="flex flex-col items-end hidden sm:flex">
        <span className="font-label text-[8px] text-zinc-500 uppercase tracking-widest">
          CELO_UPLINK // ACTIVE
        </span>
        <span className="font-mono text-[10px] text-primary">{displayAddress}</span>
      </div>
      <button 
        onClick={handleDisconnect}
        className="h-8 w-8 sm:h-auto sm:w-auto p-0 sm:p-2 bg-zinc-900 border border-zinc-800 hover:border-red-500/50 hover:text-red-400 transition-all active:scale-95 flex items-center justify-center"
        title="Disconnect"
      >
        <span className="material-symbols-outlined text-[18px] sm:text-xl">logout</span>
      </button>
    </div>
  );
}
