export const wearToEarnAbi = [
  {
    type: 'function',
    stateMutability: 'payable',
    name: 'tip',
    inputs: [{ name: 'to', type: 'address' }],
    outputs: []
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    name: 'claimReward',
    inputs: [],
    outputs: []
  },
  {
    type: 'function',
    stateMutability: 'view',
    name: 'getUser',
    inputs: [{ name: 'user', type: 'address' }],
    outputs: [
      { name: 'totalReceived', type: 'uint256' },
      { name: 'totalClaims', type: 'uint256' },
      { name: 'reputation', type: 'uint256' }
    ]
  }
] as const;
