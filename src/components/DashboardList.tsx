"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createDashboard } from "@/app/actions";

export default function DashboardList({ initialDashboards }: { initialDashboards: any[] }) {
  const [isCreating, setIsCreating] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  async function handleCreate() {
    setIsCreating(true);
    try {
      const id = await createDashboard("New Dashboard");
      router.push(`/dashboard/${id}`);
    } catch (e) {
      console.error(e);
      setIsCreating(false);
    }
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Create New Card */}
      <button
        onClick={handleCreate}
        disabled={isCreating}
        className="border-2 border-dashed border-outline-variant hover:border-primary bg-surface-container-lowest hover:bg-primary/5 p-6 text-left group transition-all flex flex-col items-center justify-center min-h-[200px]"
      >
        <span className="material-symbols-outlined text-4xl text-zinc-500 group-hover:text-primary mb-4 transition-colors">
          add_box
        </span>
        <div className="font-headline font-bold text-lg text-zinc-500 group-hover:text-primary transition-colors uppercase tracking-widest">
          {isCreating ? "INITIALIZING..." : "INIT_NEW_DASH"}
        </div>
      </button>

      {/* Existing Dashboards */}
      {initialDashboards.map((dash) => (
        <Link
          key={dash.id}
          href={`/dashboard/${dash.id}`}
          className="border-2 border-surface-container-high bg-surface-container-low p-6 text-left hover:border-secondary transition-all flex flex-col justify-between min-h-[200px] relative overflow-hidden group"
        >
          {/* Accent corner */}
          <div className="absolute top-0 right-0 w-8 h-8 flex items-start justify-end p-2 pointer-events-none text-zinc-700 group-hover:text-secondary">
             <span className="material-symbols-outlined text-sm">open_in_new</span>
          </div>
          <div>
            <div className="font-label text-[10px] tracking-[0.2em] text-primary uppercase mb-2">SYS_ID: {dash.id.slice(0,8)}</div>
            <h2 className="font-headline font-bold text-2xl text-zinc-200 group-hover:text-secondary">{dash.name}</h2>
          </div>
          <div className="font-label text-[10px] text-zinc-500 uppercase flex justify-between items-center mt-4">
             <span>{dash.isShared ? 'Network: SHARED' : 'Network: LOCAL_ONLY'}</span>
             <span>Last Sync: {mounted ? new Date(dash.createdAt).toLocaleDateString() : 'SYNCING...'}</span>
          </div>
        </Link>
      ))}
    </section>
  );
}
