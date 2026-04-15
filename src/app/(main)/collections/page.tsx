import Link from "next/link";
import { desc, inArray } from "drizzle-orm";
import { db } from "@/db";
import { artStyles, designs } from "@/db/schema";
import { ensureArtStylesTable } from "@/db/bootstrap";

export const dynamic = "force-dynamic";
const PAGE_SIZE = 24;

type CollectionsPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

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

export default async function CollectionsPage({ searchParams }: CollectionsPageProps) {
  const params = (await searchParams) ?? {};
  const pageParam = Array.isArray(params.page) ? params.page[0] : params.page;
  const parsedPage = Number.parseInt(pageParam ?? "1", 10);
  const page = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;
  const limit = page * PAGE_SIZE + 1;

  await ensureArtStylesTable();
  const fetchedDesigns = await db.select().from(designs).orderBy(desc(designs.createdAt)).limit(limit);
  const hasMore = fetchedDesigns.length > page * PAGE_SIZE;
  const latestDesigns = fetchedDesigns.slice(0, page * PAGE_SIZE);
  const styleIds = Array.from(new Set(latestDesigns.map((d) => d.styleId)));
  const styles = styleIds.length > 0
    ? await db.select().from(artStyles).where(inArray(artStyles.id, styleIds))
    : [];
  const styleMap = new Map(styles.map((s) => [s.id, s]));

  return (
    <main className="flex-grow pt-28 sm:pt-32 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Hero/Header Section */}
      <header className="mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="font-label text-[10px] tracking-[0.3em] text-primary mb-2 uppercase">Latest Products</p>
            <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter leading-none italic text-zinc-100">Collection</h1>
          </div>
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-3 font-label text-xs tracking-widest">
            <button className="px-6 py-2 bg-primary text-on-primary font-bold transition-all">ALL_GEAR</button>
            <button className="px-6 py-2 border border-zinc-800 text-zinc-500 hover:border-secondary hover:text-secondary transition-colors">DROPS</button>
            <button className="px-6 py-2 border border-zinc-800 text-zinc-500 hover:border-secondary hover:text-secondary transition-colors">ARCHIVE</button>
          </div>
        </div>
      </header>

      {latestDesigns.length === 0 ? (
        <div className="border border-zinc-800 bg-surface-container-low p-10 text-center">
          <p className="font-label text-xs uppercase tracking-[0.25em] text-zinc-500">Collection empty</p>
          <h2 className="mt-3 text-3xl font-headline font-black italic text-zinc-100">No products published yet</h2>
          <p className="mt-3 text-sm text-zinc-500 max-w-md mx-auto">
            Create a design in the playground and it will appear here automatically.
          </p>
          <Link
            href="/playground"
            className="inline-flex mt-8 items-center justify-center bg-primary text-on-primary px-8 py-4 font-headline font-black uppercase tracking-widest transition-all hover:bg-primary-container"
          >
            Open Playground
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestDesigns.map((p) => {
            const style = styleMap.get(p.styleId);
            const { generatedImageUrl, price } = getDesignRenderData(p.dnaData);
            const cardImageUrl = generatedImageUrl || "/images/tshirt-mockup.png";
            const displayPrice = price ?? (p.type === "hoodie" ? 120 : 72);
            return (
              <Link
                key={p.id}
                href={`/product/${p.id}`}
                className="product-card group cursor-pointer"
              >
                <div className="relative aspect-[4/5] bg-surface-container-low mb-4 overflow-hidden border border-zinc-800 group-hover:border-primary transition-all duration-300">
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary/0 group-hover:border-primary/40 transition-all"></div>
                  <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary/0 group-hover:border-primary/40 transition-all"></div>
                  <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary/0 group-hover:border-primary/40 transition-all"></div>
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary/0 group-hover:border-primary/40 transition-all"></div>

                  <img
                    alt={style?.name ?? p.styleId}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100"
                    src={cardImageUrl}
                  />
                  <div className="absolute top-4 right-4 px-2 py-1 text-[10px] font-label tracking-widest font-bold border text-primary border-primary/30">
                    LIVE_DROP
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold tracking-tight uppercase group-hover:text-primary transition-colors text-zinc-100">
                      {(style?.name ?? p.styleId).replace(/-/g, "_")}
                    </h3>
                    <p className="text-xs text-zinc-500 font-label mt-1">
                      <span>@{p.handle}</span>
                      <span>{" // "}</span>
                      <span>{p.type.toUpperCase()}</span>
                    </p>
                  </div>
                  <div className="text-xl font-bold text-secondary">
                    ${displayPrice.toFixed(2)}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* Pagination / Load More */}
      <div className="mt-20 flex justify-center">
        {hasMore ? (
          <Link href={`/collections?page=${page + 1}`} className="group flex flex-col items-center gap-4">
            <span className="font-label text-xs tracking-[0.35em] uppercase text-zinc-500 group-hover:text-primary transition-colors">Load More</span>
            <div className="h-[1px] w-40 bg-zinc-800 relative overflow-hidden">
              <div className="absolute inset-0 bg-primary -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
            </div>
          </Link>
        ) : (
          <div className="flex flex-col items-center gap-4 opacity-50">
            <span className="font-label text-xs tracking-[0.35em] uppercase text-zinc-600">No More Items</span>
            <div className="h-[1px] w-40 bg-zinc-800" />
          </div>
        )}
      </div>
    </main>
  );
}
