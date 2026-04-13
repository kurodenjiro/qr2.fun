"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import AccountButton from "./auth/AccountButton";

export default function ForgeHeader() {
  const pathname = usePathname();

  const links = [
    { name: "DASHBOARD", href: "/dashboard" },
    { name: "FORGE", href: "/forge" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 border-b-2 border-zinc-800/50 bg-zinc-950/80 backdrop-blur-xl flex justify-between items-center px-6 h-16 shadow-[0_0_20px_rgba(143,245,255,0.1)]">
      <div className="text-2xl font-bold tracking-[-0.05em] text-primary italic font-headline">
        ETHREAL
      </div>
      
      <div className="hidden md:flex items-center gap-10 font-headline tracking-tighter uppercase text-sm">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`transition-colors duration-300 ${
                isActive 
                  ? "text-primary border-b-2 border-primary pb-1" 
                  : "text-zinc-500 hover:text-zinc-200"
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-primary/10 transition-all duration-300 text-primary active:skew-x-2">
          <span className="material-symbols-outlined">terminal</span>
        </button>
        <AccountButton />
      </div>
    </nav>
  );
}
