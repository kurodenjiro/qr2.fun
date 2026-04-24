import { encodeFunctionData, formatEther, parseEther } from 'viem';
import { wearToEarnAbi } from '$lib/abi/wearToEarn';
import { wearToEarnConfig } from '$lib/config/wearToEarn';

export function isMiniPayAvailable() {
  if (typeof navigator === 'undefined') {
    return false;
  }

  return /minipay/i.test(navigator.userAgent);
}

export function formatCompactVnd(amount: number) {
  return `${amount.toLocaleString('en-US')} VND`;
}

export function vndToCeloValue(vndAmount: number) {
  const celoAmount = Math.max(vndAmount / 25000, 0.1);
  return parseEther(celoAmount.toFixed(4));
}

export function buildTipTransaction(walletAddress: `0x${string}`, vndAmount: number) {
  const value = vndToCeloValue(vndAmount);
  const data = encodeFunctionData({
    abi: wearToEarnAbi,
    functionName: 'tip',
    args: [walletAddress]
  });

  return {
    contractAddress: wearToEarnConfig.contractAddress,
    chainId: wearToEarnConfig.chainId,
    data,
    rpcUrl: wearToEarnConfig.rpcUrl,
    value,
    valueDisplay: formatEther(value)
  };
}

export function tryBuildTipTransaction(walletAddress: `0x${string}`, vndAmount: number) {
  try {
    return buildTipTransaction(walletAddress, vndAmount);
  } catch {
    return null;
  }
}

export function buildMiniPayDeepLink(walletAddress: `0x${string}`, vndAmount: number) {
  const tx = buildTipTransaction(walletAddress, vndAmount);
  const params = new URLSearchParams({
    address: tx.contractAddress,
    data: tx.data,
    amount: tx.valueDisplay
  });

  return `minipay://send?${params.toString()}`;
}

export function buildClaimRewardDeepLink() {
  const data = encodeFunctionData({
    abi: wearToEarnAbi,
    functionName: 'claimReward',
    args: []
  });

  const params = new URLSearchParams({
    address: wearToEarnConfig.contractAddress,
    data,
    amount: '0'
  });

  return `minipay://send?${params.toString()}`;
}
