import { env } from '$env/dynamic/private';
import type { Product } from './types';

export async function shopifyFetch({ query, variables = {} }: { query: string, variables?: any }) {
  const domain = env.SHOPIFY_STORE_DOMAIN || 'ethreal-7.myshopify.com';
  // Strip https:// if it accidentally slipped in
  const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/\/$/, '');
  const endpoint = `https://${cleanDomain}/api/2024-01/graphql.json`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  };

  // Try Public token first for Storefront API, then Private if Public fails or is missing
  if (env.SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
    headers['X-Shopify-Storefront-Access-Token'] = env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  } else if (env.SHOPIFY_PRIVATE_ACCESS_TOKEN) {
    headers['Shopify-Storefront-Private-Token'] = env.SHOPIFY_PRIVATE_ACCESS_TOKEN;
  }

  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({ query, variables })
    });

    const responseBody = await result.json();

    if (!result.ok || responseBody.errors) {
      console.error('Shopify API Error:', responseBody.errors || result.statusText);
      return {
        status: result.status,
        error: responseBody.errors ? responseBody.errors[0].message : result.statusText,
        body: responseBody,
        urlUsed: endpoint
      };
    }

    return {
      status: result.status,
      body: responseBody
    };
  } catch (error) {
    console.error('Error fetching from Shopify:', error);
    return {
      status: 500,
      error: error.message
    };
  }
}

export function mapShopifyProduct(node: any): Product {
  return {
    id: node.handle, // Use handle as ID for cleaner URLs
    name: node.title,
    price: parseFloat(node.priceRange.minVariantPrice.amount),
    priceLabel: `$${Math.round(parseFloat(node.priceRange.minVariantPrice.amount))}`,
    image: node.images.edges[0]?.node.url || '',
    palette: ['#fafafb', '#ebd5f7', '#a7ebd6'], // Default palette for now
    category: node.productType || 'Uncategorized',
    tags: node.tags || [],
    shortDescription: node.description?.slice(0, 50) + '...',
    description: node.description || '',
    sizes: node.variants?.edges.map((v: any) => v.node.title) || []
  };
}

export async function getProducts(first = 10) {
  const query = `
    {
      products(first: ${first}) {
        edges {
          node {
            id
            title
            handle
            description
            productType
            tags
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
            variants(first: 10) {
              edges {
                node {
                  title
                }
              }
            }
          }
        }
      }
    }
  `;

  const response = await shopifyFetch({ query });
  if (response.body?.data?.products) {
    return response.body.data.products.edges.map((edge: any) => mapShopifyProduct(edge.node));
  }
  return [];
}

export async function getProductByHandle(handle: string) {
  const query = `
    query getProduct($handle: String!) {
      product(handle: $handle) {
        id
        title
        handle
        description
        productType
        tags
        images(first: 5) {
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
        variants(first: 10) {
          edges {
            node {
              title
            }
          }
        }
      }
    }
  `;

  const response = await shopifyFetch({ query, variables: { handle } });
  if (response.body?.data?.product) {
    return mapShopifyProduct(response.body.data.product);
  }
  return null;
}

export async function createCheckout(items: { variantId: string, quantity: number }[]) {
  const query = `
    mutation checkoutCreate($input: CheckoutCreateInput!) {
      checkoutCreate(input: $input) {
        checkout {
          webUrl
        }
        checkoutUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  const input = {
    lineItems: items.map(item => ({
      variantId: item.variantId,
      quantity: item.quantity
    }))
  };

  const response = await shopifyFetch({ query, variables: { input } });
  return response.body?.data?.checkoutCreate?.checkout?.webUrl;
}

export async function getFirstVariantId(handle: string) {
  const query = `
    query getVariant($handle: String!) {
      product(handle: $handle) {
        variants(first: 1) {
          edges {
            node {
              id
            }
          }
        }
      }
    }
  `;

  const response = await shopifyFetch({ query, variables: { handle } });
  return response.body?.data?.product?.variants?.edges[0]?.node?.id;
}
