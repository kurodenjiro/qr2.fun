import Link from "next/link";

export default function MainFooter() {
  return (
    <footer className="bg-[#000000] border-t border-[#484847]/15 py-12 px-12 w-full flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="flex flex-col items-center md:items-start gap-2">
        <span className="text-lg font-black text-primary font-headline">ETHREAL</span>
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#484847]">©2024 ETHREAL_OS. ALL RIGHTS RESERVED.</span>
      </div>
      <div className="flex gap-12">
        <Link className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#484847] hover:text-primary transition-colors" href="/about">ABOUT_US</Link>
        <Link className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#484847] hover:text-primary transition-colors" href="/contract">THE_CONTRACT</Link>
        <a className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#484847] hover:text-primary transition-colors" href="#">PRIVACY_PROTOCOL</a>
        <a className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#484847] hover:text-primary transition-colors" href="#">TERMINAL_TERMS</a>
        <a className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#484847] hover:text-primary transition-colors" href="#">CONNECT</a>
      </div>
      <div className="flex gap-6">
        <span className="font-label text-[10px] tracking-[0.1em] opacity-40 uppercase">UPTIME: 99.98%</span>
        <span className="font-label text-[10px] tracking-[0.1em] opacity-40 uppercase">LOC: 34.0522° N, 118.2437° W</span>
      </div>
    </footer>
  );
}
