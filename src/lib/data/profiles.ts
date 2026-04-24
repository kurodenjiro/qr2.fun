import type { ProfileData } from '$lib/types';

const profiles: Record<string, ProfileData> = {
  'kuro-exe': {
    id: 'kuro-exe',
    name: 'kuro.exe',
    bio: 'offline body / online soul',
    walletAddress: '0xa8d6efbf08c2f5d84f0d9b0e6f6d6b7d4b6e4b11',
    avatarLetter: 'K',
    amountPresets: [10000, 20000, 50000],
    stats: {
      totalReceivedCusd: '128.7',
      totalClaims: 12,
      reputation: 3240000,
      rank: '#32'
    },
    labels: ['style', 'tech', 'culture'],
    badges: ['$299', 'DROP', 'BLACK FRIDAY']
  },
  'nova-muse': {
    id: 'nova-muse',
    name: 'nova.muse',
    bio: 'quiet rules / loud silhouette',
    walletAddress: '0x76e1d2d296bf4b07d0a9f4db1e1a88f0178ce222',
    avatarLetter: 'N',
    amountPresets: [20000, 50000, 100000],
    stats: {
      totalReceivedCusd: '302.4',
      totalClaims: 28,
      reputation: 7700000,
      rank: '#08'
    },
    labels: ['editorial', 'drop', 'identity'],
    badges: ['NEW DROP', 'VIP', 'SCAN']
  }
};

export function getProfileById(id: string): ProfileData | undefined {
  return profiles[id];
}

export function getProfileIds() {
  return Object.keys(profiles);
}
