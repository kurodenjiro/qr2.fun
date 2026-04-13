"use client";

import { ReactNode, useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http, createConfig, WagmiProvider } from "wagmi";
import { celo, celoSepolia } from "wagmi/chains";
import { coinbaseWallet, injected, walletConnect } from "wagmi/connectors";

// Starknet imports
import { mainnet, sepolia } from "@starknet-react/chains";
import {
  StarknetConfig,
  jsonRpcProvider,
  argent,
  braavos,
  useInjectedConnectors,
  voyager
} from "@starknet-react/core";
// We use starknetkit's connect function directly in the UI for v3 compatibility

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
  const { connectors } = useInjectedConnectors({
    recommended: [argent(), braavos()],
    includeRecommended: "always",
  });

  return (
    <WagmiProvider config={wagmiConfig}>
      <StarknetConfig
        chains={[mainnet, sepolia]}
        provider={jsonRpcProvider({
          rpc: (chain) => {
            if (chain.id === mainnet.id) {
              return { nodeUrl: "https://starknet-mainnet.public.blastapi.io" };
            }
            return { nodeUrl: "https://starknet-sepolia.public.blastapi.io" };
          },
        })}
        connectors={connectors}
        explorer={voyager}
      >
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </StarknetConfig>
    </WagmiProvider>
  );
}
