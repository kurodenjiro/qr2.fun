import type { Product } from '$lib/types';

export const products: Product[] = [
  {
    id: 'short-jacket',
    name: 'Short Jacket',
    price: 299,
    priceLabel: '$299',
    image: '/assets/product-jacket-board.png',
    palette: ['#ff8fae', '#cdb4ff', '#b6e3f4', '#a7ebd6', '#111111'],
    category: 'tops',
    tags: ['new drop', 'streetwear'],
    shortDescription: 'Pink / M',
    description: 'A gloss-soft bomber with editorial volume and bright confidence.',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 'cargo-parachute-pants',
    name: 'Cargo Parachute',
    price: 159,
    priceLabel: '$159',
    image: '/assets/product-pants-board.png',
    palette: ['#a7ebd6', '#c6f26d', '#fafafb'],
    category: 'bottoms',
    tags: ['minimal', 'utility'],
    shortDescription: 'Mint / L',
    description: 'Wide leg volume with soft-tech drape for motion-rich fits.',
    sizes: ['S', 'M', 'L']
  },
  {
    id: 'light-suit',
    name: 'Light Suit',
    price: 319,
    priceLabel: '$319',
    image: '/assets/product-suit-board.png',
    palette: ['#cdb4ff', '#fafafb', '#111111'],
    category: 'tops',
    tags: ['tailored', 'editorial'],
    shortDescription: 'Lavender / M',
    description: 'A clean lavender tailored set made for polished, high-contrast styling.',
    sizes: ['S', 'M', 'L']
  },
  {
    id: 'chunky-sneakers',
    name: 'Chunky Sneakers',
    price: 129,
    priceLabel: '$129',
    image: '/assets/product-sneaker-board.png',
    palette: ['#fafafb', '#cdb4ff', '#111111'],
    category: 'shoes',
    tags: ['sport', 'daily'],
    shortDescription: 'White / 42',
    description: 'Layered sole sneakers for expressive styling and easy comfort.',
    sizes: ['39', '40', '41', '42']
  }
];

export function getProductById(id: string) {
  return products.find((product) => product.id === id);
}

export const categories = [
  { id: 'tops', label: 'Tops', icon: '⌇' },
  { id: 'shoes', label: 'Shoes', icon: '◌' },
  { id: 'accessories', label: 'Accessories', icon: '✦' }
] as const;

export const searchSuggestions = ['Streetwear', 'Minimal', 'Y2K', 'Soft girl', 'Date night', 'Vacation'];
