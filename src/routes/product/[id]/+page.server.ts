import { getProductByHandle, getProducts } from '$lib/shopify';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const prerender = false;

export const load: PageServerLoad = async ({ params }) => {
  let product = await getProductByHandle(params.id);

  // Fallback: search in products list if direct handle lookup fails
  if (!product) {
    const allProducts = await getProducts(20);
    product = allProducts.find(p => p.id === params.id) || null;
  }

  if (!product) {
    throw error(404, 'Product not found');
  }

  const all = await getProducts(4);

  return {
    product,
    related: all.filter((item) => item.id !== product.id).slice(0, 3)
  };
};
