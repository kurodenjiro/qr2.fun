import { getDashboard } from '@/app/actions';
import { notFound } from 'next/navigation';
import DashboardCanvas from '@/components/DashboardCanvas';

export const dynamic = 'force-dynamic';

export default async function DashboardPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const dashboard = await getDashboard(resolvedParams.id);

  if (!dashboard) {
    notFound();
  }

  return (
    <div className="h-full flex flex-col gap-6">
      <header className="flex justify-between items-end border-b pb-4 border-outline-variant">
        <div>
          <div className="font-label text-[10px] tracking-[0.2em] text-primary uppercase mb-1">
            SYS_ID: {dashboard.id.slice(0,8)} | STATUS: ONLINE
          </div>
          <h1 className="text-3xl font-bold font-headline tracking-tighter uppercase text-zinc-100">
            {dashboard.name}
          </h1>
        </div>
        <div className="text-right">
          {dashboard.isShared && (
            <span className="bg-secondary/20 text-secondary border border-secondary/50 px-2 py-1 font-label text-[10px] uppercase tracking-widest inline-flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
              PUBLIC_LINK_ACTIVE
            </span>
          )}
        </div>
      </header>

      <DashboardCanvas dashboard={dashboard} />
    </div>
  );
}
