"use client";

import Link from "next/link";
import AccountButton from "./auth/AccountButton";

export default function MainHeader() {
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 w-full max-w-full overflow-hidden box-border z-50 flex justify-between items-center h-12 sm:h-[72px] lg:h-[88px] px-3 sm:px-6 lg:px-12 bg-[#0e0e0e]/80 backdrop-blur-xl border-b-0">
        <div className="flex items-center gap-3 sm:gap-8 lg:gap-12 min-w-0">
          <Link href="/" className="text-sm sm:text-xl lg:text-2xl font-bold tracking-tighter text-primary italic font-headline whitespace-nowrap">
            <span className="sm:hidden">ETH</span>
            <span className="hidden sm:inline">ETHREAL</span>
          </Link>
          <div className="hidden md:flex gap-8">
            <Link 
              className="font-headline uppercase tracking-[0.1em] text-sm text-secondary border-b-2 border-secondary pb-1 transition-all duration-300 skew-x-[-12deg]" 
              href="/collections"
            >
              CATALOGUE
            </Link>
            <Link 
              className="font-headline uppercase tracking-[0.1em] text-sm text-primary opacity-70 hover:opacity-100 hover:text-secondary transition-all duration-300" 
              href="/playground"
            >
              PLAYGROUND
            </Link>
            <Link 
              className="font-headline uppercase tracking-[0.1em] text-sm text-primary opacity-70 hover:opacity-100 hover:text-secondary transition-all duration-300" 
              href="/collections"
            >
              COLLECTIONS
            </Link>
            <Link 
              className="font-headline uppercase tracking-[0.1em] text-sm text-primary opacity-70 hover:opacity-100 hover:text-secondary transition-all duration-300" 
              href="/about"
            >
              ABOUT
            </Link>
            <Link 
              className="font-headline uppercase tracking-[0.1em] text-sm text-primary opacity-70 hover:opacity-100 hover:text-secondary transition-all duration-300" 
              href="/contract"
            >
              CONTRACT
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-4 lg:gap-6 shrink-0">
          <Link href="/cart" className="text-primary hover:text-secondary transition-colors p-1">
            <span className="material-symbols-outlined text-[20px] sm:text-2xl">shopping_cart</span>
          </Link>
          <AccountButton />
        </div>
      </nav>
      {/* Separation Logic Divider */}
      <div className="fixed top-12 sm:top-[72px] lg:top-[88px] left-0 bg-[#131313] h-[2px] w-full z-40"></div>
    </>
  );
}
