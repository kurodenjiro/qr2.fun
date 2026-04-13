"use client";

import React, { useState, useEffect } from "react";
import GridLayout from "react-grid-layout";
import type { Layout } from "react-grid-layout";

const RGLComponent = GridLayout as any;
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import WidgetFactory, { WIDGET_TYPES } from "./widgets/WidgetFactory";
import { saveWidgetLayout } from "@/app/actions";
import { v4 as uuidv4 } from "uuid";

interface WidgetInstance {
  id: string;
  type: string;
  layoutConfig: string; // JSON
}

export default function DashboardCanvas({ dashboard }: { dashboard: any }) {
  const [widgets, setWidgets] = useState<WidgetInstance[]>([]);
  const [layout, setLayout] = useState<Layout[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (dashboard.widgets) {
      setWidgets(dashboard.widgets);
      const parsedLayout = dashboard.widgets.map((w: any) => JSON.parse(w.layoutConfig));
      setLayout(parsedLayout);
    }
  }, [dashboard]);

  const onLayoutChange = (newLayout: Layout[]) => {
    setLayout(newLayout);
    // synchronize widgets array based on newLayout
    const updated = widgets.map(w => {
      const lay = newLayout.find((l: any) => l.i === w.id);
      return lay ? { ...w, layoutConfig: JSON.stringify(lay) } : w;
    });
    setWidgets(updated);
  };

  const addWidget = (type: string) => {
    const id = uuidv4();
    const newW = {
      id,
      type,
      layoutConfig: JSON.stringify({ i: id, x: (widgets.length * 2) % 12, y: Infinity, w: 4, h: 2, minW: 2, minH: 2 })
    };
    setWidgets([...widgets, newW]);
    setLayout([...layout, JSON.parse(newW.layoutConfig)]);
  };

  const removeWidget = (id: string) => {
    setWidgets(widgets.filter(w => w.id !== id));
    setLayout(layout.filter((l: any) => l.i !== id));
  };

  const saveConfiguration = async () => {
    setIsSaving(true);
    try {
      await saveWidgetLayout(dashboard.id, widgets);
      setIsEditMode(false);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col gap-4">
      <div className="flex justify-between items-center bg-surface-container-low p-2 border border-outline-variant/30">
        <div className="flex gap-2">
          {isEditMode ? (
            WIDGET_TYPES.map(wt => (
              <button 
                key={wt.id} 
                onClick={() => addWidget(wt.id)}
                className="px-3 py-1.5 text-xs font-label uppercase tracking-widest border border-outline-variant hover:border-primary hover:text-primary transition-colors flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[16px]">{wt.icon}</span>
                {wt.name}
              </button>
            ))
          ) : (
            <div className="text-xs font-label text-zinc-500 flex items-center gap-2 px-2 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
              Read-Only
            </div>
          )}
        </div>
        
        <div>
           {isEditMode ? (
             <button onClick={saveConfiguration} disabled={isSaving} className="bg-primary text-on-primary px-4 py-2 text-xs font-bold font-headline uppercase tracking-widest shadow-[0_0_15px_rgba(143,245,255,0.3)] hover:bg-primary-container transition-all">
                {isSaving ? 'SAVING...' : 'SAVE_LAY0UT'}
             </button>
           ) : (
             <button onClick={() => setIsEditMode(true)} className="border border-secondary text-secondary px-4 py-2 text-xs font-bold font-headline uppercase tracking-widest hover:bg-secondary hover:text-surface transition-all">
                EDIT_LAY0UT
             </button>
           )}
        </div>
      </div>

      <div className="flex-1 bg-surface-container-lowest border border-outline-variant/20 relative min-h-[500px]">
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#8ff5ff 1px, transparent 1px), linear-gradient(90deg, #8ff5ff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        {/* @ts-ignore */}
        <RGLComponent
          className="layout z-10"
          layout={layout as any}
          cols={12}
          width={1200}
          rowHeight={80}
          onLayoutChange={onLayoutChange as any}
          isDraggable={isEditMode}
          isResizable={isEditMode}
          margin={[16, 16]}
        >
          {widgets.map(w => (
            <div key={w.id} className="bg-surface-container border border-outline-variant hover:border-zinc-500 transition-colors p-4 relative group">
              {isEditMode && (
                <button 
                  onClick={() => removeWidget(w.id)}
                  className="absolute top-2 right-2 text-zinc-600 hover:text-error transition-colors hidden group-hover:block z-20"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              )}
              {/* Corner decor */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary/40 pointer-events-none"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary/40 pointer-events-none"></div>
              
              <WidgetFactory type={w.type} />
            </div>
          ))}
        </RGLComponent>
      </div>
    </div>
  );
}
