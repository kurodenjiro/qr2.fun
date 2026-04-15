"use client";

import Link from "next/link";
import AccountButton from "./auth/AccountButton";

export default function MainHeader() {
  return (
    <>
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-12 py-6 bg-[#0e0e0e]/80 backdrop-blur-xl border-b-0">
        <div className="flex items-center gap-12">
          <Link href="/" className="text-2xl font-bold tracking-tighter text-primary italic font-headline">
            ETHREAL
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
        <div className="flex items-center gap-6">
          <Link href="/cart" className="text-primary hover:text-secondary transition-colors">
            <span className="material-symbols-outlined">shopping_cart</span>
          </Link>
          <AccountButton />
        </div>
      </nav>
      {/* Separation Logic Divider */}
      <div className="fixed top-[88px] left-0 bg-[#131313] h-[2px] w-full z-40"></div>
    </>
  );
}
