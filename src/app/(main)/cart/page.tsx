"use client";

import Link from "next/link";
import { useState } from "react";

export default function CartPage() {
  const [items, setItems] = useState([
    {
      id: "sn_0921-23",
      name: "Neon Drift Tee",
      size: "XL",
      color: "Obsidian",
      price: 55.0,
      quantity: 1,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDnqqiAbDJsHbjmzjbkpu1hTOx_t-sx_FLf4yxm_XkZOrBS6dfn47f04L3Uy_I0SES4tUf0PTrSy8Ta8lQS1Xu_KE4EecfxJXzeZCb9HZG6mWXcJJSZBjr8YGkhNtJOZrMIYz_hdgm399bzmXJhWgGDpp4iOsTOoG8s1e77ZRijQq7rfSy2ZLKwLQaLJNgheqBGNgXfWsjVAXJel-9a4YnK1SOFucHV2LzrulDpAxE8ewuiBMfDR-q7KlWd6DRXPgiWRWd5FSs4pBE"
    },
    {
      id: "sn_4420-11",
      name: "Grid Runner Hoodie",
      size: "L",
      color: "Carbon",
      price: 120.0,
      quantity: 1,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAv5A0QlcaiOo-knDLnZhCJEkt1gPohBuD8_Ko6gkHPy-TY5TbmCIIVqEERwvgWcoQ7lG55n3hVl8s96aYwqizGhD-wqWS9U4oBQ0rYVl_O0iz3NJ_3ZCU3gTmmBVUEjh0yRixGt-ChO6IqcvISX9enGiJlEgK7kAZI5zTrB9UPV8jWnAcaREOg9YYumQIhK50SgAeVkWrBHErC-4myQwBv6a7dWi2teSYvCfZQGs5uuvqFa8bYnt-cYtkI_CTqJBYg71DT2apG3HA"
    }
  ]);

  const updateQuantity = (id: string, delta: number) => {
    setItems(items.map(item => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));
  };

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 12.0;
  const tax = subtotal * 0.082; // 8.2% tax
  const total = subtotal + shipping + tax;

  return (
    <main className="pt-32 pb-20 px-12 max-w-7xl mx-auto">
      {/* Header Section */}
      <header className="mb-12 border-l-4 border-primary pl-6">
        <div className="font-label text-primary text-[10px] tracking-[0.3em] mb-2 uppercase">System Status: Active // Transaction_Queue</div>
        <h1 className="text-5xl md:text-7xl font-headline font-black uppercase tracking-tighter italic text-zinc-100">Your Cart</h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Item List (8 Cols) */}
        <section className="lg:col-span-8 space-y-4">
          {items.map(item => (
            <div key={item.id} className="relative bg-surface-container-high p-6 flex flex-col md:flex-row gap-6 group transition-all duration-300 hover:bg-surface-container-highest border border-zinc-800 hover:border-primary/40">
              {/* Corner brackets */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary/20 group-hover:border-primary/50"></div>
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary/20 group-hover:border-primary/50"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary/20 group-hover:border-primary/50"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary/20 group-hover:border-primary/50"></div>

              <div className="absolute top-2 right-2 font-label text-[10px] text-zinc-600 group-hover:text-primary/60 transition-colors uppercase tracking-widest">{item.id.toUpperCase()}</div>
              
              <div className="w-full md:w-32 h-32 bg-surface-container-low flex-shrink-0 relative overflow-hidden border border-zinc-900">
                <img 
                  alt={item.name} 
                  className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 transition-all duration-500" 
                  src={item.image} 
                />
              </div>

              <div className="flex-grow flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-headline font-bold text-primary tracking-tight uppercase italic">{item.name}</h3>
                    <p className="font-label text-zinc-500 text-[10px] uppercase tracking-[0.2em] mt-1">Size: {item.size} // Color: {item.color}</p>
                  </div>
                  <div className="text-xl font-headline font-bold text-zinc-100">${item.price.toFixed(2)}</div>
                </div>
                <div className="flex justify-between items-center mt-6">
                  <div className="flex items-center border border-zinc-800 px-3 py-1 bg-surface-container-low">
                    <button onClick={() => updateQuantity(item.id, -1)} className="text-primary hover:text-secondary p-1 transition-colors">
                      <span className="material-symbols-outlined text-sm">remove</span>
                    </button>
                    <span className="mx-4 font-headline font-bold text-zinc-100 w-4 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="text-primary hover:text-secondary p-1 transition-colors">
                      <span className="material-symbols-outlined text-sm">add</span>
                    </button>
                  </div>
                  <button 
                    onClick={() => setItems(items.filter(i => i.id !== item.id))}
                    className="font-label text-[10px] text-error hover:text-white hover:bg-error px-2 py-1 transition-all uppercase tracking-widest border border-error/30"
                  >
                    Discard_Item
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Logic Divider */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <div className="bg-surface-container-low p-6 border-l-2 border-secondary/50">
              <p className="font-label text-secondary text-[10px] tracking-[.2em] mb-2 uppercase font-bold">Unlock_Access</p>
              <p className="text-sm text-zinc-500 leading-relaxed font-label uppercase text-[11px] tracking-tight">Add more for zero-cost standard shipping to your sector.</p>
            </div>
            <div className="bg-primary/5 p-6 border-r-2 border-primary/50 text-right">
              <p className="font-label text-primary text-[10px] tracking-[.2em] mb-2 uppercase font-bold">Loyalty_Node</p>
              <p className="text-sm text-zinc-500 leading-relaxed font-label uppercase text-[11px] tracking-tight text-right">KINETIC_WEAR members earn credits on this haul.</p>
            </div>
          </div>
        </section>

        {/* Order Summary (4 Cols) */}
        <aside className="lg:col-span-4 lg:sticky lg:top-32">
          <div className="bg-surface-container-low p-8 relative border border-zinc-800">
            <div className="absolute top-0 right-0 p-2 font-label text-[8px] text-primary/20 uppercase">SYS_V_4.0.1</div>
            <h2 className="text-3xl font-headline font-black uppercase tracking-tighter mb-8 border-b border-zinc-800 pb-4 italic text-zinc-100">Checkout Summary</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center text-xs font-label uppercase tracking-widest text-zinc-400">
                <span>Subtotal_Items</span>
                <span className="font-bold text-zinc-100">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-xs font-label uppercase tracking-widest text-zinc-400">
                <span>Shipping_Fee</span>
                <span className="font-bold text-zinc-100">${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-xs font-label uppercase tracking-widest text-zinc-400">
                <span>Vat_Tax</span>
                <span className="font-bold text-zinc-100">${tax.toFixed(2)}</span>
              </div>
              
              <div className="pt-4 border-t border-dashed border-zinc-800 flex justify-between items-end mt-6">
                <span className="text-secondary font-headline font-black text-lg uppercase tracking-widest italic">Grand Total</span>
                <div className="text-right">
                  <span className="block text-secondary font-headline text-4xl font-black italic tracking-tighter">${total.toFixed(2)}</span>
                  <span className="text-[10px] text-secondary/50 font-label uppercase tracking-widest mt-1">ESTIMATED_SYNC_COMPLETE</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Link 
                href="/order/confirmation"
                className="w-full bg-primary text-on-primary py-5 font-headline font-black text-xl uppercase tracking-tighter hover:bg-primary-fixed transition-all active:scale-[0.98] flex items-center justify-center relative overflow-hidden group"
              >
                <span className="relative z-10 italic">Proceed to Checkout</span>
                <div className="absolute inset-0 bg-secondary opacity-0 group-hover:opacity-20 transition-opacity"></div>
              </Link>
              
              <div className="pt-4 flex flex-col gap-2">
                <input 
                  className="w-full bg-surface-container-lowest border-b-2 border-zinc-800 focus:border-primary text-primary font-label text-xs tracking-widest transition-all px-4 py-3 outline-none" 
                  placeholder="ENTER_PROMO_CODE" 
                  type="text"
                />
                <button className="text-zinc-600 hover:text-primary text-[10px] font-label uppercase tracking-[0.2em] text-left pl-2 transition-colors">Apply_Discount_Signal</button>
              </div>
            </div>

            <div className="mt-12 flex justify-center gap-6 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
              <span className="material-symbols-outlined text-2xl">credit_card</span>
              <span className="material-symbols-outlined text-2xl">account_balance_wallet</span>
              <span className="material-symbols-outlined text-2xl">currency_bitcoin</span>
            </div>
          </div>
          
          <p className="mt-6 text-[9px] font-label text-zinc-600 leading-relaxed text-center uppercase tracking-[0.2em] px-4">
            All transactions are encrypted via end-to-end neural link protocols. No biometric data is stored without explicit hardware consent.
          </p>
        </aside>
      </div>
    </main>
  );
}
