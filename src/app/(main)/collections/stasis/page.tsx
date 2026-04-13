import Link from "next/link";

export default function EthrealCollectionPage() {
  const products = [
    {
      id: "eth-01",
      name: "ETHREAL_SILENCE_HOODIE",
      price: "$185",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQeXmUPr8O2x6G9D6F0I-vN9Y7rPXyvY6u5yZ3jE7_l6o6Q8f7yR6Z5l4f3g2h1j0k9l8m7n6o5p4q3r2s1t0u9v8w7x6y5"
    },
    {
      id: "eth-02",
      name: "GHOST_SHELL_TEE",
      price: "$85",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9w8v7u6t5r4q3p2o1n0m9l8k7j6i5h4g3f2e1d0c9b8a7z6y5x4w3v2u1t0s9"
    },
    {
      id: "eth-03",
      name: "NEURAL_VEIL_MASK",
      price: "$45",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9"
    }
  ];

  return (
    <main className="pt-32 pb-20 px-12">
      {/* Ethreal Header */}
      <section className="max-w-7xl mx-auto space-y-12 mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pt-12 border-t-2 border-primary/20">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="w-12 h-0.5 bg-primary"></span>
              <span className="font-label text-primary text-[10px] tracking-[0.5em] uppercase">COLLECTION_V2.1 // ETHREAL</span>
            </div>
            <h1 className="text-7xl md:text-9xl font-black font-headline tracking-tighter uppercase italic text-zinc-100 leading-none">
              ETHREAL_ <br /> <span className="text-primary opacity-50">STASIS</span>
            </h1>
          </div>
          <p className="max-w-md text-zinc-500 font-label text-xs uppercase leading-relaxed tracking-wider border-l border-zinc-800 pl-6">
            A state of semi-digital existence. Fabric synthesized with light-reflecting fibers and memory-mapped textures. Designed to vanish in the data noise.
          </p>
        </div>
      </section>

      {/* Collection Grid */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1px bg-zinc-800/30 border border-zinc-800/30">
        {products.map((product, i) => (
          <Link key={i} href={`/product/${product.id}`} className="group relative bg-background p-8 space-y-6 hover:bg-surface-container-low transition-colors duration-500">
            <div className="aspect-[3/4] bg-surface-container-high relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
              <img 
                className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_u5-7f9NHeiZtTrI_-HOthZtZcBmwq4Qa9YW1-gV5IQhTakVZ9AqsvRSyLTzz98ZQuVlT4FCgmmifmEa7EI6W_IbDSINvzq-fhAlyJy48x1d6IwJkSXJfFtJDZEObPjJprNv6gP8q-hkt6V1BGr-Xt_wr9xb5RYdkCQOZw6LQuSuwJAuWMcK1CPdqhBYwXMmD4RWGa-R44gRSHqHo4epDN-Fkq6Jh8pHlGpkQC_3T2Pl2Td7utSwWd0m1iZSdJGL_b29DkUHjaEw"
                alt={product.name}
              />
              <div className="absolute bottom-4 right-4 font-label text-[10px] text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity">SYS_PREVIEW_4.0</div>
            </div>
            <div className="space-y-1">
              <h3 className="font-headline font-bold text-lg text-zinc-100 italic group-hover:text-primary transition-colors">{product.name}</h3>
              <div className="flex justify-between items-center">
                <span className="font-label text-primary font-bold">{product.price}</span>
                <span className="material-symbols-outlined text-zinc-700 group-hover:text-primary transition-colors">add_shopping_cart</span>
              </div>
            </div>
            {/* Hover decorative bracket */}
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-primary/0 group-hover:border-primary/40 transition-all duration-500"></div>
          </Link>
        ))}
      </section>

      {/* Featured visual */}
      <section className="max-w-7xl mx-auto mt-20 relative h-[600px] overflow-hidden group">
        <img 
          className="w-full h-full object-cover grayscale contrast-125 opacity-40 group-hover:scale-110 transition-transform duration-[3000ms]" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJzaL6my20-GR00tGAwwXKJP8Sa8kUBWob7rOFjgbclbOIwoj6N1tGB0ulkvr_HZQqO-2ZBQxLm0rR5HrSnaY9Sxkj8rBLl9HGhY8D6uzzNVcLVkthnKxGQVA660LA4G5W5dZFpvb_Swyi5ohNUoZE7fhp3jRXksU7_Noi_vXFM0c7T9yAol84OyTmRktl6UIVGMdTfifz1dFZGUUQbLTzvh6Q_ejg-nIsUAx2ghulvtul-Lz7XyDb9tTaI7I7WQlpyzfktb0Nf1Y" 
          alt="Featured"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
        <div className="absolute bottom-20 left-12 space-y-6">
          <h2 className="text-5xl md:text-7xl font-black font-headline tracking-tighter uppercase italic text-zinc-100 leading-tight">
            VANISH_IN_THE <br /> <span className="text-secondary">LIGHT_SHIFT</span>
          </h2>
          <button className="bg-zinc-100 text-black px-10 py-4 font-headline font-black text-sm uppercase italic tracking-widest hover:bg-primary transition-all">
            PRE_ORDER_DROP
          </button>
        </div>
        <div className="absolute top-12 right-12 text-right">
           <div className="font-label text-primary text-[10px] tracking-[0.2em] font-bold uppercase mb-2">SIGNAL_STATUS: OPTIMIZED</div>
           <div className="w-64 h-1 bg-zinc-800">
             <div className="h-full bg-primary w-2/3 shadow-[0_0_10px_rgba(143,245,255,0.5)]"></div>
           </div>
        </div>
      </section>
    </main>
  );
}
