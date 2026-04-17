"use client";

import Link from "next/link";
import { useState } from "react";
import { useAccount as useWagmiAccount } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useEffect } from "react";
import TShirtPreviewStage from "@/components/TShirtPreviewStage";

type ArtStyle = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
};

type DnaTrait = {
  label: string;
  value: number;
};

type DnaData = {
  profileImageUrl?: string | null;
  generatedImageUrl?: string | null;
  qrCodeDataUrl?: string | null;
  scrapedAt?: string;
  tweetCount?: number;
  replyCount?: number;
  traits: DnaTrait[];
  metadata: {
    node?: string;
    avg_engagement?: number;
    top_words?: string[];
  };
  rawSample?: string[];
};

const DEFAULT_ART_STYLES: ArtStyle[] = [
  {
    id: "cyber_kinetic",
    name: "CYBER_KINETIC",
    description: "Default DNA monochrome prompt",
    imageUrl: "/images/dna/example-reference.jpg",
  },
];

export default function PlaygroundPage() {
  const [selectedType, setSelectedType] = useState('t-shirt');
  const [selectedStyle, setSelectedStyle] = useState("");
  const [handle, setHandle] = useState("");
  const [dnaData, setDnaData] = useState<DnaData | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isGeneratingArt, setIsGeneratingArt] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [artStyles, setArtStyles] = useState<ArtStyle[]>(DEFAULT_ART_STYLES);
  const [amount, setAmount] = useState(1);
  const [price, setPrice] = useState(72);
  
  const { isConnected: isWagmiConnected } = useWagmiAccount();
  const { openConnectModal } = useConnectModal();
  const isConnected = isWagmiConnected;
  const topWords = dnaData?.metadata.top_words ?? [];
  const rawSample = dnaData?.rawSample ?? [];

  useEffect(() => {
    async function loadStyles() {
      try {
        const res = await fetch("/api/art-styles");
        if (!res.ok) return;
        const data = await res.json();
        if (Array.isArray(data.styles) && data.styles.length > 0) {
          // For now we only surface one DNA prompt option.
          setArtStyles([data.styles[0]]);
        }
      } catch (err) {
        console.error("Failed to load styles:", err);
      }
    }
    loadStyles();
  }, []);

  useEffect(() => {
    if (!selectedStyle && artStyles.length > 0) {
      setSelectedStyle(artStyles[0].id);
    }
  }, [artStyles, selectedStyle]);

  const handleSyncHandle = async (): Promise<DnaData | null> => {
    if (!handle) return null;
    setIsSyncing(true);
    try {
      const res = await fetch(`/api/dna/twitter?handle=${encodeURIComponent(handle)}`);
      const data = (await res.json()) as DnaData;
      setDnaData(data);
      return data;
    } catch (err) {
      console.error("Sync failed:", err);
      return null;
    } finally {
      setIsSyncing(false);
    }
  };

  const handleGenerateArtwork = async (styleId: string) => {
    const cleanHandle = handle.trim().replace(/^@/, "");
    if (!cleanHandle) return;

    setSelectedType("t-shirt");

    let profileData = dnaData;
    if (!profileData?.profileImageUrl) {
      profileData = await handleSyncHandle();
      if (!profileData?.profileImageUrl) return;
    }

    setIsGeneratingArt(true);
    try {
      const res = await fetch("/api/dna/banana", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          handle: cleanHandle,
          styleId,
          qrText: `https://qr2.fun/a/${cleanHandle}`,
        }),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result?.error || "Failed to generate artwork");
      }

      setDnaData((current) =>
        current
          ? {
              ...current,
              profileImageUrl: result.profileImageUrl ?? current.profileImageUrl ?? profileData?.profileImageUrl ?? null,
              generatedImageUrl: result.imageUrl,
              qrCodeDataUrl: result.qrCodeDataUrl ?? current.qrCodeDataUrl,
            }
          : {
              profileImageUrl: result.profileImageUrl ?? profileData?.profileImageUrl ?? null,
              generatedImageUrl: result.imageUrl,
              qrCodeDataUrl: result.qrCodeDataUrl ?? null,
              scrapedAt: undefined,
              tweetCount: undefined,
              replyCount: undefined,
              traits: [],
              metadata: {},
              rawSample: [],
            },
      );
    } catch (err) {
      console.error("Artwork generation failed:", err);
    } finally {
      setIsGeneratingArt(false);
    }
  };

  const handleConfirmGeneration = async () => {
    setIsSaving(true);
    try {
        const normalizedAmount = Math.max(1, Math.floor(amount || 1));
        const normalizedPrice = Math.max(1, Number(price) || 72);
        const designDnaData = {
          ...(dnaData || { status: "UNSYNCED" }),
          amount: normalizedAmount,
          price: normalizedPrice,
        };
        const res = await fetch("/api/designs/save", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                handle: handle.trim(),
                type: selectedType,
                styleId: selectedStyle,
                dnaData: designDnaData,
                qrUrl: `https://qr2.fun/a/${handle.trim() || 'anonymous'}`
            })
        });
        const result = await res.json();
        if (result.success) {
            window.location.href = `/product/${result.id}`;
        }
    } catch (err) {
        console.error("Save failed:", err);
    } finally {
        setIsSaving(false);
    }
  };

  const selectedArtworkSrc =
    dnaData?.generatedImageUrl ||
    artStyles.find((style) => style.id === selectedStyle)?.imageUrl ||
    "/images/dna/example-reference.jpg";

  const selectedMockupSrc =
    selectedType === "hoodie" ? "/images/hoodie-mockup.jpg" : "/images/tshirt-mockup.png";

  return (
    <main className="pt-16 sm:pt-24 min-h-screen px-4 sm:px-6 lg:px-8 pb-8 bg-background relative overflow-hidden">
      {/* Background Data Noise Decor */}
      <div className="hidden lg:block absolute top-40 right-10 opacity-10 font-label text-[10px] text-primary rotate-90 tracking-[1em] pointer-events-none uppercase">
        sys_load_78% // stream_buffer_active // kinetic_sync_enabled
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6 lg:gap-8">
        {/* Left Column: Configuration */}
        <div className="col-span-12 lg:col-span-5 space-y-8">
          <header>
            <h1 className="text-3xl sm:text-5xl font-bold font-headline tracking-tighter italic mb-2 text-zinc-100">Design Playground</h1>
            <p className="font-label text-zinc-500 tracking-widest text-xs uppercase">Create your custom product in three steps.</p>
          </header>

          {/* Input Handle */}
          <section className="space-y-4">
            <div className="flex justify-between items-end">
              <label className="font-label text-[10px] tracking-[0.2em] text-primary uppercase font-bold">Twitter Handle</label>
              <span className="hidden sm:inline font-label text-[8px] text-zinc-600 uppercase">SYS_REF_292</span>
            </div>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-headline text-lg italic">@</div>
              <input 
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                className="w-full bg-surface-container-low border-b-2 border-zinc-800 py-4 pl-10 pr-24 text-primary font-headline focus:ring-0 focus:border-primary transition-all underline-none outline-none" 
                placeholder="your_handle" 
                type="text"
              />
              <button 
                onClick={handleSyncHandle}
                disabled={isSyncing || !handle}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 font-headline text-xs italic tracking-widest transition-all disabled:opacity-50"
              >
                {isSyncing ? "Syncing..." : "Sync"}
              </button>
            </div>
            {dnaData && (
                <div className="bg-surface-container-high/50 p-4 border border-zinc-800/50 space-y-3">
                    <div className="flex justify-between items-center text-[8px] font-label text-zinc-500 uppercase tracking-widest">
                        <span>Neural_Profile: {dnaData.scrapedAt ? "LIVE_SCRAPED" : "ACTIVE"}</span>
                        <span>{dnaData.metadata.node}</span>
                    </div>
                    {/* Scrape stats */}
                    {(dnaData.tweetCount ?? 0) > 0 && (
                      <div className="flex gap-4 text-[7px] font-label uppercase tracking-widest">
                        <span className="text-zinc-600">Posts: <span className="text-primary">{dnaData.tweetCount}</span></span>
                        <span className="text-zinc-600">Replies: <span className="text-secondary">{dnaData.replyCount}</span></span>
                        <span className="text-zinc-600">Avg_Eng: <span className="text-zinc-400">{dnaData.metadata.avg_engagement}</span></span>
                      </div>
                    )}
                    {/* Trait bars */}
                    <div className="grid grid-cols-2 gap-4">
                        {dnaData.traits.map((trait) => (
                            <div key={trait.label} className="space-y-1">
                                <div className="flex justify-between text-[7px] font-label text-zinc-600 uppercase">
                                    <span>{trait.label}</span>
                                    <span>{trait.value}%</span>
                                </div>
                                <div className="h-0.5 bg-zinc-900 w-full">
                                    <div className="h-full bg-primary transition-all duration-700" style={{ width: `${trait.value}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Top words */}
                    {topWords.length > 0 && (
                      <div className="space-y-1">
                        <div className="text-[7px] font-label text-zinc-600 uppercase tracking-widest">Signal_Keywords</div>
                        <div className="flex flex-wrap gap-1">
                          {topWords.map((w: string) => (
                            <span key={w} className="text-[7px] font-label bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 text-primary uppercase tracking-wide">{w}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {/* Raw sample tweets */}
                    {rawSample.length > 0 && (
                      <div className="space-y-1">
                        <div className="text-[7px] font-label text-zinc-600 uppercase tracking-widest">Signal_Sample</div>
                        {rawSample.map((t: string, i: number) => (
                          <div key={i} className="text-[7px] font-label text-zinc-500 border-l border-zinc-800 pl-2 leading-relaxed line-clamp-1">{t}</div>
                        ))}
                      </div>
                    )}
                </div>
            )}

          </section>

          {/* Style Generation */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="font-label text-[10px] tracking-[0.2em] text-primary uppercase font-bold">Choose Art Style</label>
                  <Link href="/playground/styles/upload" className="font-label text-[10px] tracking-widest uppercase text-secondary hover:text-primary">
                Upload Style
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {artStyles.map((style) => (
                <button
                  type="button"
                  key={style.id}
                  onClick={() => {
                    setSelectedStyle(style.id);
                  }}
                  className={`bg-surface-container-low p-4 flex items-center gap-4 border-l-4 transition-all cursor-pointer ${selectedStyle === style.id ? 'border-secondary bg-surface-container-high' : 'border-zinc-800 hover:bg-surface-container hover:border-zinc-600'}`}
                >
                  <div className="w-16 h-16 bg-zinc-800 flex-shrink-0 relative overflow-hidden">
                    <img
                      className="w-full h-full object-cover grayscale opacity-60 hover:grayscale-0 transition-all duration-300"
                      src={selectedStyle === style.id && dnaData?.generatedImageUrl ? dnaData.generatedImageUrl : style.imageUrl}
                      alt={style.name}
                    />
                    {isGeneratingArt && selectedStyle === style.id && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/45">
                        <span className="font-label text-[8px] uppercase tracking-[0.3em] text-white">
                          Generating
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className={`font-headline font-bold italic ${selectedStyle === style.id ? 'text-secondary' : 'text-zinc-400'}`}>{style.name}</div>
                    <div className="font-label text-[10px] text-zinc-600 uppercase">{style.description}</div>
                  </div>
                  <div className={selectedStyle === style.id ? 'text-secondary' : 'text-zinc-700'}>
                    <span className="material-symbols-outlined">{selectedStyle === style.id ? 'radio_button_checked' : 'radio_button_unchecked'}</span>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Shirt Creation */}
          <section className="space-y-4">
            <label className="font-label text-[10px] tracking-[0.2em] text-primary uppercase font-bold">Product Setup</label>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setSelectedType('t-shirt')}
                className={`border-2 p-6 text-left transition-all ${selectedType === 't-shirt' ? 'border-primary bg-surface-container-high' : 'border-zinc-800 bg-surface-container-low hover:border-zinc-600'}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <span className={`material-symbols-outlined text-3xl ${selectedType === 't-shirt' ? 'text-primary' : 'text-zinc-500'}`}>checkroom</span>
                  {selectedType === 't-shirt' && <span className="material-symbols-outlined text-primary text-xs font-bold">check_circle</span>}
                </div>
                <div className={`font-headline font-bold text-lg italic ${selectedType === 't-shirt' ? 'text-primary' : 'text-zinc-500'}`}>T-Shirt</div>
                <div className="font-label text-[10px] text-zinc-600 uppercase mt-1">Lightweight Core</div>
              </button>
              <button 
                onClick={() => setSelectedType('hoodie')}
                className={`border-2 p-6 text-left transition-all ${selectedType === 'hoodie' ? 'border-primary bg-surface-container-high' : 'border-zinc-800 bg-surface-container-low hover:border-zinc-600'}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <span className={`material-symbols-outlined text-3xl ${selectedType === 'hoodie' ? 'text-primary' : 'text-zinc-500'}`}>styler</span>
                  {selectedType === 'hoodie' && <span className="material-symbols-outlined text-primary text-xs font-bold">check_circle</span>}
                </div>
                <div className={`font-headline font-bold text-lg italic ${selectedType === 'hoodie' ? 'text-primary' : 'text-zinc-500'}`}>Hoodie</div>
                <div className="font-label text-[10px] text-zinc-600 uppercase mt-1">Heavy Shield</div>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="font-label text-[9px] tracking-[0.2em] text-zinc-500 uppercase">Amount</label>
                <input
                  type="number"
                  min={1}
                  value={amount}
                  onChange={(e) => setAmount(Math.max(1, Number.parseInt(e.target.value || "1", 10) || 1))}
                  className="w-full bg-surface-container-low border border-zinc-800 py-3 px-4 text-primary font-headline outline-none focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <label className="font-label text-[9px] tracking-[0.2em] text-zinc-500 uppercase">Price (USD)</label>
                <input
                  type="number"
                  min={1}
                  step={0.01}
                  value={price}
                  onChange={(e) => setPrice(Math.max(1, Number(e.target.value) || 1))}
                  className="w-full bg-surface-container-low border border-zinc-800 py-3 px-4 text-primary font-headline outline-none focus:border-primary"
                />
              </div>
            </div>
          </section>

          <div className="space-y-2">
            <button
              type="button"
              onClick={() => void handleGenerateArtwork(selectedStyle)}
              disabled={isGeneratingArt || !selectedStyle || !handle.trim() || !dnaData}
              className="w-full flex items-center justify-center gap-3 bg-secondary/20 border border-secondary/50 text-secondary py-4 font-headline font-bold tracking-widest hover:bg-secondary/30 transition-all uppercase disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGeneratingArt ? "GENERATING_DNA..." : "GENERATE"}
              <span className="material-symbols-outlined">auto_awesome</span>
            </button>
            {!dnaData && (
              <p className="font-label text-[9px] text-zinc-500 uppercase tracking-widest">
                Sync twitter handle first to enable generate
              </p>
            )}
          </div>
        </div>

        {/* Right Column: Live Preview */}
        <div className="col-span-12 lg:col-span-7 lg:sticky lg:top-24 h-fit">
          <div className="relative bg-surface-container-highest min-h-[30rem] sm:min-h-[34rem] lg:min-h-[38rem] flex items-center justify-center overflow-hidden border border-zinc-800/30">
            {/* HUD Elements */}
            <div className="hidden sm:block absolute top-6 left-6 border-l border-t border-primary/40 w-12 h-12"></div>
            <div className="hidden sm:block absolute top-6 right-6 border-r border-t border-primary/40 w-12 h-12"></div>
            <div className="hidden sm:block absolute bottom-6 left-6 border-l border-b border-primary/40 w-12 h-12"></div>
            <div className="hidden sm:block absolute bottom-6 right-6 border-r border-b border-primary/40 w-12 h-12"></div>
            
            <div className="hidden sm:flex absolute top-8 left-1/2 -translate-x-1/2 items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
              <span className="font-label text-[10px] tracking-[0.3em] text-secondary uppercase font-bold">Live Preview</span>
            </div>

            <div className="relative w-full max-w-[26rem] sm:max-w-[30rem] lg:max-w-[28rem] xl:max-w-[30rem] aspect-[4/5] p-4 sm:p-6">
              <TShirtPreviewStage
                type={selectedType as "t-shirt" | "hoodie"}
                baseMockupSrc={selectedMockupSrc}
                artworkSrc={selectedArtworkSrc}
                profileImageUrl={dnaData?.profileImageUrl ?? null}
                title="LIVE PREVIEW"
                subtitle="three.js style stage"
                compact
                showMetadata={false}
                className="h-full"
              />
            </div>

            {/* Metadata HUD Overlay */}
            <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 space-y-1">
              <div className="font-label text-[8px] text-zinc-600 uppercase tracking-widest">Model v9.0</div>
              <div className="font-headline font-bold text-primary tracking-widest text-sm italic">Render Active</div>
            </div>
            <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 text-right space-y-1">
              <div className="font-label text-[8px] text-zinc-600 uppercase tracking-widest">Hash ID</div>
              <div className="font-headline font-bold text-secondary tracking-widest text-sm italic">{dnaData ? dnaData.metadata.node : "0x8FF5...FF2F"}</div>
            </div>

          </div>

          {/* Action Bar */}
          <div className="mt-4 grid grid-cols-1 gap-4">
            <button 
                onClick={handleConfirmGeneration}
                disabled={isSaving || !dnaData?.generatedImageUrl}
                className="flex items-center justify-center gap-3 bg-primary text-on-primary py-5 font-headline font-bold tracking-widest hover:bg-primary-container transition-all uppercase shadow-[0_0_25px_rgba(143,245,255,0.4)] italic disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? "Saving..." : "Create Product"} <span className="material-symbols-outlined font-bold">bolt</span>
            </button>
            {!dnaData?.generatedImageUrl && (
              <p className="font-label text-[9px] text-zinc-500 uppercase tracking-widest">
                Generate pattern first to enable create
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Background Noise/HUD Textures */}
      <div className="hidden sm:block fixed bottom-4 left-4 z-40 pointer-events-none">
        <div className="bg-zinc-900/50 px-3 py-1 border border-zinc-800 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
          <span className="font-label text-[9px] text-zinc-600 uppercase tracking-[0.2em]">Connection: Ready</span>
        </div>
      </div>

      {/* Connection Guard Overlay */}
      {!isConnected && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 sm:p-12">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xl" />
          <div className="relative w-full max-w-xl bg-zinc-950 border border-primary/20 p-8 sm:p-16 shadow-[0_0_100px_rgba(0,0,0,1)] text-center space-y-10">
            <div className="space-y-4">
              <div className="font-label text-primary text-[10px] tracking-[0.5em] uppercase opacity-70">ACCESS_RESTRICTED // ENCRYPTED_STREAMS</div>
              <h2 className="text-5xl font-black font-headline tracking-tighter italic uppercase text-white leading-none">UPLINK_REQUIRED</h2>
              <p className="text-zinc-500 font-label text-xs uppercase tracking-widest max-w-sm mx-auto">Establish a secure multi-chain identity sync to access the Forge interface.</p>
            </div>
            
            <button 
              onClick={() => openConnectModal?.()}
              className="px-10 py-5 bg-primary text-on-primary font-headline font-bold tracking-widest text-xl hover:bg-primary-container transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(143,245,255,0.3)] italic uppercase"
            >
              WAGMI
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
