import { getDashboards } from '../actions';
import DashboardList from '@/components/DashboardList';

export const dynamic = 'force-dynamic';

export default async function DashboardsPage() {
  const dashboards = await getDashboards();

  return (
    <div className="space-y-10">
      <header className="border-l-4 border-secondary pl-6 py-2 bg-surface-container-low/50">
        <h1 className="text-4xl font-bold font-headline tracking-tighter uppercase mb-2 text-zinc-100">
          Command_Center
        </h1>
        <p className="font-label text-zinc-500 tracking-widest text-xs uppercase">
          Select or initialize a new telemetry dashboard.
        </p>
      </header>

      <DashboardList initialDashboards={dashboards} />
    </div>
  );
}
