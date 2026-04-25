import { createCheckout, getFirstVariantId } from '$lib/shopify';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
  const { items } = await request.json();

  if (!items || items.length === 0) {
    return json({ error: 'Cart is empty' }, { status: 400 });
  }

  try {
    // Resolve handles to variant IDs from Shopify
    const lineItems = await Promise.all(
      items.map(async (item: { handle: string, quantity: number }) => {
        const variantId = await getFirstVariantId(item.handle);
        return {
          variantId,
          quantity: item.quantity
        };
      })
    );

    // Filter out items where variantId couldn't be resolved
    const validItems = lineItems.filter(item => !!item.variantId);

    if (validItems.length === 0) {
      return json({ error: 'Could not find products in Shopify' }, { status: 404 });
    }

    const url = await createCheckout(validItems);

    return json({ url });
  } catch (error) {
    console.error('Checkout creation error:', error);
    return json({ error: 'Internal server error' }, { status: 500 });
  }
};
