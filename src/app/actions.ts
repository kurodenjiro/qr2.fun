'use server';

import { db } from '@/db';
import { dashboards, widgets } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { randomUUID } from 'crypto';
import { ensureAppTables } from '@/db/bootstrap';

export async function createDashboard(name: string) {
  const id = randomUUID();
  await db.insert(dashboards).values({
    id,
    name,
    ownerId: 'user_1', // mocked for now
  });
  revalidatePath('/dashboard');
  return id;
}

export async function getDashboards() {
  await ensureAppTables();
  return await db.select().from(dashboards).where(eq(dashboards.ownerId, 'user_1'));
}

export async function getDashboard(id: string) {
  await ensureAppTables();
  const [dashboard] = await db.select().from(dashboards).where(eq(dashboards.id, id)).limit(1);
  if (!dashboard) return null;
  const dashboardWidgets = await db.select().from(widgets).where(eq(widgets.dashboardId, id));
  return { ...dashboard, widgets: dashboardWidgets };
}

export async function updateDashboardName(id: string, name: string) {
  await db.update(dashboards).set({ name }).where(eq(dashboards.id, id));
  revalidatePath('/dashboard');
}

export async function saveWidgetLayout(dashboardId: string, widgetData: { id: string, type: string, layoutConfig: string }[]) {
  // Simple replace: delete all and re-insert
  await db.delete(widgets).where(eq(widgets.dashboardId, dashboardId));
  if (widgetData.length > 0) {
    const values = widgetData.map(w => ({
      id: w.id,
      dashboardId,
      type: w.type,
      layoutConfig: w.layoutConfig
    }));
    await db.insert(widgets).values(values);
  }
  revalidatePath(`/dashboard/${dashboardId}`);
}
