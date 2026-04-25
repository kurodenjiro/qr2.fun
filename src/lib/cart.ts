import { writable } from 'svelte/store';
import type { Product } from './types';

export type CartItem = {
  product: Product;
  quantity: number;
  selectedSize?: string;
};

function createCart() {
  const { subscribe, set, update } = writable<CartItem[]>([]);

  return {
    subscribe,
    addItem: (product: Product, size?: string) => update(items => {
      const existing = items.find(i => i.product.id === product.id && i.selectedSize === size);
      if (existing) {
        existing.quantity += 1;
        return [...items];
      }
      return [...items, { product, quantity: 1, selectedSize: size }];
    }),
    removeItem: (productId: string, size?: string) => update(items => 
      items.filter(i => !(i.product.id === productId && i.selectedSize === size))
    ),
    updateQuantity: (productId: string, quantity: number, size?: string) => update(items => {
      const item = items.find(i => i.product.id === productId && i.selectedSize === size);
      if (item) item.quantity = Math.max(1, quantity);
      return [...items];
    }),
    clear: () => set([])
  };
}

export const cart = createCart();
