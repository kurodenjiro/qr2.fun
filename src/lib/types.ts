export type AmountOption = {
  label: string;
  value: number | 'custom';
};

export type DisplayMode = 'light' | 'dark';

export type ProfileData = {
  id: string;
  name: string;
  bio: string;
  walletAddress: `0x${string}`;
  avatarLetter: string;
  amountPresets: number[];
  stats: {
    totalReceivedCusd: string;
    totalClaims: number;
    reputation: number;
    rank: string;
  };
  labels: string[];
  badges: string[];
};

export type Product = {
  id: string;
  name: string;
  price: number;
  priceLabel: string;
  image: string;
  palette: string[];
  category: string;
  tags: string[];
  shortDescription: string;
  description: string;
  sizes: string[];
};
