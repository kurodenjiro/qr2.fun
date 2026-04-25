import { shopifyFetch } from '$lib/shopify';
import { json } from '@sveltejs/kit';

export async function GET() {
  const query = `
  {
    products(first: 5) {
      edges {
        node {
          id
          title
          handle
          description
          images(first: 1) {
            edges {
              node {
                url
              }
            }
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
  `;

  const response = await shopifyFetch({ query });
  return json(response);
}
