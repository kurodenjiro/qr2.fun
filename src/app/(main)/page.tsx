import Link from "next/link";
import { desc, inArray } from "drizzle-orm";
import { db } from "@/db";
import { artStyles, designs } from "@/db/schema";
import { ensureArtStylesTable } from "@/db/bootstrap";

function getDesignRenderData(dnaDataRaw: string): { generatedImageUrl: string | null; price: number | null } {
  try {
    const parsed = JSON.parse(dnaDataRaw) as { generatedImageUrl?: string | null; price?: number };
    const generatedImageUrl =
      typeof parsed.generatedImageUrl === "string" && parsed.generatedImageUrl.length > 0 ? parsed.generatedImageUrl : null;
    const price = typeof parsed.price === "number" && Number.isFinite(parsed.price) ? parsed.price : null;
    return { generatedImageUrl, price };
  } catch {
    return { generatedImageUrl: null, price: null };
  }
}

export default async function LandingPage() {
  await ensureArtStylesTable();
  const latestDrops = await db.select().from(designs).orderBy(desc(designs.createdAt)).limit(3);
  
  const styleIds = Array.from(new Set(latestDrops.map((d) => d.styleId)));
  const styles = styleIds.length > 0
    ? await db.select().from(artStyles).where(inArray(artStyles.id, styleIds))
    : [];
  const styleMap = new Map(styles.map((s) => [s.id, s]));
  return (
    <main className="pt-16 sm:pt-24">
      {/* Hero Section */}
      <section className="relative min-h-[640px] sm:min-h-[921px] flex flex-col md:flex-row items-center justify-center px-4 sm:px-8 lg:px-12 gap-8 sm:gap-12 overflow-hidden">
        <div className="z-10 w-full md:w-1/2 space-y-8">
          <div className="space-y-2">
            <span className="font-label text-xs tracking-[0.3em] text-secondary-fixed uppercase">SYSTEM_INIT // 2024</span>
            <h1 className="text-7xl md:text-9xl font-bold font-headline tracking-tighter leading-none italic uppercase">
              WEAR YOUR <br /> <span className="text-primary">DNA</span>
            </h1>
          </div>
          <p className="max-w-md font-body text-zinc-400 text-lg leading-relaxed">
            Personalized algorithmic fashion. We translate your unique digital signature into high-performance kinetic apparel. No two pieces are identical.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link 
              href="/playground"
              className="bg-primary text-on-primary px-10 py-4 font-headline font-bold uppercase tracking-widest hover:bg-primary-container transition-all relative group"
            >
              CREATE AND SELL
              <div className="absolute -bottom-2 -right-2 w-full h-full border border-primary/30 -z-10 group-hover:bottom-0 group-hover:right-0 transition-all"></div>
            </Link>
            <Link 
              href="/collections"
              className="border-2 border-outline-variant text-secondary px-10 py-4 font-headline font-bold uppercase tracking-widest hover:border-secondary transition-all"
            >
              EXPLORE
            </Link>
          </div>
          <div className="font-label text-[10px] tracking-[0.1em] opacity-40 uppercase mt-12 flex gap-8">
            <span>GEN_CORE: v4.2.0</span>
            <span>THROUGHPUT: 128.8 TB/S</span>
            <span>LATENCY: 0.002MS</span>
          </div>
        </div>
        <div className="relative w-full md:w-1/2 flex justify-center items-center">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent rounded-full blur-[120px]"></div>
          <div className="relative group">
            <div className="absolute -top-4 -left-4 bg-secondary text-black font-headline font-black px-4 py-2 text-sm z-20 skew-x-[-12deg]">
              NEW RELEASE
            </div>
            <div className="bg-surface-container-high p-4 relative overflow-hidden border border-outline-variant/15">
              {/* Corner brackets */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary/40"></div>
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary/40"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary/40"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary/40"></div>
              
              <img 
                alt="Futuristic T-shirt design" 
                className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700 object-cover aspect-[4/5]" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeJHJIZKwsRZOpVTMSJKYhl6Qhu0FsiRCEkKBOnGyUrTtnvidBY7gvX15I5Wqk6HjpYCj3N4SLle2tac5_YdCS4UPgiTiSkL5lucOTpBzv-hIAWL91hwD6sigcLuLyv1bA4ES0X_-OeAvtWGI7t8aCYspOQhkGaMnn_AvItZeGxiojSZGFVhyrjJfXHU1ftMFqh68CLBaP_h3jzHARqNC5GqjHm1HuYgbzhz8z0ENI2DE2TPtcLHFAdaNvZWSopyIE21fsoQ5PbP0" 
              />
            </div>
            <div className="mt-4 flex justify-between items-end">
              <div>
                <h3 className="font-headline text-2xl font-bold tracking-tight">ETHREAL_01</h3>
                <span className="font-label text-xs text-primary opacity-60 uppercase tracking-widest">SERIES: VOID_CORE</span>
              </div>
              <div className="text-right">
                <span className="block text-secondary font-headline font-bold text-xl">$145.00</span>
                <span className="font-label text-[10px] tracking-[0.1em] opacity-40 uppercase">STOCK: LOW</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Process Section */}
      <section className="py-20 sm:py-32 px-4 sm:px-8 lg:px-12 bg-surface-container-low border-y border-outline-variant/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 font-label text-[8px] opacity-20 pointer-events-none tracking-widest">
          01001001 01001110 01010100 01000101 01010010 01000110 01000001 01000011 01000101
        </div>
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-12 h-[1px] bg-secondary"></span>
              <span className="font-label text-xs tracking-[0.3em] text-secondary uppercase">SYNTHESIS_PIPELINE</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold font-headline uppercase tracking-tighter italic">THE PROCESS</h2>
          </div>
          <div className="max-w-md border-l-2 border-primary/30 pl-8 py-2">
            <p className="font-body text-zinc-400 text-base leading-relaxed">
              Our proprietary synthesis engine processes your digital existence into unique geometric patterns which are then precision-printed onto tech-fabrics.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-zinc-800 bg-surface-container relative">
          {/* Step 1 */}
          <div className="p-12 border-b md:border-b-0 md:border-r border-zinc-800 hover:bg-surface-container-high transition-all duration-500 group relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
            <div className="flex justify-between items-start mb-12">
              <span className="text-7xl font-black font-headline text-zinc-800 group-hover:text-primary transition-all stroke-zinc-700">01</span>
              <span className="material-symbols-outlined text-primary/30 group-hover:text-primary transition-colors text-4xl">alternate_email</span>
            </div>
            <h3 className="text-3xl font-bold font-headline mb-4 uppercase tracking-tighter group-hover:text-primary transition-colors">INPUT HANDLE</h3>
            <p className="text-zinc-400 leading-relaxed text-lg mb-8">
              Connect your Twitter identity. Our scraper initializes the data harvest from your social graph and public discourse.
            </p>
            <div className="flex items-center gap-2 font-label text-[10px] tracking-[0.1em] uppercase text-secondary">
              <span className="w-2 h-2 bg-secondary animate-pulse"></span>
              <span>READY_FOR_HOOK</span>
            </div>
          </div>
          {/* Step 2 */}
          <div className="p-12 border-b md:border-b-0 md:border-r border-zinc-800 hover:bg-surface-container-high transition-all duration-500 group relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-secondary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
            <div className="flex justify-between items-start mb-12">
              <span className="text-7xl font-black font-headline text-zinc-800 group-hover:text-secondary transition-all">02</span>
              <span className="material-symbols-outlined text-secondary/30 group-hover:text-secondary transition-colors text-4xl">biotech</span>
            </div>
            <h3 className="text-3xl font-bold font-headline mb-4 uppercase tracking-tighter group-hover:text-secondary transition-colors">SYNTHESIZE</h3>
            <p className="text-zinc-400 leading-relaxed text-lg mb-8">
              Neural networks analyze your digital DNA. We extract sentiment, frequency, and intent to synthesize a one-of-one autonomous agent.
            </p>
            <div className="flex items-center gap-2 font-label text-[10px] tracking-[0.1em] uppercase text-primary">
              <span className="w-2 h-2 bg-primary"></span>
              <span>ALGO_v4.2_ACTIVE</span>
            </div>
          </div>
          {/* Step 3 */}
          <div className="p-12 hover:bg-surface-container-high transition-all duration-500 group relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
            <div className="flex justify-between items-start mb-12">
              <span className="text-7xl font-black font-headline text-zinc-800 group-hover:text-white transition-all">03</span>
              <span className="material-symbols-outlined text-zinc-600 group-hover:text-white transition-colors text-4xl">apparel</span>
            </div>
            <h3 className="text-3xl font-bold font-headline mb-4 uppercase tracking-tighter group-hover:text-white transition-colors">CREATE &amp; WEAR</h3>
            <p className="text-zinc-400 leading-relaxed text-lg mb-8">
              Your unique gear is generated. Mint your design, list it in the catalogue, or order your physical thermal-locked artifact.
            </p>
            <div className="flex items-center gap-2 font-label text-[10px] tracking-[0.1em] uppercase text-zinc-500">
              <span className="w-2 h-2 bg-zinc-700"></span>
              <span>DISPATCH_PENDING</span>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Drops */}
      <section className="py-20 sm:py-32 px-4 sm:px-8 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold font-headline tracking-tighter italic break-words">RECENT_DROPS</h2>
          <Link 
            href="/collections" 
            className="self-start sm:self-auto text-primary font-label text-xs tracking-[0.15em] sm:tracking-[0.2em] border-b border-primary pb-1 hover:text-secondary hover:border-secondary transition-all"
          >
            <span className="sm:hidden">VIEW_ALL</span>
            <span className="hidden sm:inline">VIEW_ALL_COLLECTIONS</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {latestDrops.length > 0 ? (
            latestDrops.map((p) => {
              const style = styleMap.get(p.styleId);
              const { generatedImageUrl, price } = getDesignRenderData(p.dnaData);
              const cardImageUrl = generatedImageUrl || "/images/tshirt-mockup.png";
              const displayPrice = price ?? (p.type === "hoodie" ? 120 : 72);
              const styleName = style?.name ?? p.styleId;

              return (
                <Link 
                  key={p.id}
                  href={`/product/${p.id}`} 
                  className="group bg-surface-container-lowest border border-zinc-800 p-4 transition-all hover:bg-surface-container-high"
                >
                  <div className="relative overflow-hidden mb-6 aspect-square bg-black flex items-center justify-center">
                    <img 
                      alt={styleName} 
                      className="w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500" 
                      src={cardImageUrl} 
                    />
                    <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 font-label text-[10px] tracking-widest border border-primary/20">
                      SN: {p.id.slice(0, 8).toUpperCase()}
                    </div>
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-headline font-bold text-lg uppercase text-zinc-100">{styleName.replace(/-/g, "_")}</h4>
                      <div className="font-label text-[10px] tracking-[0.1em] opacity-40 uppercase">@{p.handle} // {p.type}</div>
                    </div>
                    <span className="text-primary font-headline font-bold">${displayPrice}</span>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="col-span-full py-12 text-center border border-dashed border-zinc-800">
              <p className="text-zinc-500 font-label text-xs uppercase tracking-widest">No recent drops found</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-12 border-t border-zinc-800/50">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <h2 className="text-4xl md:text-6xl font-bold font-headline uppercase tracking-tighter leading-none italic text-zinc-100">
            JOIN THE <span className="text-secondary">VOID_PROTOCOL</span>
          </h2>
          <p className="text-zinc-400 font-body">Be the first to know about upcoming algorithm releases and drops.</p>
          <form className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto">
            <input 
              className="flex-grow bg-surface-container-low border-b-2 border-zinc-700 focus:border-primary focus:ring-0 text-primary font-label text-sm p-4 transition-all outline-none" 
              placeholder="ENTER_EMAIL_ADDR" 
              type="email"
            />
            <button className="bg-primary text-on-primary font-headline font-bold px-8 py-4 uppercase tracking-widest hover:bg-primary-container transition-all">
              SIGN_UP
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
