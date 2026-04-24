const fallbackContractAddress = '0x1111111111111111111111111111111111111111';

export const wearToEarnConfig = {
  contractAddress: import.meta.env.VITE_WEAR_TO_EARN_CONTRACT || fallbackContractAddress,
  chainId: Number(import.meta.env.VITE_WEAR_TO_EARN_CHAIN_ID || 44787),
  rpcUrl:
    import.meta.env.VITE_WEAR_TO_EARN_RPC_URL || 'https://alfajores-forno.celo-testnet.org'
} as const;

export function isContractConfigured() {
  return wearToEarnConfig.contractAddress !== fallbackContractAddress;
}
