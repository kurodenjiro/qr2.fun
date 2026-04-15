export type CheckoutItem = {
  id: string;
  name: string;
  type: string;
  styleId: string;
  handle: string;
  image: string;
  price: number;
  quantity: number;
};

export type CheckoutAddress = {
  fullName: string;
  line1: string;
  line2?: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  phone?: string;
};

export type CheckoutOrder = {
  id: string;
  items: CheckoutItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  paymentMethod: "card" | "wallet";
  createdAt: string;
  shippingAddress?: CheckoutAddress;
};

const CART_KEY = "ethreal_checkout_cart";
const ORDER_KEY = "ethreal_checkout_order";
const CHECKOUT_UPDATE_EVENT = "ethreal-checkout-update";

const DEFAULT_CART: CheckoutItem[] = [
  {
    id: "sn_0921-23",
    name: "Neon Drift Tee",
    type: "t-shirt",
    styleId: "neon-drift",
    handle: "@vectorwave",
    price: 55,
    quantity: 1,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDnqqiAbDJsHbjmzjbkpu1hTOx_t-sx_FLf4yxm_XkZOrBS6dfn47f04L3Uy_I0SES4tUf0PTrSy8Ta8lQS1Xu_KE4EecfxJXzeZCb9HZG6mWXcJJSZBjr8YGkhNtJOZrMIYz_hdgm399bzmXJhWgGDpp4iOsTOoG8s1e77ZRijQq7rfSy2ZLKwLQaLJNgheqBGNgXfWsjVAXJel-9a4YnK1SOFucHV2LzrulDpAxE8ewuiBMfDR-q7KlWd6DRXPgiWRWd5FSs4pBE",
  },
  {
    id: "sn_4420-11",
    name: "Grid Runner Hoodie",
    type: "hoodie",
    styleId: "grid-runner",
    handle: "@vectorwave",
    price: 120,
    quantity: 1,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAv5A0QlcaiOo-knDLnZhCJEkt1gPohBuD8_Ko6gkHPy-TY5TbmCIIVqEERwvgWcoQ7lG55n3hVl8s96aYwqizGhD-wqWS9U4oBQ0rYVl_O0iz3NJ_3ZCU3gTmmBVUEjh0yRixGt-ChO6IqcvISX9enGiJlEgK7kAZI5zTrB9UPV8jWnAcaREOg9YYumQIhK50SgAeVkWrBHErC-4myQwBv6a7dWi2teSYvCfZQGs5uuvqFa8bYnt-cYtkI_CTqJBYg71DT2apG3HA",
  },
];

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function readJson<T>(key: string, fallback: T) {
  if (!canUseStorage()) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

function removeItem(key: string) {
  if (!canUseStorage()) return;
  window.localStorage.removeItem(key);
}

function notifyCheckoutUpdate() {
  if (!canUseStorage()) return;
  window.dispatchEvent(new Event(CHECKOUT_UPDATE_EVENT));
}

export function subscribeToCheckoutUpdates(callback: () => void) {
  if (!canUseStorage()) {
    return () => {};
  }

  const handler = () => callback();
  window.addEventListener("storage", handler);
  window.addEventListener(CHECKOUT_UPDATE_EVENT, handler);

  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener(CHECKOUT_UPDATE_EVENT, handler);
  };
}

function makeId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `order_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

export function getDefaultCart() {
  return DEFAULT_CART.map((item) => ({ ...item }));
}

export function getStoredCart() {
  return readJson<CheckoutItem[]>(CART_KEY, getDefaultCart());
}

export function saveStoredCart(items: CheckoutItem[]) {
  writeJson(CART_KEY, items);
  notifyCheckoutUpdate();
}

export function clearStoredCart() {
  removeItem(CART_KEY);
  notifyCheckoutUpdate();
}

export function addItemToCart(item: Omit<CheckoutItem, "quantity"> & { quantity?: number }) {
  const current = getStoredCart();
  const quantity = item.quantity ?? 1;
  const existingIndex = current.findIndex((currentItem) => currentItem.id === item.id);

  if (existingIndex >= 0) {
    const existing = current[existingIndex];
    current[existingIndex] = {
      ...existing,
      quantity: existing.quantity + quantity,
    };
  } else {
    current.push({ ...item, quantity });
  }

  saveStoredCart(current);
  return current;
}

export function createOrder(items: CheckoutItem[], paymentMethod: "card" | "wallet") {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 12 : 0;
  const tax = subtotal * 0.082;
  const total = subtotal + shipping + tax;

  return {
    id: makeId(),
    items,
    subtotal,
    shipping,
    tax,
    total,
    paymentMethod,
    createdAt: new Date().toISOString(),
  } satisfies CheckoutOrder;
}

export function getStoredOrder() {
  return readJson<CheckoutOrder | null>(ORDER_KEY, null);
}

export function saveStoredOrder(order: CheckoutOrder) {
  writeJson(ORDER_KEY, order);
  notifyCheckoutUpdate();
}

export function clearStoredOrder() {
  removeItem(ORDER_KEY);
  notifyCheckoutUpdate();
}

export function saveShippingAddress(orderId: string, address: CheckoutAddress) {
  const order = getStoredOrder();
  if (!order || order.id !== orderId) return null;

  const nextOrder = {
    ...order,
    shippingAddress: address,
  };

  saveStoredOrder(nextOrder);
  notifyCheckoutUpdate();
  return nextOrder;
}
