import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="pt-32 pb-20 px-12 max-w-5xl mx-auto space-y-24">
      {/* Hero Section */}
      <section className="space-y-8">
        <div className="font-label text-primary text-[10px] tracking-[0.3em] uppercase mb-4">ENTITY_ORIGIN // LOG_001</div>
        <h1 className="text-6xl md:text-8xl font-black font-headline tracking-tighter uppercase italic text-zinc-100">
          WE ARE <br /> <span className="text-secondary">ETHREAL</span>
        </h1>
        <p className="text-xl md:text-2xl text-zinc-400 font-light leading-relaxed max-w-2xl">
          Born in the intersection of digital decay and physical defiance. We engineer interfaces for the modern nomad.
        </p>
      </section>

      {/* Manifesto Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-headline font-black uppercase tracking-tighter italic text-zinc-100">THE_PHILOSOPHY</h2>
          <div className="space-y-4 text-zinc-500 font-body text-sm leading-relaxed">
            <p>
              The digital world has become sanitized. Rounded corners, predictable animations, and a desperate pursuit of "user-friendliness" have stripped away the raw energy of the early internet.
            </p>
            <p>
              Ethreal exists to reclaim that energy. We embrace the glitch, the sharp edge, and the absolute contrast of the obsidian void. Our apparel is more than just clothing; it's a physical proxy for your digital identity.
            </p>
          </div>
        </div>
        <div className="relative aspect-square bg-surface-container-high border border-zinc-800 overflow-hidden group">
          <img 
            className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJzaL6my20-GR00tGAwwXKJP8Sa8kUBWob7rOFjgbclbOIwoj6N1tGB0ulkvr_HZQqO-2ZBQxLm0rR5HrSnaY9Sxkj8rBLl9HGhY8D6uzzNVcLVkthnKxGQVA660LA4G5W5dZFpvb_Swyi5ohNUoZE7fhp3jRXksU7_Noi_vXFM0c7T9yAol84OyTmRktl6UIVGMdTfifz1dFZGUUQbLTzvh6Q_ejg-nIsUAx2ghulvtul-Lz7XyDb9tTaI7I7WQlpyzfktb0Nf1Y" 
            alt="About Image"
          />
          <div className="absolute top-4 left-4 font-label text-[10px] text-primary bg-black/60 px-2 py-1 border border-primary/20 uppercase tracking-widest">VISUAL_UPLINK</div>
        </div>
      </section>

      {/* Team/Collective Section */}
      <section className="space-y-12">
        <h2 className="text-3xl font-headline font-black uppercase tracking-tighter italic text-zinc-100 text-center">THE_COLLECTIVE</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            { name: "VECTOR_01", role: "CREATIVE_STRATEGIST", desc: "Digital architect specializing in destabilized layouts." },
            { name: "NULL_POINTER", role: "FABRIC_ENGINEER", desc: "Expert in high-tensile technical cotton synthesis." },
            { name: "ROOT_ACCESS", role: "SYSTEM_DESIGNER", desc: "Managing the neural links between gear and user." }
          ].map((member, i) => (
            <div key={i} className="bg-surface-container-low p-8 border border-zinc-800 space-y-4 hover:border-primary/40 transition-all">
              <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">person_outline</span>
              </div>
              <div>
                <h3 className="font-headline font-bold text-lg text-zinc-100 italic">{member.name}</h3>
                <p className="font-label text-[10px] text-secondary tracking-widest uppercase">{member.role}</p>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed font-body">{member.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="pt-12 border-t border-zinc-800 text-center space-y-8">
        <h2 className="text-3xl font-headline font-black uppercase tracking-tighter italic text-zinc-100">JOIN_THE_VOID</h2>
        <Link href="/collections" className="inline-block bg-primary text-on-primary px-12 py-4 font-headline font-black text-xl uppercase italic tracking-widest hover:bg-primary-container transition-all">
          EXPLORE_ARCHIVE
        </Link>
      </section>
    </main>
  );
}
