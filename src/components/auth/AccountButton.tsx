"use client";

import { useAccount as useWagmiAccount, useDisconnect as useWagmiDisconnect } from "wagmi";
import { useAccount as useStarknetAccount, useDisconnect as useStarknetDisconnect } from "@starknet-react/core";
import { useState } from "react";
import LoginModal from "./LoginModal";

export default function AccountButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { address: wagmiAddress, isConnected: isWagmiConnected } = useWagmiAccount();
  const { address: starknetAddress, isConnected: isStarknetConnected } = useStarknetAccount();
  
  const { disconnect: wagmiDisconnect } = useWagmiDisconnect();
  const { disconnect: starknetDisconnect } = useStarknetDisconnect();

  const isConnected = isWagmiConnected || isStarknetConnected;
  
  // Truncate address for display
  const displayAddress = isWagmiConnected 
    ? `${wagmiAddress?.slice(0, 6)}...${wagmiAddress?.slice(-4)}`
    : isStarknetConnected 
      ? `${starknetAddress?.slice(0, 6)}...${starknetAddress?.slice(-4)}`
      : null;

  const handleDisconnect = () => {
    if (isWagmiConnected) wagmiDisconnect();
    if (isStarknetConnected) starknetDisconnect();
  };

  if (!isConnected) {
    return (
      <>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 text-primary hover:bg-primary hover:text-on-primary transition-all group active:scale-95 duration-200"
        >
          <span className="material-symbols-outlined text-xl group-hover:rotate-12 transition-transform">account_circle</span>
          <span className="font-headline font-bold text-xs uppercase tracking-widest hidden md:inline">Connect</span>
        </button>
        <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex flex-col items-end hidden sm:flex">
        <span className="font-label text-[8px] text-zinc-500 uppercase tracking-widest">
          {isWagmiConnected ? "CELO_UPLINK" : "STARKNET_NODE"} // ACTIVE
        </span>
        <span className="font-mono text-[10px] text-primary">{displayAddress}</span>
      </div>
      <button 
        onClick={handleDisconnect}
        className="p-2 bg-zinc-900 border border-zinc-800 hover:border-red-500/50 hover:text-red-400 transition-all active:scale-95"
        title="Disconnect"
      >
        <span className="material-symbols-outlined text-xl">logout</span>
      </button>
    </div>
  );
}
