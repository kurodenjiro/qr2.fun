import { shopifyFetch } from '$lib/shopify';
import { json } from '@sveltejs/kit';

export async function GET() {
  const handle = 'ethreal-tee';
  const query = `
    query getProduct($handle: String!) {
      product(handle: $handle) {
        id
        title
        handle
      }
    }
  `;

  const response = await shopifyFetch({ query, variables: { handle } });
  
  return json({
    handle,
    response
  });
}
