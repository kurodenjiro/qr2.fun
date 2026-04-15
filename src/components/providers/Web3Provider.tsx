"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http, createConfig, WagmiProvider } from "wagmi";
import { celo, celoSepolia } from "wagmi/chains";
import { coinbaseWallet, injected, walletConnect } from "wagmi/connectors";

// 1. Setup QueryClient
const queryClient = new QueryClient();

// 2. Wagmi Configuration
const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID || "YOUR_PROJECT_ID_PLACEHOLDER";
console.log("Web3Provider Init - Project ID:", projectId);

export const wagmiConfig = createConfig({
  ssr: true,
  chains: [celo, celoSepolia],
  connectors: [
    injected(),
    coinbaseWallet(),
    walletConnect({ projectId }),
  ],
  transports: {
    [celo.id]: http(),
    [celoSepolia.id]: http(),
  },
});

export function Web3Provider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
