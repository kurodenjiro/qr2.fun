import Link from 'next/link';
import AiAssistantChat from '@/components/AiAssistantChat';
import AccountButton from '@/components/auth/AccountButton';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav className="fixed top-0 w-full z-50 border-b-2 border-zinc-800/50 bg-zinc-950/80 backdrop-blur-xl flex justify-between items-center px-6 h-16 shadow-[0_0_20px_rgba(143,245,255,0.1)]">
        <Link href="/dashboard" className="text-2xl font-bold tracking-[-0.05em] text-primary italic font-headline flex items-center gap-2">
          <span>ETHREAL</span>
          <span className="text-secondary text-sm bg-surface-container-high px-2 py-0.5 border border-secondary/30 hidden md:inline-block">DASHBOARDS</span>
        </Link>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-primary/10 transition-all duration-300 text-primary active:skew-x-2 flex items-center gap-2 text-sm font-label uppercase tracking-widest">
            <span className="material-symbols-outlined text-lg">terminal</span> System
          </button>
          <AccountButton />
        </div>
      </nav>
      <main className="pt-24 min-h-screen p-8 bg-background relative overflow-hidden max-w-7xl mx-auto">
        {/* Background Data Noise Decor */}
        <div className="fixed top-1/3 right-10 opacity-10 font-label text-[10px] text-primary rotate-90 tracking-[1em] pointer-events-none uppercase">
          sys_load_78% // ethreal_sync_enabled
        </div>
        {children}
      </main>
      <AiAssistantChat />
    </>
  );
}
