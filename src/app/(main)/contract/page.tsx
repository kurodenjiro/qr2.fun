export default function ContractPage() {
  const sections = [
    {
      id: "0x01",
      title: "STRUCTURAL_INTEGRITY",
      content: "All physical interfaces are synthesized using high-tensile technical cotton. Structural integrity is guaranteed against digital corruption and moderate environmental stressors."
    },
    {
      id: "0x02",
      title: "NEURAL_LINK_PRIVACY",
      content: "Metadata collected during synchronization is encrypted via quantum-256 protocols. Your digital footprint remains decoupled from your biological identity."
    },
    {
      id: "0x03",
      title: "EXCHANGE_SYNTAX",
      content: "Returns must be initialized within 14 solar cycles. Gear must remain in 'STATED' condition with all tactical tags attached."
    },
    {
      id: "0x04",
      title: "VOID_ADJUDICATION",
      content: "Disputes are resolved through distributed arbitration. By entering the void, you waive standard centralized jurisdiction in favor of decentralized logic."
    }
  ];

  return (
    <main className="pt-32 pb-20 px-12 max-w-4xl mx-auto space-y-16">
      <header className="space-y-4 border-l-4 border-primary pl-8 py-4 bg-surface-container-low/30">
        <div className="font-label text-primary text-[10px] tracking-[0.4em] uppercase">SYSTEM_PROTOCOL // CONTRACT_402</div>
        <h1 className="text-5xl font-black font-headline tracking-tighter uppercase italic text-zinc-100">
          THE_CONTRACT
        </h1>
        <p className="font-label text-zinc-500 text-[10px] tracking-widest uppercase italic">
          DECENTRALIZED_AGREEMENT_V_4.2.0_SIGNED_OFF
        </p>
      </header>

      <section className="space-y-12">
        <div className="p-8 border-2 border-zinc-800 bg-black/50 font-label text-xs text-zinc-400 leading-relaxed uppercase tracking-widest relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-primary/20 pointer-events-none group-hover:border-primary/40 transition-colors"></div>
          BY_INTERACTING_WITH_ETHREAL_ENTITY, YOU_ACKNOWLEDGE_AND_ACCEPT_THE_FOLLOWING_PROTOCOLS. FAILURE_TO_ADHERE_MAY_RESULT_IN_SESSION_TERMINATION. DATA_CONSISTENCY_NOT_GUARANTEED_IN_UNSTABLE_NODES.
        </div>

        <div className="grid grid-cols-1 gap-8">
          {sections.map((section, i) => (
            <div key={i} className="group relative">
              <div className="absolute -left-12 top-0 font-label text-[10px] text-zinc-700 font-bold group-hover:text-secondary transition-colors italic uppercase">{section.id}</div>
              <div className="p-6 bg-surface-container-low border border-zinc-800 hover:border-secondary transition-all">
                <h2 className="text-lg font-headline font-black text-zinc-100 tracking-widest italic uppercase mb-3">{section.title}</h2>
                <p className="text-sm text-zinc-500 leading-relaxed font-body">
                  {section.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="pt-12 border-t border-zinc-800 flex flex-col items-center gap-6">
        <div className="font-label text-[8px] text-zinc-700 uppercase tracking-[0.5em] animate-pulse">
          &lt;&lt; _AWAITING_DIGITAL_SIGNATURE_ &gt;&gt;
        </div>
        <div className="bg-primary text-on-primary px-10 py-3 font-headline font-black text-xs uppercase italic tracking-widest hover:bg-primary-container transition-all cursor-crosshair">
          SIGNED_IN_VOID
        </div>
      </footer>
    </main>
  );
}
