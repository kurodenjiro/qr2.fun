"use client";

import React from "react";

// Mock Data for Phase 1
const formatNumber = (num: number) => new Intl.NumberFormat('en-US').format(num);

export const WIDGET_TYPES = [
  { id: "total_revenue", name: "Total Revenue", icon: "attach_money" },
  { id: "new_customers", name: "New Customers", icon: "group_add" },
  { id: "active_users", name: "Active Users", icon: "monitoring" },
  { id: "conversion_rate", name: "Conversion Rate", icon: "trending_up" },
  { id: "top_products", name: "Top 5 Products", icon: "local_mall" }
];

export default function WidgetFactory({ type }: { type: string }) {
  switch (type) {
    case 'total_revenue':
      return (
        <div className="h-full flex flex-col justify-center">
          <div className="font-label text-xs tracking-widest uppercase text-zinc-500 mb-1">Total Revenue (30d)</div>
          <div className="font-headline text-4xl font-bold text-primary">$<span className="text-zinc-100">{formatNumber(124500)}</span></div>
          <div className="mt-4 flex items-center gap-1 text-secondary text-xs font-label">
            <span className="material-symbols-outlined text-sm">arrow_upward</span> 12.5% vs last period
          </div>
        </div>
      );
    case 'new_customers':
      return (
        <div className="h-full flex flex-col justify-center">
          <div className="font-label text-xs tracking-widest uppercase text-zinc-500 mb-1">New Customers</div>
          <div className="font-headline text-4xl font-bold text-zinc-100">{formatNumber(348)}</div>
          <div className="mt-4 flex items-center gap-1 text-error text-xs font-label">
            <span className="material-symbols-outlined text-sm">arrow_downward</span> 2.1% vs last period
          </div>
        </div>
      );
    case 'active_users':
      return (
        <div className="h-full flex flex-col justify-center">
          <div className="font-label text-xs tracking-widest uppercase text-zinc-500 mb-1">Active Users</div>
          <div className="font-headline text-4xl font-bold text-secondary">{formatNumber(8902)} <span className="text-lg text-zinc-500 animate-pulse font-normal">LIVE</span></div>
        </div>
      );
    case 'conversion_rate':
      return (
        <div className="h-full flex flex-col justify-center">
          <div className="font-label text-xs tracking-widest uppercase text-zinc-500 mb-1">Conversion Rate</div>
          <div className="font-headline text-4xl font-bold text-zinc-100">4.8<span className="text-primary">%</span></div>
        </div>
      );
    case 'top_products':
      return (
        <div className="h-full flex flex-col justify-start overflow-hidden">
          <div className="font-label text-xs tracking-widest uppercase text-zinc-500 mb-4">Top 5 Products</div>
          <ul className="space-y-3 font-label text-sm text-zinc-300">
            <li className="flex justify-between items-center"><span className="text-primary truncate pr-2">Alpha Framework</span> <span>2.1k</span></li>
            <li className="flex justify-between items-center"><span className="truncate pr-2">Beta Engine</span> <span>1.8k</span></li>
            <li className="flex justify-between items-center"><span className="truncate pr-2">Gamma Router</span> <span>943</span></li>
            <li className="flex justify-between items-center"><span className="truncate pr-2">Delta Cache</span> <span>812</span></li>
            <li className="flex justify-between items-center"><span className="truncate pr-2">Epsilon DB</span> <span>604</span></li>
          </ul>
        </div>
      );
    default:
      return <div className="text-red-500">Unknown Widget Type</div>;
  }
}
