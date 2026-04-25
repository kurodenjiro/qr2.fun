import { getProducts } from '$lib/shopify';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const shopifyProducts = await getProducts(8);
  return {
    shopifyProducts
  };
};
