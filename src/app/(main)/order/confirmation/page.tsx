import Link from "next/link";

export default function OrderConfirmationPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-12 max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-start">
      {/* Left: High Impact Message */}
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
            System signal confirmed. Your kinetic gear is currently being processed for uplink. Welcome to the collective.
          </p>
          <div className="mt-12 flex flex-wrap gap-4">
            <Link 
              href="/"
              className="bg-primary text-on-primary px-10 py-4 font-bold tracking-widest text-sm uppercase hover:shadow-[0_0_20px_rgba(143,245,255,0.4)] transition-all active:scale-95 group relative"
            >
              <span>BACK TO HUB</span>
              <div className="absolute -right-2 -bottom-2 w-full h-full border border-primary group-hover:right-0 group-hover:bottom-0 transition-all"></div>
            </Link>
            <button className="border-2 border-zinc-800 text-zinc-500 px-10 py-4 font-bold tracking-widest text-sm uppercase hover:border-secondary hover:text-secondary transition-all">
              VIEW_INVOICE
            </button>
          </div>
        </section>

        {/* Status Details Bento */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-surface-container-high p-8 relative overflow-hidden group border border-zinc-800">
             {/* Corner brackets */}
             <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary/40 group-hover:border-primary/80 transition-all"></div>
             <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary/40 group-hover:border-primary/80 transition-all"></div>
             <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary/40 group-hover:border-primary/80 transition-all"></div>
             <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary/40 group-hover:border-primary/80 transition-all"></div>

            <div className="font-label text-[10px] tracking-widest text-primary mb-4 uppercase">ESTIMATED_UPLINK</div>
            <div className="text-4xl font-bold font-headline text-zinc-100 italic">48_HOURS</div>
            <div className="mt-2 text-zinc-500 font-label text-[10px] uppercase tracking-widest">Standard courier protocol engaged.</div>
            <div className="absolute right-[-20px] bottom-[-20px] opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-9xl">local_shipping</span>
            </div>
          </div>
          <div className="bg-surface-container-high p-8 relative overflow-hidden group border border-zinc-800">
             {/* Corner brackets */}
             <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary/40 group-hover:border-primary/80 transition-all"></div>
             <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary/40 group-hover:border-primary/80 transition-all"></div>
             <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary/40 group-hover:border-primary/80 transition-all"></div>
             <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary/40 group-hover:border-primary/80 transition-all"></div>

            <div className="font-label text-[10px] tracking-widest text-tertiary mb-4 uppercase">IDENT_NUMBER</div>
            <div className="text-4xl font-bold font-headline text-zinc-100 italic">#KNTC-99821X</div>
            <div className="mt-2 text-zinc-500 font-label text-[10px] uppercase tracking-widest">Keep this signature for tracking.</div>
            <div className="absolute right-[-10px] bottom-[-10px] opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-9xl">qr_code_2</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Order Summary Sidebar */}
      <aside className="w-full lg:w-2/5 bg-surface-container-low border-2 border-zinc-800 p-10 relative">
        <div className="font-label text-[10px] tracking-widest text-primary mb-10 flex justify-between items-center uppercase">
          <span>ORDER_MANIFEST</span>
          <span className="text-zinc-600">V.4.2</span>
        </div>
        <div className="space-y-8 mb-12">
          {/* Items omitted for brevity or populated with mock data */}
          <div className="flex gap-6 items-center">
            <div className="w-24 h-24 bg-surface-container-highest shrink-0 relative overflow-hidden border border-zinc-900">
              <img className="w-full h-full object-cover grayscale opacity-60 hover:grayscale-0 transition-all duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcanwmZ_vcFshXjS9T-2V0N1plZnUohZNMj5v2ccvsupYiV-m4cSW_eZIpwtiXie6f293vMqD0XqDITaTQWrl9Ji1ulYoNg3JA3dHZZfc2yP2Qg-Fe-pVf6KdsFXD0YULcgPKfH7M5T0Na0r5DqM1AHrPVJbWn2ZQsi7sgurD0yqmI71ijVLxLDTuZUi9iRKpQuM-KoiDb3rAU8Z6rx6udBHmG_ayPMyxQoTED5-Hbif_f-FWZGX4Bdl5sxT289BehxkUhuvTCdEw" alt="Item 1" />
            </div>
            <div className="flex-1">
              <div className="font-bold text-lg tracking-tight font-headline text-zinc-100 italic">KINETIC_CORE_TEE</div>
              <div className="text-[10px] font-label text-zinc-500 uppercase tracking-widest">SIZE: XL // QTY: 01</div>
              <div className="text-primary mt-2 font-bold font-headline">$72.00</div>
            </div>
          </div>
          <div className="flex gap-6 items-center">
            <div className="w-24 h-24 bg-surface-container-highest shrink-0 relative overflow-hidden border border-zinc-900">
              <img className="w-full h-full object-cover grayscale opacity-60 hover:grayscale-0 transition-all duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvbFlpMVpjGzLA9wZW4D2dCeznr5UxunH1TpLbKrCkYuUPY_J6t2VRNZc0zTku1if4GP38o2m-z9fx0aEYuuoOkDURXhejnoOOLo9XdIoopVwGdh2sQxg5rYop2DIFlEnRLV4Z4TdPP0ptlrB1r8MNJqBZ7Misw8R45jXdc-yANzdhJ0KbZaRKgp4OjNfUdcILysa-iCeHAByEOXOb_Xwtb6d_-AdcKu4ShLUoHUe2YvKfLiTuly-Y9gJeQcJ3NXp4iHwW0zRKCX4" alt="Item 2" />
            </div>
            <div className="flex-1">
              <div className="font-bold text-lg tracking-tight font-headline text-zinc-100 italic">DATA_FLOW_LINER</div>
              <div className="text-[10px] font-label text-zinc-500 uppercase tracking-widest">SIZE: L // QTY: 01</div>
              <div className="text-primary mt-2 font-bold font-headline">$55.00</div>
            </div>
          </div>
        </div>
        <div className="border-t-2 border-zinc-800 pt-8 space-y-4">
          <div className="flex justify-between font-label text-[10px] uppercase tracking-[0.2em] text-zinc-500">
            <span>SUBTOTAL</span>
            <span className="text-zinc-100">$127.00</span>
          </div>
          <div className="flex justify-between font-label text-[10px] uppercase tracking-[0.2em] text-zinc-500">
            <span>LOGISTICS_FEE</span>
            <span className="text-zinc-100">$12.00</span>
          </div>
          <div className="flex justify-between font-label text-[10px] uppercase tracking-[0.2em] text-secondary">
            <span>DISCOUNT [WELCOME_USER]</span>
            <span>-$25.00</span>
          </div>
          <div className="flex justify-between items-end pt-6">
            <span className="font-bold text-xl tracking-tighter uppercase font-headline italic text-zinc-100">TOTAL_COST</span>
            <div className="text-right">
              <div className="text-3xl font-black text-secondary tracking-tighter font-headline italic">$114.00</div>
              <div className="text-[10px] font-label text-zinc-600 tracking-[0.2em] uppercase mt-1">TAXES_INCLUDED</div>
            </div>
          </div>
        </div>
        {/* Decorative Data Noise */}
        <div className="mt-12 opacity-20 font-label text-[10px] leading-tight text-zinc-500 break-all uppercase tracking-tighter">
          SECURE_ENCRYPTION_HASH: 0x8ff5ff2ff801ff6b9b00eefc...
          LATENCY_CHECK: 14MS // CLUSTER_A_STABLE // TIMESTAMP: 2024.05.21.14:22:01
        </div>
      </aside>
    </main>
  );
}
