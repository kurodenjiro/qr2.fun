import Link from "next/link";

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  return (
    <main className="flex-grow container mx-auto px-12 py-32 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Product Gallery */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="relative bg-surface-container-low aspect-[4/5] overflow-hidden border border-zinc-800 transition-all duration-300">
             {/* Corner brackets */}
             <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary/40"></div>
             <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary/40"></div>
             <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary/40"></div>
             <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary/40"></div>

            <img 
              alt="KINETIC OVERRIDE TEE" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJzaL6my20-GR00tGAwwXKJP8Sa8kUBWob7rOFjgbclbOIwoj6N1tGB0ulkvr_HZQqO-2ZBQxLm0rR5HrSnaY9Sxkj8rBLl9HGhY8D6uzzNVcLVkthnKxGQVA660LA4G5W5dZFpvb_Swyi5ohNUoZE7fhp3jRXksU7_Noi_vXFM0c7T9yAol84OyTmRktl6UIVGMdTfifz1dFZGUUQbLTzvh6Q_ejg-nIsUAx2ghulvtul-Lz7XyDb9tTaI7I7WQlpyzfktb0Nf1Y" 
            />
            <div className="absolute top-4 left-4 p-2 bg-black/80 backdrop-blur-md border border-primary/20">
              <span className="font-label text-[10px] tracking-[0.2em] text-primary uppercase">SYS_VER_4.02</span>
            </div>
            <div className="absolute bottom-4 right-4 flex flex-col gap-1 items-end">
              <div className="h-px w-12 bg-secondary"></div>
              <span className="font-label text-[10px] tracking-[0.2em] text-secondary uppercase font-bold">OVERRIDE_ACTIVE</span>
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-4">
            <div className="aspect-square bg-surface-container-high border border-zinc-800 overflow-hidden opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
              <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7FV0v3XP7r_ol5FFiwt2EuqKPJzggXRc3gr3M_KecC1PaWKglWzuFsqkcrbH0UdO0gdw8d-FxCldW_wGCgzYRb5FyxRccLtaGtjPHXkGhPKQMQVOaq67LC2DGAnQDd2FTem3bYGwbNDhOTp2pQbYBj2gAwGQQQwQs8bmHogkD9h6aWWc1J__9yPPiN9VaO_m-Chst8eYbH74emXHf9aUlGG5-jQNjP_aTdV4wQfEqBtmXGDgaZaU85UmCMc6vXTSVUsjGAo4xQbY" alt="Detail 1" />
            </div>
            <div className="aspect-square bg-surface-container-high border border-zinc-800 overflow-hidden opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
              <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCt4iffyqf-X5rNg4r9bYMZZHdxfZqKfvLW2bmpMzXCCeWYc6Gvzx0WPx2BLSfoHgCH7Pj64MHu_tabkyKsRbFtxeSUpy13d9y5ArF4hI6fN2D5_uXb9qJFMv2Kx0jViMSCbid4ZuVPs0BLnDKL534t135VydBgbBbFi6pPE_9s4Th06SrDTe5yWZx65zWO6IAhWuD0bik8xC4XBMWHzz-jiRyxBkRFT3QTPhV--_8zt_JLNgLgzfJBFbmwgWjEFne3PsClVuE9hH8" alt="Detail 2" />
            </div>
            <div className="aspect-square bg-surface-container-high border border-zinc-800 overflow-hidden opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
              <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmA_Qw1v02Eu8nusdjzNbLa8HOoX6gMCCI6lAiolPHvBjbeZ-HiZ9u-PSNyYvNcfdNnBwwhNIsFeRnZxt_v54d52_r2N0OSzGXVEuFFRlYrXZx3h4K4dJ6Bukp7m-H7NOxChIMH7cIeLGFEtKKUDG-AJ6cRB2Z4M9n-sVjXXIYpOHAY589kN-urwwyLLWMVVjQxuNmKp28Ncy5LP5npudRD8CST-twJlrXMZmVOiR9PGeh0sg86ZK8l38FP_gG1FDFZcOXx5XHTzs" alt="Detail 3" />
            </div>
            <div className="aspect-square bg-surface-container-high border border-zinc-800 flex items-center justify-center text-zinc-700">
              <span className="material-symbols-outlined text-3xl">more_horiz</span>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="lg:col-span-5 flex flex-col gap-8 lg:sticky lg:top-32">
          <header className="flex flex-col gap-2">
            <h1 className="text-4xl md:text-5xl font-black font-headline tracking-tighter text-zinc-100 uppercase leading-none italic">
              {resolvedParams.id.replace(/-/g, '_').toUpperCase()}
            </h1>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-3xl font-headline font-bold text-primary">$65.00</span>
              <div className="flex items-center gap-2 px-3 py-1 bg-secondary/10 border border-secondary/20">
                <div className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse"></div>
                <span className="font-label text-[10px] tracking-[0.1em] text-secondary font-bold uppercase">IN STOCK</span>
              </div>
            </div>
          </header>

          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 gap-6">
              <div className="flex flex-col gap-2">
                <span className="font-label text-[10px] tracking-[0.2em] text-zinc-500 uppercase">Material</span>
                <p className="text-zinc-300 font-light tracking-tight text-sm">300GSM Heavyweight Technical Cotton. Moisture-wicking treated fiber.</p>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-label text-[10px] tracking-[0.2em] text-zinc-500 uppercase">Fit</span>
                <p className="text-zinc-300 font-light tracking-tight text-sm">Boxy Oversized Silhouette. Drop-shoulder structural cut.</p>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-label text-[10px] tracking-[0.2em] text-zinc-500 uppercase">Detail</span>
                <p className="text-zinc-300 font-light tracking-tight text-sm">Reflective cyber-print graphics. Reinforced double-stitched hem.</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-4">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between font-label text-[10px] tracking-[0.1em] text-zinc-500 uppercase">
                <span>Select Size</span>
                <button className="text-primary hover:underline transition-all">Size Guide</button>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                  <button 
                    key={size}
                    disabled={size === 'XXL'}
                    className={`py-3 border text-sm font-bold transition-all ${
                      size === 'M' 
                        ? 'border-primary bg-primary/10 text-primary' 
                        : size === 'XXL'
                        ? 'border-zinc-800 text-zinc-700 opacity-40 cursor-not-allowed'
                        : 'border-zinc-800 text-zinc-400 hover:bg-zinc-100 hover:text-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <button className="w-full bg-primary py-5 text-on-primary font-headline font-black text-xl tracking-tighter uppercase hover:bg-primary-container transition-all active:scale-95 flex items-center justify-center gap-3">
              ADD TO CART
              <span className="material-symbols-outlined font-bold">bolt</span>
            </button>
            <button className="w-full border-2 border-zinc-800 py-4 text-zinc-400 font-headline font-bold text-sm tracking-widest uppercase hover:border-secondary hover:text-secondary transition-all">
              ADD TO WISHLIST
            </button>
          </div>

          <div className="pt-6 border-t border-zinc-800/50 flex flex-col gap-3">
            <div className="flex items-center gap-3 text-zinc-500">
              <span className="material-symbols-outlined text-sm">verified</span>
              <span className="font-label text-[10px] tracking-widest uppercase">Authenticity Guaranteed</span>
            </div>
            <div className="flex items-center gap-3 text-zinc-500">
              <span className="material-symbols-outlined text-sm">local_shipping</span>
              <span className="font-label text-[10px] tracking-widest uppercase">Global Encryption Shipping</span>
            </div>
          </div>
        </div>
      </div>

      {/* Features Bento */}
      <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: 'diamond', title: 'PREMIUM QUALITY', desc: 'Engineered with high-density fibers for maximum durability.', color: 'text-primary' },
          { icon: 'fingerprint', title: 'UNIQUE DESIGN', desc: 'Each piece features exclusive digital distortion patterns.', color: 'text-secondary' },
          { icon: 'electric_bolt', title: 'FAST SHIPPING', desc: 'Rapid deployment protocols ensure your order arrives quickly.', color: 'text-tertiary' }
        ].map((feat, i) => (
          <div key={i} className="bg-surface-container-high p-8 flex flex-col gap-4 border border-zinc-800 relative group overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-100 transition-opacity">
              <span className="font-label text-[8px] text-zinc-500 uppercase">CODE:00{i+1}</span>
            </div>
            <div className={`w-12 h-12 ${feat.color}/10 flex items-center justify-center ${feat.color} border border-current opacity-60`}>
              <span className="material-symbols-outlined">{feat.icon}</span>
            </div>
            <h3 className="font-headline font-black text-xl tracking-tighter uppercase text-zinc-100 italic">{feat.title}</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">{feat.desc}</p>
            <div className={`mt-auto h-0.5 w-0 group-hover:w-full bg-current ${feat.color} transition-all duration-500`}></div>
          </div>
        ))}
      </div>
    </main>
  );
}
