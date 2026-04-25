import { getProducts } from '$lib/shopify';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
  const query = url.searchParams.get('q') || '';
  // Since Storefront API doesn't have a simple keyword search without more complex setup,
  // we'll fetch products and filter locally for now, 
  // or use the specialized search query if available.
  const shopifyProducts = await getProducts(20);
  
  const results = query 
    ? shopifyProducts.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) || 
        p.description.toLowerCase().includes(query.toLowerCase())
      )
    : shopifyProducts;

  return {
    results
  };
};
