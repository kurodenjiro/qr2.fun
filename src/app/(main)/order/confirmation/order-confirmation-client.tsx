"use client";

import Link from "next/link";
import { markOrderPaid } from "@/lib/checkout";
import { useState, useSyncExternalStore } from "react";
import { useSearchParams } from "next/navigation";
import {
  CheckoutAddress,
  CheckoutOrder,
  getStoredOrder,
  saveShippingAddress,
  subscribeToCheckoutUpdates,
} from "@/lib/checkout";

const EMPTY_ADDRESS: CheckoutAddress = {
  fullName: "",
  line1: "",
  line2: "",
  city: "",
  region: "",
  postalCode: "",
  country: "",
  phone: "",
};

export default function OrderConfirmationClient() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const order = useSyncExternalStore(
    subscribeToCheckoutUpdates,
    getStoredOrder,
    () => null,
  ) as CheckoutOrder | null;
  const [address, setAddress] = useState<CheckoutAddress>(() => order?.shippingAddress ?? EMPTY_ADDRESS);
  const [isSavingAddress, setIsSavingAddress] = useState(false);

  const activeOrder = order && (!orderId || order.id === orderId) ? order : getStoredOrder();
  const isAddressSaved = Boolean(activeOrder?.shippingAddress);
  const savedAddress = activeOrder?.shippingAddress ?? address;
  const total = activeOrder?.total ?? 0;
  const subtotal = activeOrder?.subtotal ?? 0;
  const shipping = activeOrder?.shipping ?? 0;
  const tax = activeOrder?.tax ?? 0;

  const handleSubmitAddress = () => {
    if (!activeOrder) return;
    setIsSavingAddress(true);
    saveShippingAddress(activeOrder.id, address);
    setIsSavingAddress(false);
  };

  return (
    <main className="min-h-screen pt-32 pb-20 px-12 max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-start">
      <div className="w-full lg:w-3/5 space-y-12">
        <section className="relative p-12 bg-surface-container-low border-l-4 border-secondary">
          <div className="font-label text-xs tracking-[0.3em] text-secondary mb-4 uppercase font-bold">TRANSACTION_SUCCESS // STATUS: COMPLETE</div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8 font-headline italic uppercase text-zinc-100">
            <div className="relative inline-block">
              ORDER_LOCKED
              <span className="absolute top-[2px] left-[2px] -z-10 text-secondary select-none">ORDER_LOCKED</span>
              <span className="absolute top-[-2px] left-[-2px] -z-20 text-tertiary select-none">ORDER_LOCKED</span>
            </div>
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 max-w-xl font-light leading-relaxed">
            Your payment went through. The final step is to confirm the shipping address so we can route the garment to the right place.
          </p>
          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              href="/collections"
              className="bg-primary text-on-primary px-10 py-4 font-bold tracking-widest text-sm uppercase hover:shadow-[0_0_20px_rgba(143,245,255,0.4)] transition-all active:scale-95 group relative"
            >
              <span>BACK TO HUB</span>
              <div className="absolute -right-2 -bottom-2 w-full h-full border border-primary group-hover:right-0 group-hover:bottom-0 transition-all"></div>
            </Link>
            <Link
              href="/cart"
              className="border-2 border-zinc-800 text-zinc-500 px-10 py-4 font-bold tracking-widest text-sm uppercase hover:border-secondary hover:text-secondary transition-all"
            >
              EDIT_CART
            </Link>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-surface-container-high p-8 relative overflow-hidden group border border-zinc-800">
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary/40 group-hover:border-primary/80 transition-all"></div>
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary/40 group-hover:border-primary/80 transition-all"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary/40 group-hover:border-primary/80 transition-all"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary/40 group-hover:border-primary/80 transition-all"></div>

            <div className="font-label text-[10px] tracking-widest text-primary mb-4 uppercase">ORDER_ID</div>
            <div className="text-4xl font-bold font-headline text-zinc-100 italic">
              #{activeOrder?.id?.slice(0, 10).toUpperCase() ?? orderId?.slice(0, 10).toUpperCase() ?? "KNTC-99821X"}
            </div>
            <div className="mt-2 text-zinc-500 font-label text-[10px] uppercase tracking-widest">Keep this signature for tracking.</div>
            <div className="absolute right-[-10px] bottom-[-10px] opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-9xl">qr_code_2</span>
            </div>
          </div>
          <div className="bg-surface-container-high p-8 relative overflow-hidden group border border-zinc-800">
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary/40 group-hover:border-primary/80 transition-all"></div>
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary/40 group-hover:border-primary/80 transition-all"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary/40 group-hover:border-primary/80 transition-all"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary/40 group-hover:border-primary/80 transition-all"></div>

            <div className="font-label text-[10px] tracking-widest text-tertiary mb-4 uppercase">PAYMENT_STATE</div>
            <div className="text-4xl font-bold font-headline text-zinc-100 italic">{activeOrder ? "PAID" : "NO_ORDER"}</div>
            <div className="mt-2 text-zinc-500 font-label text-[10px] uppercase tracking-widest">
              {activeOrder ? `Method: ${activeOrder.paymentMethod.toUpperCase()} // Ready for address` : "Complete checkout in the cart first."}
            </div>
            <div className="absolute right-[-10px] bottom-[-10px] opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-9xl">payments</span>
            </div>
          </div>
        </div>
      </div>

      <aside className="w-full lg:w-2/5 bg-surface-container-low border-2 border-zinc-800 p-10 relative">
        <div className="font-label text-[10px] tracking-widest text-primary mb-10 flex justify-between items-center uppercase">
          <span>ORDER_MANIFEST</span>
          <span className="text-zinc-600">V.4.2</span>
        </div>

        {activeOrder ? (
          <>
            <div className="space-y-8 mb-12">
              {activeOrder.items.map((item) => (
                <div key={item.id} className="flex gap-6 items-center">
                  <div className="w-24 h-24 bg-surface-container-highest shrink-0 relative overflow-hidden border border-zinc-900">
                    <img className="w-full h-full object-cover grayscale opacity-60 hover:grayscale-0 transition-all duration-500" src={item.image} alt={item.name} />
                  </div>
                  <div className="flex-1">
                  <div className="font-bold text-lg tracking-tight font-headline text-zinc-100 italic">{item.name}</div>
                  <div className="text-[10px] font-label text-zinc-500 uppercase tracking-widest">
                      <span>TYPE: {item.type.toUpperCase()}</span>
                      <span>{" // "}</span>
                      <span>QTY: {String(item.quantity).padStart(2, "0")}</span>
                  </div>
                    <div className="text-primary mt-2 font-bold font-headline">${(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t-2 border-zinc-800 pt-8 space-y-4">
              <div className="flex justify-between font-label text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                <span>SUBTOTAL</span>
                <span className="text-zinc-100">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-label text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                <span>LOGISTICS_FEE</span>
                <span className="text-zinc-100">${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-label text-[10px] uppercase tracking-[0.2em] text-secondary">
                <span>VAT_TAX</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-end pt-6">
                <span className="font-bold text-xl tracking-tighter uppercase font-headline italic text-zinc-100">TOTAL_COST</span>
                <div className="text-right">
                  <div className="text-3xl font-black text-secondary tracking-tighter font-headline italic">${total.toFixed(2)}</div>
                  <div className="text-[10px] font-label text-zinc-600 tracking-[0.2em] uppercase mt-1">TAXES_INCLUDED</div>
                </div>
              </div>
            </div>

            <div className="mt-10 space-y-4">
              <div className="font-label text-[10px] tracking-[0.3em] text-primary uppercase">SHIPPING_ADDRESS</div>
              {isAddressSaved ? (
                <div className="bg-surface-container-high border border-secondary/20 p-5 text-sm text-zinc-300 leading-relaxed">
                  <div className="font-bold text-secondary uppercase tracking-widest text-[10px] mb-2">Saved</div>
                  <div>{savedAddress.fullName}</div>
                  <div>{savedAddress.line1}</div>
                  {savedAddress.line2 ? <div>{savedAddress.line2}</div> : null}
                  <div>
                    {savedAddress.city}, {savedAddress.region} {savedAddress.postalCode}
                  </div>
                  <div>{savedAddress.country}</div>
                </div>
              ) : (
                <div className="space-y-3">
                  <input
                    value={address.fullName}
                    onChange={(event) => setAddress((current) => ({ ...current, fullName: event.target.value }))}
                    className="w-full bg-surface-container-lowest border-b-2 border-zinc-800 focus:border-primary text-primary font-label text-xs tracking-widest transition-all px-4 py-3 outline-none"
                    placeholder="FULL_NAME"
                  />
                  <input
                    value={address.line1}
                    onChange={(event) => setAddress((current) => ({ ...current, line1: event.target.value }))}
                    className="w-full bg-surface-container-lowest border-b-2 border-zinc-800 focus:border-primary text-primary font-label text-xs tracking-widest transition-all px-4 py-3 outline-none"
                    placeholder="ADDRESS_LINE_1"
                  />
                  <input
                    value={address.line2 ?? ""}
                    onChange={(event) => setAddress((current) => ({ ...current, line2: event.target.value }))}
                    className="w-full bg-surface-container-lowest border-b-2 border-zinc-800 focus:border-primary text-primary font-label text-xs tracking-widest transition-all px-4 py-3 outline-none"
                    placeholder="ADDRESS_LINE_2"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      value={address.city}
                      onChange={(event) => setAddress((current) => ({ ...current, city: event.target.value }))}
                      className="w-full bg-surface-container-lowest border-b-2 border-zinc-800 focus:border-primary text-primary font-label text-xs tracking-widest transition-all px-4 py-3 outline-none"
                      placeholder="CITY"
                    />
                    <input
                      value={address.region}
                      onChange={(event) => setAddress((current) => ({ ...current, region: event.target.value }))}
                      className="w-full bg-surface-container-lowest border-b-2 border-zinc-800 focus:border-primary text-primary font-label text-xs tracking-widest transition-all px-4 py-3 outline-none"
                      placeholder="STATE"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      value={address.postalCode}
                      onChange={(event) => setAddress((current) => ({ ...current, postalCode: event.target.value }))}
                      className="w-full bg-surface-container-lowest border-b-2 border-zinc-800 focus:border-primary text-primary font-label text-xs tracking-widest transition-all px-4 py-3 outline-none"
                      placeholder="POSTAL_CODE"
                    />
                    <input
                      value={address.country}
                      onChange={(event) => setAddress((current) => ({ ...current, country: event.target.value }))}
                      className="w-full bg-surface-container-lowest border-b-2 border-zinc-800 focus:border-primary text-primary font-label text-xs tracking-widest transition-all px-4 py-3 outline-none"
                      placeholder="COUNTRY"
                    />
                  </div>
                  <input
                    value={address.phone ?? ""}
                    onChange={(event) => setAddress((current) => ({ ...current, phone: event.target.value }))}
                    className="w-full bg-surface-container-lowest border-b-2 border-zinc-800 focus:border-primary text-primary font-label text-xs tracking-widest transition-all px-4 py-3 outline-none"
                    placeholder="PHONE_OPTIONAL"
                  />
                  <button
                    onClick={handleSubmitAddress}
                    disabled={isSavingAddress}
                    className="w-full bg-primary text-on-primary py-4 font-headline font-black text-lg uppercase tracking-tighter hover:bg-primary-fixed transition-all disabled:opacity-60"
                  >
                    {isSavingAddress ? "SAVING..." : "SAVE_ADDRESS"}
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="space-y-6">
            <p className="text-zinc-400">
              No completed order is available yet. Finish checkout from the cart, then return here to enter the address.
            </p>
            <Link
              href="/cart"
              className="inline-flex bg-primary text-on-primary px-8 py-4 font-bold tracking-widest text-sm uppercase transition-all hover:bg-primary-container"
            >
              GO TO CART
            </Link>
          </div>
        )}

        <div className="mt-12 opacity-20 font-label text-[10px] leading-tight text-zinc-500 break-all uppercase tracking-tighter">
          SECURE_ENCRYPTION_HASH: 0x8ff5ff2ff801ff6b9b00eefc...
          LATENCY_CHECK: 14MS // CLUSTER_A_STABLE // TIMESTAMP: 2024.05.21.14:22:01
        </div>
      </aside>
    </main>
  );
}
