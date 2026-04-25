import { getProducts } from '$lib/shopify';
import type { PageServerLoad } from './$types';

export const prerender = false;

export const load: PageServerLoad = async () => {
  const shopifyProducts = await getProducts(8);
  return {
    shopifyProducts
  };
};
