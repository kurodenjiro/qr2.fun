"use client";

import { useMemo } from "react";
import { StarkZap } from "starkzap";
import { useNetwork } from "@starknet-react/core";

export function useStarkzap() {
  const { chain } = useNetwork();

  const starkzap = useMemo(() => {
    // Determine network based on connected chain
    const network = chain?.network === "mainnet" ? "mainnet" : "sepolia";
    return new StarkZap({ network });
  }, [chain]);

  return starkzap;
}
