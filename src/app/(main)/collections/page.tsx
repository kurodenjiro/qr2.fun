import Link from "next/link";

export default function CollectionsPage() {
  const products = [
    {
      id: "vector-tee",
      name: "VECTOR TEE",
      series: "SERIES_A // 001",
      price: 65.0,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDhgCXZpSVN8fxTR3qVTg9U1WtamfjoK4EdnRoh-6hLuiA7Lsnh2c2ohCK4yUC_85VgwN84bZVtHrrVRF-pvIZPa5w4iJl9sFtgZo0W6Pxp5Fr60-7OdoWsyNBx2bW4l8NiqqBdFG2LuFZz4d0kFc4OA-aX3PrB4xFQMBG4y97aLtrucr471P-b36880KEodN3UyGw1Z3HN22-NaYjRBw3xKsf8hvD1fN7xQXXMxkhod0WbwCvhFPE17XL5M-hjBpElemTeLo-20kA",
      label: "NEW_MODEL",
      labelColor: "text-primary border-primary/30"
    },
    {
      id: "ghost-shirt",
      name: "GHOST SHIRT",
      series: "SERIES_B // 024",
      price: 82.0,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCF8y2b7SlnPhd_0-xkC2gnIUe_YNc3Iv7LTjXmNkXPkzsdBk1rICpdAb9ph6ookJ7eEQPWG7NG-ZyytxlIHzP7tLriSaAFxjQI65V8qIBMMwcbgSZh9GFnYEvwBhU70EGM5V5CLCLtZQCmbur2k6ZPnfnfXf8xs0uEd8oI3tYX1o5vinyBRK046yWaiCsUus0L6DS7vkJGg0gWA5fwvgHunDbcCXpDgK5A9ZbEZxeJYFvi8PLAKA1w0OaKck2bX7UkQML8dxGKiCc",
      label: "LIMITED_RUN",
      labelColor: "bg-secondary text-black"
    },
    {
      id: "neon-logic-tee",
      name: "NEON LOGIC TEE",
      series: "CORE_UNIT // 009",
      price: 55.0,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB2-hhgleTwpsmDqDy5iE30fn1Vh7joloH_jZHwIwOfT7HMPRlqFMyGbL88W2u-g8MxObjU2S-RaVvQqw2BHma4DTNvb-MsMYnAgTN_5kxLZ6DAvLBlBeGFc3QcaBFXRaUOjDh4PIxmzmWXoj3W4FRAAUJiemHlZzk6-QqgPD2CCrLirM8dk0D82EorHk_t7rcOKrCys5GQhRJTaVaJfPl5d4DPKxKH7kzh4c78I6cCJc_UHfbRO-oxVqZB2krtzw4ebR6nl_qtjmw",
    },
    {
      id: "kinetic-shield",
      name: "KINETIC_SHIELD",
      series: "TECH_SPEC // 102",
      price: 90.0,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDiq-60-T1XgtdbAfrT_Au5UXNs55ZAbIDrXH0ukNjB8Kkrxn_WHnSltmVbLMKv2J1wZKpKPEkaWZV5CPBPqEyVslhFLNOdcIGqxQ-D2LD7PmXAmdrtbUfHhuZIVquZJD5GEU_1x9542yL-G3G793u-OmRZoe5tFA9CSJkvmHD1sfdSvYh0i2BGC5Bxv6n8shKmcGug7rDDzhVVcZA6JYF8_QVkCDn22cPXv7PpfuLQxNRrD7hedDWzw_PwN1UHi63MyHcFzhGNsnE"
    },
    {
      id: "void-operator",
      name: "VOID_OPERATOR",
      series: "SERIES_Z // 999",
      price: 70.0,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD1JoksY44pI3y_1hNPdCAaf8AfPWnGEfI1ufcFkd09dH9JexPg_278NH4qUhvC6wfojASSJGDu37Up9-Y6MFxfYGG2PlVcf1xfV-OYwEl5TjGNXsjimbQWS0lWkEoHPAAAFnIGVEa6x23J30n3NVwOZrj0mki3sZg4UX_uNwwSDTwRQpFS1hfD3_TkE-oNgbTClGFeFWOe2ToxFZbdLIIbllwSWvWFHJfm1uR7HjYw4G2oH6uG68b8bmWrxfduJprRLAWaEaT2DmI",
      label: "SOLD_OUT",
      labelColor: "bg-tertiary text-black"
    },
    {
      id: "synth-wave-01",
      name: "SYNTH_WAVE_01",
      series: "SERIES_A // 005",
      price: 60.0,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCx-uJr5Skf6WHrUkOSiOw-ZFThrRbdV98rVlup4KHHGpAO30jRyrIJyLeN-FMvqCwN_chQmDFMWoLueKCJKlZO1XnuetGPZdHz1-GFthS5yMXGp-q-bRFZwlytQjLbr6Qu6HW6oN9tvyl6OdH1ekZH_GbWr7uNNiyeHE3331NBj-lp083TSZOf3hUPnoinUJRmnQXfQ__Q0RGOkW75SmDiFp4NbCq46ZFcSBu0NbN4E6rNYtWEav9HHGjOIvpBHUHgfTcy1iuOLOc"
    }
  ];

  return (
    <main className="flex-grow pt-32 pb-12 px-12 max-w-7xl mx-auto w-full">
      {/* Hero/Header Section */}
      <header className="mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="font-label text-[10px] tracking-[0.3em] text-primary mb-2">SYSTEM_UPDATE // 2024.03</p>
            <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-none italic text-zinc-100">CORE_COLLECTION</h1>
          </div>
          {/* Filter Tabs */}
          <div className="flex gap-4 font-label text-xs tracking-widest">
            <button className="px-6 py-2 bg-primary text-on-primary font-bold transition-all">ALL_GEAR</button>
            <button className="px-6 py-2 border border-zinc-800 text-zinc-500 hover:border-secondary hover:text-secondary transition-colors">DROPS</button>
            <button className="px-6 py-2 border border-zinc-800 text-zinc-500 hover:border-secondary hover:text-secondary transition-colors">ARCHIVE</button>
          </div>
        </div>
      </header>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((p) => (
          <Link 
            key={p.id}
            href={`/product/${p.id}`} 
            className="product-card group cursor-pointer"
          >
            <div className="relative aspect-[4/5] bg-surface-container-low mb-4 overflow-hidden border border-zinc-800 group-hover:border-primary transition-all duration-300">
              {/* Corner decor */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary/0 group-hover:border-primary/40 transition-all"></div>
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary/0 group-hover:border-primary/40 transition-all"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary/0 group-hover:border-primary/40 transition-all"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary/0 group-hover:border-primary/40 transition-all"></div>

              <img 
                alt={p.name} 
                className={`w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100 ${p.label === 'SOLD_OUT' ? 'opacity-30' : ''}`} 
                src={p.image} 
              />
              
              {p.label && (
                <div className={`absolute ${p.label === 'LIMITED_RUN' ? 'bottom-4 left-4' : 'top-4 right-4'} px-2 py-1 text-[10px] font-label tracking-widest font-bold border ${p.labelColor || 'text-primary border-primary/30'}`}>
                  {p.label}
                </div>
              )}
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold tracking-tight uppercase group-hover:text-primary transition-colors text-zinc-100">{p.name}</h3>
                <p className="text-xs text-zinc-500 font-label mt-1">{p.series}</p>
              </div>
              <div className={`text-xl font-bold ${p.label === 'SOLD_OUT' ? 'text-zinc-700' : 'text-secondary'}`}>
                ${p.price.toFixed(2)}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination / Load More */}
      <div className="mt-20 flex justify-center">
        <button className="group flex flex-col items-center gap-4">
          <span className="font-label text-xs tracking-[0.4em] uppercase text-zinc-500 group-hover:text-primary transition-colors">LOAD_MORE_ASSETS</span>
          <div className="h-[1px] w-40 bg-zinc-800 relative overflow-hidden">
            <div className="absolute inset-0 bg-primary -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
          </div>
        </button>
      </div>
    </main>
  );
}
