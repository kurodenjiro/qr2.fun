"use client";

import Link from "next/link";
import { useState } from "react";

export default function ForgePage() {
  const [selectedType, setSelectedType] = useState('t-shirt');
  const [selectedStyle, setSelectedStyle] = useState('cyber_kinetic');

  const artStyles = [
    {
      id: 'cyber_kinetic',
      name: 'CYBER_KINETIC',
      desc: 'High-frequency energy pulse',
      color: 'text-secondary',
      borderColor: 'border-secondary',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBExFWKA3gkA4wjqCIEn2mg6gI9kYGPH3UqqGiUXktsOOnDB8SpmrJwVn6fM9PaeXNGc9X7z5_urzPv3-Z7LrNfM5C45_P5CzF8fVc0GqGLRX4Vw1Dr5QgsvkSIDTpJMVk49fCoHWxz_GIH4iW9saeBxyh7xGtoMfF0GzpkWOWPASoCRzZ-mO6hexzReA3rjubEy9WrUvD3ViYuZBzvPkjljM6IpefI_AyW91gWbduAmenIbNaDBDwgXFNywmXEkGMIzyKPXV44wsM'
    },
    {
      id: 'mono_stasis',
      name: 'MONO_STASIS',
      desc: 'Low-profile digital silence',
      color: 'text-zinc-400',
      borderColor: 'border-zinc-700',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqKweJm3_VBH-SlmHxvUeRruMQf7qtvAeW7jvx44NcY2FMEYWijkE0LvKoS0gH78iA070A7vfDyvcgkViHrwh30jb96OEzKlGl6w_txRj1hSoswF3MAXI-l4BsXGmylN4msW7ahaaV1OQ3hroAVz7DGfCEMWc1CAdDuv_DnDm8ww_gpYIRxVKhTT7JGPRVF9yi3TObfkYB-5GpdMb36MqWxCjMUQ9XKHdNktxz62v2hD2cdDMFsix8bTcWTKTtpCeNxykZc0ink5w'
    },
    {
      id: 'error_override',
      name: 'ERROR_OVERRIDE',
      desc: 'Unstable signal corruption',
      color: 'text-zinc-400',
      borderColor: 'border-zinc-700',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0lHX8DTLsdVAdsdci39VT1nZPpmDws30L_tBh962zL445upQvkz6A36087-1OSlliJuCJkBzRd6ospTzf0kc9w5xiR_6LBaSsmIFzlaKxO_w6BbMxV4-oMr-ZcyRFHxWpavhE8RmGoA2EV8JI7pLf-oiDOh5ha9dKBxsEvE6Z8ia8kMh8-AI5E6J-B-sH69GJA0JleayGxq7dp160LXkIH1dT0ftbC96Rl78XsWfKj7HkrulQvwJmFwBrm8rRXdObpteMTIos1fo'
    }
  ];

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
            <h1 className="text-5xl font-bold font-headline tracking-tighter italic mb-2 text-zinc-100">FORGE_ENTITY</h1>
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
                className="w-full bg-surface-container-low border-b-2 border-zinc-800 py-4 pl-10 pr-4 text-primary font-headline focus:ring-0 focus:border-primary transition-all underline-none outline-none" 
                placeholder="IDENTITY_KEY" 
                type="text"
              />
            </div>
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
            <label className="font-label text-[10px] tracking-[0.2em] text-primary uppercase font-bold">Art DNA Style</label>
            <div className="grid grid-cols-1 gap-3">
              {artStyles.map((style) => (
                <div 
                  key={style.id}
                  onClick={() => setSelectedStyle(style.id)}
                  className={`bg-surface-container-low p-4 flex items-center gap-4 border-l-4 transition-all cursor-pointer ${selectedStyle === style.id ? 'border-secondary bg-surface-container-high' : 'border-zinc-800 hover:bg-surface-container hover:border-zinc-600'}`}
                >
                  <div className="w-16 h-16 bg-zinc-800 flex-shrink-0 relative overflow-hidden">
                    <img className="w-full h-full object-cover grayscale opacity-60 hover:grayscale-0 transition-all duration-300" src={style.image} alt={style.name} />
                  </div>
                  <div className="flex-1">
                    <div className={`font-headline font-bold italic ${selectedStyle === style.id ? 'text-secondary' : 'text-zinc-400'}`}>{style.name}</div>
                    <div className="font-label text-[10px] text-zinc-600 uppercase">{style.desc}</div>
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
                className="w-full h-full object-contain mix-blend-screen opacity-90" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_u5-7f9NHeiZtTrI_-HOthZtZcBmwq4Qa9YW1-gV5IQhTakVZ9AqsvRSyLTzz98ZQuVlT4FCgmmifmEa7EI6W_IbDSINvzq-fhAlyJy48x1d6IwJkSXJfFtJDZEObPjJprNv6gP8q-hkt6V1BGr-Xt_wr9xb5RYdkCQOZw6LQuSuwJAuWMcK1CPdqhBYwXMmD4RWGa-R44gRSHqHo4epDN-Fkq6Jh8pHlGpkQC_3T2Pl2Td7utSwWd0m1iZSdJGL_b29DkUHjaEw" 
                alt="Apparel Mockup"
              />
              {/* DNA Art Overlay (Simulated) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-48 h-64 opacity-80 mix-blend-lighten shadow-[0_0_30px_rgba(143,245,255,0.2)] border border-primary/20">
                  <img 
                    className="w-full h-full object-cover" 
                    src={artStyles.find(s => s.id === selectedStyle)?.image} 
                    alt="DNA Art overlay" 
                  />
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
              <div className="font-headline font-bold text-secondary tracking-widest text-sm italic">0x8FF5...FF2F</div>
            </div>

            {/* Fullscreen/Focus CTA */}
            <div className="absolute inset-0 bg-primary/5 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center cursor-zoom-in backdrop-blur-[2px] group">
              <div className="border-2 border-primary bg-black/80 px-6 py-3 font-headline font-bold text-primary tracking-widest uppercase italic shadow-[0_0_15px_rgba(143,245,255,0.3)]">EXPAND_PREVIEW</div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="mt-4 grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 bg-zinc-900 border border-zinc-800 text-zinc-400 py-5 font-headline font-bold tracking-widest hover:bg-zinc-800 transition-all uppercase italic">
              <span className="material-symbols-outlined">save</span> SAVE_DRAFT
            </button>
            <Link 
              href="/forge/chat"
              className="flex items-center justify-center gap-3 bg-primary text-on-primary py-5 font-headline font-bold tracking-widest hover:bg-primary-container transition-all uppercase shadow-[0_0_25px_rgba(143,245,255,0.4)] italic"
            >
              CONFIRM_GENERATION <span className="material-symbols-outlined font-bold">bolt</span>
            </Link>
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
    </main>
  );
}
