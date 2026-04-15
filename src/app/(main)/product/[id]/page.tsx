import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { artStyles, designs } from "@/db/schema";
import { ensureArtStylesTable } from "@/db/bootstrap";
import AddToCartButton from "@/components/checkout/AddToCartButton";
import TShirtPreviewStage from "@/components/TShirtPreviewStage";

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  await ensureArtStylesTable();
  const design = await db.select().from(designs).where(eq(designs.id, resolvedParams.id)).get();
  if (!design) notFound();
  const style = await db.select().from(artStyles).where(eq(artStyles.id, design.styleId)).get();
  const styleName = style?.name ?? design.styleId;
  const baseMockupImage = design.type === "hoodie" ? "/images/hoodie-mockup.jpg" : "/images/tshirt-mockup.png";
  const price = design.type === "hoodie" ? 120 : 72;

  let dna: {
    traits?: Array<{ label: string; value: number }>;
    metadata?: { node?: string };
    generatedImageUrl?: string;
    profileImageUrl?: string;
    qrCodeDataUrl?: string;
    amount?: number;
    price?: number;
  } = {};
  try {
    dna = JSON.parse(design.dnaData);
  } catch {
    dna = {};
  }
  const printImage = dna.generatedImageUrl || "/images/tshirt-mockup.png";
  const displayPrice = typeof dna.price === "number" && Number.isFinite(dna.price) ? dna.price : price;
  const initialAmount = typeof dna.amount === "number" && Number.isFinite(dna.amount) ? Math.max(1, Math.floor(dna.amount)) : 1;
  
  return (
    <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Product Gallery */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="relative bg-surface-container-low aspect-[4/5] overflow-hidden border border-zinc-800 transition-all duration-300">
            <TShirtPreviewStage
              type={design.type as "t-shirt" | "hoodie"}
              baseMockupSrc={baseMockupImage}
              artworkSrc={printImage}
              profileImageUrl={dna.profileImageUrl ?? null}
              qrCodeSrc={dna.qrCodeDataUrl ?? null}
              title={styleName}
              subtitle={design.type === "hoodie" ? "heavy shell" : "light core"}
              showMetadata
              className="h-full"
            />
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
              {styleName.replace(/-/g, "_")}
            </h1>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-3xl font-headline font-bold text-primary">${displayPrice.toFixed(2)}</span>
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
                <p className="text-zinc-300 font-light tracking-tight text-sm">
                  {design.type === "hoodie" ? "420GSM Heavyweight fleece blend." : "300GSM Technical cotton blend."}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-label text-[10px] tracking-[0.2em] text-zinc-500 uppercase">Fit</span>
                <p className="text-zinc-300 font-light tracking-tight text-sm">Boxy Oversized Silhouette. Drop-shoulder structural cut.</p>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-label text-[10px] tracking-[0.2em] text-zinc-500 uppercase">Detail</span>
                <p className="text-zinc-300 font-light tracking-tight text-sm">
                  <span>Style ID: {design.styleId}</span>
                  <span>{" // "}</span>
                  <span>Handle: @{design.handle}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-4">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between font-label text-[10px] tracking-[0.1em] text-zinc-500 uppercase">
                <span>Select Size</span>
                <button className="text-primary hover:underline transition-all">Size guide</button>
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
            <AddToCartButton
              item={{
                id: design.id,
                name: styleName.replace(/-/g, "_"),
                type: design.type,
                styleId: design.styleId,
                handle: `@${design.handle}`,
                image: printImage,
                price: displayPrice,
                quantity: initialAmount,
              }}
            />
            <button className="w-full border-2 border-zinc-800 py-4 text-zinc-400 font-headline font-bold text-sm tracking-widest uppercase hover:border-secondary hover:text-secondary transition-all">
              Save to Wishlist
            </button>
          </div>

          <div className="pt-6 border-t border-zinc-800/50 flex flex-col gap-3">
            <div className="flex items-center gap-3 text-zinc-500">
              <span className="material-symbols-outlined text-sm">verified</span>
              <span className="font-label text-[10px] tracking-widest uppercase">
                DNA Node: {dna?.metadata?.node ?? "N/A"}
              </span>
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
        {(dna.traits ?? []).slice(0, 3).map((feat, i) => (
          <div key={i} className="bg-surface-container-high p-8 flex flex-col gap-4 border border-zinc-800 relative group overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-100 transition-opacity">
              <span className="font-label text-[8px] text-zinc-500 uppercase">CODE:00{i+1}</span>
            </div>
            <div className="w-12 h-12 bg-primary/10 flex items-center justify-center text-primary border border-current opacity-60">
              <span className="material-symbols-outlined">query_stats</span>
            </div>
            <h3 className="font-headline font-black text-xl tracking-tighter uppercase text-zinc-100 italic">{feat.label}</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">Signal strength: {feat.value}%</p>
            <div className="mt-auto h-0.5 w-0 group-hover:w-full bg-current text-primary transition-all duration-500"></div>
          </div>
        ))}
      </div>
    </main>
  );
}
