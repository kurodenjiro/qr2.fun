"use client";

import Link from "next/link";
import { useState } from "react";
import { useAccount as useWagmiAccount } from "wagmi";
import LoginModal from "@/components/auth/LoginModal";
import QRCode from "qrcode";
import { useEffect } from "react";

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
    description: "High-frequency energy pulse",
    imageUrl: "/images/dna/cyber-kinetic.svg",
  },
  {
    id: "mono_stasis",
    name: "MONO_STASIS",
    description: "Low-profile digital silence",
    imageUrl: "/images/dna/mono-stasis.svg",
  },
  {
    id: "void_signal",
    name: "VOID_SIGNAL",
    description: "Deep-space residual waveform",
    imageUrl: "/images/dna/void-signal.svg",
  },
];

export default function PlaygroundPage() {
  const [selectedType, setSelectedType] = useState('t-shirt');
  const [selectedStyle, setSelectedStyle] = useState("");
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isPreviewExpanded, setIsPreviewExpanded] = useState(false);
  const [handle, setHandle] = useState("");
  const [dnaData, setDnaData] = useState<DnaData | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [artStyles, setArtStyles] = useState<ArtStyle[]>(DEFAULT_ART_STYLES);
  
  const { isConnected: isWagmiConnected } = useWagmiAccount();
  const isConnected = isWagmiConnected;
  const topWords = dnaData?.metadata.top_words ?? [];
  const rawSample = dnaData?.rawSample ?? [];

  // Garment Images
  const garmentImages = {
    't-shirt': '/images/tshirt-mockup.png',
    'hoodie': '/images/hoodie-mockup.jpg'
  };

  useEffect(() => {
    async function loadStyles() {
      try {
        const res = await fetch("/api/art-styles");
        if (!res.ok) return;
        const data = await res.json();
        if (Array.isArray(data.styles) && data.styles.length > 0) {
          setArtStyles(data.styles);
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

  const handleSyncHandle = async () => {
    if (!handle) return;
    setIsSyncing(true);
    try {
      const res = await fetch(`/api/dna/twitter?handle=${encodeURIComponent(handle)}`);
      const data = (await res.json()) as DnaData;
      setDnaData(data);
      
      // Generate QR Code for qr2.fun/id (using handle as id placeholder for now)
      const qrData = await QRCode.toDataURL(`https://qr2.fun/${handle}`);
      setQrCodeDataUrl(qrData);
    } catch (err) {
      console.error("Sync failed:", err);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleConfirmGeneration = async () => {
    setIsSaving(true);
    try {
        const res = await fetch("/api/designs/save", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                handle: handle.trim(),
                type: selectedType,
                styleId: selectedStyle,
                dnaData: dnaData || { status: "UNSYNCED" },
                qrUrl: `https://qr2.fun/${handle.trim() || 'anonymous'}`
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

  return (
    <main className="pt-24 min-h-screen p-8 bg-background relative overflow-hidden">
      {/* Background Data Noise Decor */}
      <div className="absolute top-40 right-10 opacity-10 font-label text-[10px] text-primary rotate-90 tracking-[1em] pointer-events-none uppercase">
        sys_load_78% // stream_buffer_active // kinetic_sync_enabled
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8">
        {/* Left Column: Configuration */}
        <div className="col-span-12 lg:col-span-5 space-y-10">
          <header>
            <h1 className="text-5xl font-bold font-headline tracking-tighter italic mb-2 text-zinc-100">PLAYGROUND_ENTITY</h1>
            <p className="font-label text-zinc-500 tracking-widest text-xs uppercase">Design your physical interface proxy.</p>
          </header>

          {/* Input Handle */}
          <section className="space-y-4">
            <div className="flex justify-between items-end">
              <label className="font-label text-[10px] tracking-[0.2em] text-primary uppercase font-bold">Twitter Handle</label>
              <span className="font-label text-[8px] text-zinc-600 uppercase">SYS_REF_292</span>
            </div>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-headline text-lg italic">@</div>
              <input 
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                className="w-full bg-surface-container-low border-b-2 border-zinc-800 py-4 pl-10 pr-24 text-primary font-headline focus:ring-0 focus:border-primary transition-all underline-none outline-none" 
                placeholder="IDENTITY_KEY" 
                type="text"
              />
              <button 
                onClick={handleSyncHandle}
                disabled={isSyncing || !handle}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 font-headline text-xs italic tracking-widest transition-all disabled:opacity-50"
              >
                {isSyncing ? "SYNCING..." : "SYNC_IDENTITY"}
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

          {/* Apparel Type Selection */}
          <section className="space-y-4">
            <label className="font-label text-[10px] tracking-[0.2em] text-primary uppercase font-bold">Apparel Type</label>
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
          </section>

          {/* Art Style Selection Cards */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="font-label text-[10px] tracking-[0.2em] text-primary uppercase font-bold">Art DNA Style</label>
              <Link href="/playground/styles/upload" className="font-label text-[10px] tracking-widest uppercase text-secondary hover:text-primary">
                Upload Style
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {artStyles.map((style) => (
                <div 
                  key={style.id}
                  onClick={() => setSelectedStyle(style.id)}
                  className={`bg-surface-container-low p-4 flex items-center gap-4 border-l-4 transition-all cursor-pointer ${selectedStyle === style.id ? 'border-secondary bg-surface-container-high' : 'border-zinc-800 hover:bg-surface-container hover:border-zinc-600'}`}
                >
                  <div className="w-16 h-16 bg-zinc-800 flex-shrink-0 relative overflow-hidden">
                    <img className="w-full h-full object-cover grayscale opacity-60 hover:grayscale-0 transition-all duration-300" src={style.imageUrl} alt={style.name} />
                  </div>
                  <div className="flex-1">
                    <div className={`font-headline font-bold italic ${selectedStyle === style.id ? 'text-secondary' : 'text-zinc-400'}`}>{style.name}</div>
                    <div className="font-label text-[10px] text-zinc-600 uppercase">{style.description}</div>
                  </div>
                  <div className={selectedStyle === style.id ? 'text-secondary' : 'text-zinc-700'}>
                    <span className="material-symbols-outlined">{selectedStyle === style.id ? 'radio_button_checked' : 'radio_button_unchecked'}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Live Preview */}
        <div className="col-span-12 lg:col-span-7 lg:sticky lg:top-24 h-fit">
          <div className="relative bg-surface-container-highest aspect-[4/5] flex items-center justify-center overflow-hidden border border-zinc-800/30">
            {/* HUD Elements */}
            <div className="absolute top-6 left-6 border-l border-t border-primary/40 w-12 h-12"></div>
            <div className="absolute top-6 right-6 border-r border-t border-primary/40 w-12 h-12"></div>
            <div className="absolute bottom-6 left-6 border-l border-b border-primary/40 w-12 h-12"></div>
            <div className="absolute bottom-6 right-6 border-r border-b border-primary/40 w-12 h-12"></div>
            
            <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
              <span className="font-label text-[10px] tracking-[0.3em] text-secondary uppercase font-bold">Live_Simulation_Active</span>
            </div>

            {/* The Apparel Preview */}
            <div className="relative w-4/5 h-4/5 flex items-center justify-center">
              <img 
                className="w-full h-full object-contain mix-blend-screen opacity-90 transition-all duration-500" 
                src={garmentImages[selectedType as keyof typeof garmentImages]} 
                alt="Apparel Mockup"
              />
              {/* DNA Art Overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className={`transition-all duration-700 relative ${selectedType === 'hoodie' ? 'w-40 h-56 mt-4' : 'w-48 h-64'} opacity-80 mix-blend-lighten shadow-[0_0_30px_rgba(143,245,255,0.2)] border border-primary/20`}>
                  <img 
                    className="w-full h-full object-cover" 
                    src={artStyles.find(s => s.id === selectedStyle)?.imageUrl} 
                    alt="DNA Art overlay" 
                  />
                  {/* QR Code Synthesis Overlay */}
                  {qrCodeDataUrl && (
                    <div className="absolute bottom-4 right-4 w-12 h-12 bg-white p-1 border border-black/50 shadow-lg mix-blend-screen opacity-90">
                        <img src={qrCodeDataUrl} className="w-full h-full invert" alt="QR Link" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Metadata HUD Overlay */}
            <div className="absolute bottom-10 left-10 space-y-1">
              <div className="font-label text-[8px] text-zinc-600 uppercase tracking-widest">Model_v_9.0</div>
              <div className="font-headline font-bold text-primary tracking-widest text-sm italic">RENDER_001_ACTIVE</div>
            </div>
            <div className="absolute bottom-10 right-10 text-right space-y-1">
              <div className="font-label text-[8px] text-zinc-600 uppercase tracking-widest">Hash_ID</div>
              <div className="font-headline font-bold text-secondary tracking-widest text-sm italic">{dnaData ? dnaData.metadata.node : "0x8FF5...FF2F"}</div>
            </div>

            {/* Fullscreen/Focus CTA */}
            <div 
                onClick={() => setIsPreviewExpanded(true)}
                className="absolute inset-0 bg-primary/5 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center cursor-zoom-in backdrop-blur-[2px] group z-20"
            >
              <div className="border-2 border-primary bg-black/80 px-6 py-3 font-headline font-bold text-primary tracking-widest uppercase italic shadow-[0_0_15px_rgba(143,245,255,0.3)]">EXPAND_PREVIEW</div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="mt-4 grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 bg-zinc-900 border border-zinc-800 text-zinc-400 py-5 font-headline font-bold tracking-widest hover:bg-zinc-800 transition-all uppercase italic">
              <span className="material-symbols-outlined">save</span> SAVE_DRAFT
            </button>
            <button 
                onClick={handleConfirmGeneration}
                disabled={isSaving}
                className="flex items-center justify-center gap-3 bg-primary text-on-primary py-5 font-headline font-bold tracking-widest hover:bg-primary-container transition-all uppercase shadow-[0_0_25px_rgba(143,245,255,0.4)] italic"
            >
              {isSaving ? "SAVING_MANIFEST..." : "CONFIRM_GENERATION"} <span className="material-symbols-outlined font-bold">bolt</span>
            </button>
          </div>
        </div>
      </div>

      {/* Background Noise/HUD Textures */}
      <div className="fixed bottom-4 left-4 z-40 pointer-events-none">
        <div className="bg-zinc-900/50 px-3 py-1 border border-zinc-800 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
          <span className="font-label text-[9px] text-zinc-600 uppercase tracking-[0.2em]">Local_Node_Sync: OK</span>
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
              onClick={() => setIsLoginModalOpen(true)}
              className="px-10 py-5 bg-primary text-on-primary font-headline font-bold tracking-widest text-xl hover:bg-primary-container transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(143,245,255,0.3)] italic uppercase"
            >
              INITIALIZE_SYNC [ BOLT ]
            </button>
            <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
          </div>
        </div>
      )}
      {/* Expanded Preview Modal */}
      {isPreviewExpanded && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-20">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl" onClick={() => setIsPreviewExpanded(false)} />
          <div className="relative w-full h-full flex flex-col items-center justify-center">
             <button 
                onClick={() => setIsPreviewExpanded(false)}
                className="absolute top-10 right-10 text-primary hover:text-white transition-colors"
             >
                <span className="material-symbols-outlined text-4xl">close</span>
             </button>
             
             <div className="relative w-full max-w-3xl aspect-[4/5] bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                <img 
                    className="w-4/5 h-4/5 object-contain mix-blend-screen opacity-90" 
                    src={garmentImages[selectedType as keyof typeof garmentImages]} 
                    alt="Apparel Full View"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className={`relative ${selectedType === 'hoodie' ? 'w-56 h-80 mt-6' : 'w-64 h-96'} opacity-90 mix-blend-lighten border-2 border-primary/30`}>
                        <img 
                            className="w-full h-full object-cover" 
                            src={artStyles.find(s => s.id === selectedStyle)?.imageUrl} 
                            alt="DNA Art overlay" 
                        />
                        {qrCodeDataUrl && (
                            <div className="absolute bottom-6 right-6 w-16 h-16 bg-white p-1 border border-black/50 shadow-2xl mix-blend-screen opacity-90">
                                <img src={qrCodeDataUrl} className="w-full h-full invert" alt="QR Link" />
                            </div>
                        )}
                    </div>
                </div>
             </div>
             
             <div className="mt-8 text-center space-y-2">
                <div className="font-headline font-black text-2xl italic text-primary tracking-widest uppercase">
                  <span>{selectedType}</span>
                  <span>{" // "}</span>
                  <span>{selectedStyle}</span>
                </div>
                <div className="font-label text-xs text-zinc-500 uppercase tracking-[0.4em]">Design_Hash: {dnaData ? dnaData.metadata.node : "0x8FF5...FF2F"}</div>
             </div>
          </div>
        </div>
      )}
    </main>
  );
}
