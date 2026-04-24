import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getProductById, products } from '$lib/data/products';

export function entries() {
  return products.map((product) => ({ id: product.id }));
}

export const load: PageLoad = ({ params }) => {
  const product = getProductById(params.id);

  if (!product) {
    throw error(404, 'Product not found');
  }

  return {
    product,
    related: products.filter((item) => item.id !== product.id).slice(0, 3)
  };
};
