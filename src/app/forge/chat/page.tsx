"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgeChatRefined() {
  const [messages] = useState([
    {
      role: 'agent',
      name: 'AGENT_ALPHA',
      time: '09:12:44',
      content: "Neural link established. Scanning current collection trends. How should we proceed with your custom fabric synthesis? I've prepared three high-tensile mesh prototypes for your review."
    },
    {
      role: 'user',
      name: 'USER_04',
      time: '09:14:02',
      content: "Show me the black iridiscence prototype first. Ensure the structural integrity supports movement at extreme temperatures."
    },
    {
      role: 'agent',
      name: 'AGENT_ALPHA',
      time: '09:14:15',
      content: "Visualizing prototype: [MODEL_V3_DARK_CHROME]. This fabric utilizes photon-shifting polymers. Structural integrity rated for -40°C to +85°C.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA3qOoc8ZOI0etlOW93otBl0uHy-Iw8ZYMDM4khGFcjcXAKkU7ilq1mBgfkhwxvGx_ptmRL_Ygh1L8vV0GK5qxsFQBrI8f1MsiViEj6qV3oJo0W5vgvxeJm-Xo0Bl5dpTvS8duFPSIWYBlOvFEDXqK1dGYewO-0SM7Ihq2UTTNRv2HpwHt1gxp9Iz9KESW2_T1N64RIPcFTkIUMBs1O-nm7MgAvtNydyzKid3pst09E2mR4o1KyBcHwlO0xZsGu00zL1CLvE2oXM_o"
    }
  ]);

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar - Local to Chat */}
      <aside className="hidden md:flex flex-col pt-20 h-full w-64 border-r-2 border-zinc-800/50 bg-zinc-950/50 font-headline uppercase text-[10px] tracking-widest z-10">
        <div className="px-6 mb-8 flex flex-col gap-1">
          <span className="text-primary font-black text-lg italic tracking-tighter">NEURAL_OS</span>
          <span className="text-zinc-600 text-[8px]">V2.04_STABLE</span>
        </div>
        <div className="flex flex-col gap-1 flex-1">
           <Link href="/forge/chat" className="flex items-center gap-4 px-6 py-3 text-secondary bg-surface-container-high border-l-4 border-secondary font-bold transition-all">
            <span className="material-symbols-outlined text-sm">terminal</span>
            <span>Neural_Chat</span>
          </Link>
          <button className="flex items-center gap-4 px-6 py-3 text-zinc-600 hover:text-primary hover:bg-zinc-900 transition-all text-left">
            <span className="material-symbols-outlined text-sm">straighten</span>
            <span>Fit_Analysis</span>
          </button>
          <button className="flex items-center gap-4 px-6 py-3 text-zinc-600 hover:text-primary hover:bg-zinc-900 transition-all text-left">
            <span className="material-symbols-outlined text-sm">local_shipping</span>
            <span>Order_Sync</span>
          </button>
          <button className="flex items-center gap-4 px-6 py-3 text-zinc-600 hover:text-primary hover:bg-zinc-900 transition-all text-left">
            <span className="material-symbols-outlined text-sm">memory</span>
            <span>System_Logs</span>
          </button>
        </div>
        <div className="mt-auto px-4 pb-8 space-y-4">
          <Link href="/forge" className="block w-full py-4 bg-primary text-on-primary font-bold tracking-widest text-[10px] text-center hover:bg-primary-container transition-all">
            NEW_SESSION
          </Link>
          <button className="flex items-center gap-4 px-2 py-2 text-zinc-600 hover:text-primary transition-all w-full text-left">
            <span className="material-symbols-outlined text-sm">settings</span>
            <span>Settings</span>
          </button>
        </div>
      </aside>

      {/* Main Chat Canvas */}
      <main className="flex-1 flex overflow-hidden pt-16">
        <section className="flex-1 flex flex-col border-r-2 border-zinc-800/50 relative">
          {/* Chat Header */}
          <div className="h-14 flex items-center justify-between px-8 bg-surface-container-low border-b border-zinc-800/30">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-secondary animate-pulse"></div>
              <span className="font-label text-xs uppercase tracking-[0.2em] text-zinc-500">Session: #XF-902-ALPHA</span>
            </div>
            <span className="font-label text-[10px] text-primary/50 uppercase tracking-widest hidden sm:block">Sync_Status: Optimized</span>
          </div>

          {/* Chat History */}
          <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-6 max-w-4xl ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
                <div className={`flex-shrink-0 w-10 h-10 bg-surface-container-highest flex items-center justify-center border ${msg.role === 'agent' ? 'border-primary/20 text-primary' : 'border-secondary/20 text-secondary'}`}>
                  <span className="material-symbols-outlined">{msg.role === 'agent' ? 'smart_toy' : 'person'}</span>
                </div>
                <div className={`flex flex-col gap-2 ${msg.role === 'user' ? 'items-end' : ''}`}>
                  <div className="flex items-center gap-3">
                    {msg.role === 'agent' && <span className="font-label text-[10px] font-bold text-primary tracking-widest uppercase">{msg.name}</span>}
                    <span className="font-label text-[9px] text-zinc-600">{msg.time}</span>
                    {msg.role === 'user' && <span className="font-label text-[10px] font-bold text-secondary tracking-widest uppercase">{msg.name}</span>}
                  </div>
                  <div className={`p-5 border-y border-zinc-800 ${msg.role === 'agent' ? 'bg-surface-container-high border-l-2 border-l-primary' : 'bg-surface-container-low border-r-2 border-r-secondary text-right'}`}>
                    <p className="text-sm leading-relaxed text-zinc-200">{msg.content}</p>
                    {msg.image && (
                      <div className="mt-4 relative w-full aspect-video bg-black overflow-hidden border border-zinc-800">
                        <img className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" src={msg.image} alt="Fabric info" />
                        <div className="absolute top-2 right-2 px-2 py-1 text-[8px] font-label text-primary border border-primary/40 uppercase bg-black/60 backdrop-blur-md">ANALYSIS_READY</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-8 bg-surface-container-low border-t border-zinc-800/30">
            <div className="relative max-w-4xl mx-auto group">
              <div className="absolute -top-3 left-4 bg-background px-2 z-10">
                <span className="font-label text-[10px] text-primary uppercase tracking-widest font-bold">command_input</span>
              </div>
              <div className="flex items-end gap-4 bg-surface-container-highest p-4 border border-zinc-800 group-focus-within:border-primary/50 transition-colors">
                <textarea 
                  className="flex-1 bg-transparent border-none focus:ring-0 text-zinc-100 placeholder:text-zinc-700 resize-none font-body text-sm outline-none" 
                  placeholder="EXECUTE COMMAND OR ASK AGENT_ALPHA..." 
                  rows={1}
                ></textarea>
                <div className="flex gap-2">
                  <button className="p-2 text-zinc-500 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">attach_file</span>
                  </button>
                  <button className="bg-primary text-on-primary px-6 py-2 font-headline font-bold text-xs uppercase italic tracking-widest hover:bg-primary-container transition-all">
                    SEND
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Right Sidebar Agent Info */}
        <aside className="w-80 hidden xl:flex flex-col bg-zinc-950/30 overflow-y-auto custom-scrollbar border-l border-zinc-800/50">
          <div className="p-8 space-y-8">
            {/* Agent Profile */}
            <div className="space-y-4">
              <div className="w-full aspect-square bg-surface-container-high border border-zinc-800 relative overflow-hidden">
                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfrtlraFfZXER1bnQ8HdFFKRw_wqkxkeQbuMoUYYHFW92tvh_eh67ZifQLuyVi-332lUrcrhr4d7_jur9cBhf7_zo-BHSx9gC3Yyfs_pFk63gFHhIWsTbAuq3M01mqHxhx8I7jK7JgPaweIMvdatbjK7LW0vO643zrpopcvvIaJv19DjZL7xrS-_dMLmLHpPuj1oVikIASaekwiaCWqzp7lm6cQuivysWXCpIRPce-LOaUB7bRwO0rHkADdiFx2F6W3uJMkeky19U" alt="Agent visual" />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background to-transparent opacity-80"></div>
                <div className="absolute bottom-4 left-4">
                  <h2 className="text-xl font-black text-primary tracking-tighter uppercase italic">AGENT_ALPHA</h2>
                  <p className="text-[10px] font-label text-secondary tracking-widest uppercase font-bold">STATUS: OPTIMIZED</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 font-label">
                <div className="bg-surface-container-low p-3 border border-zinc-800/50">
                  <span className="block text-[8px] text-zinc-600 uppercase">VERSION</span>
                  <span className="block text-xs font-bold text-zinc-300">V.4.2.0</span>
                </div>
                <div className="bg-surface-container-low p-3 border border-zinc-800/50">
                  <span className="block text-[8px] text-zinc-600 uppercase">CORE</span>
                  <span className="block text-xs font-bold text-zinc-300">NEURAL-X</span>
                </div>
              </div>
            </div>

            {/* Diagnostics */}
            <div className="space-y-4 border-t border-zinc-800/50 pt-8">
              <div className="flex justify-between items-center font-label">
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-300 italic">System_Diagnostics</span>
                <span className="material-symbols-outlined text-sm text-secondary">analytics</span>
              </div>
              <div className="space-y-4">
                {[
                  { label: 'LATENCY', val: 85, color: 'bg-primary' },
                  { label: 'COGNITION_LOAD', val: 22, color: 'bg-secondary' }
                ].map((stat, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-[9px] font-label text-zinc-600 uppercase tracking-widest">
                      <span>{stat.label}</span>
                      <span>{stat.val === 85 ? '14MS' : '22%'}</span>
                    </div>
                    <div className="h-1 bg-zinc-900 overflow-hidden">
                      <div className={`h-full ${stat.color} transition-all`} style={{ width: `${stat.val}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 gap-3 border-t border-zinc-800/50 pt-8 font-label">
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-300 italic">Neural_Controls</span>
              <button className="flex items-center justify-between p-4 bg-surface-container-high hover:bg-zinc-800 transition-colors group border border-zinc-900">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-sm text-primary">refresh</span>
                  <span className="text-[10px] font-bold uppercase tracking-tight">Recalibrate_Aesthetics</span>
                </div>
                <span className="material-symbols-outlined text-xs group-hover:translate-x-1 transition-transform">chevron_right</span>
              </button>
              <button className="flex items-center justify-between p-4 bg-surface-container-high hover:bg-zinc-800 transition-colors group border border-zinc-900">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-sm text-primary">save</span>
                  <span className="text-[10px] font-bold uppercase tracking-tight">Export_Manifesto</span>
                </div>
                <span className="material-symbols-outlined text-xs group-hover:translate-x-1 transition-transform">chevron_right</span>
              </button>
            </div>

            {/* Terminal Noise */}
            <div className="mt-auto pt-8 font-label text-[8px] text-zinc-700 leading-tight uppercase tracking-tight">
              <p>SYS_PROC_CHAT: ACTIVE</p>
              <p>USER_ID: 04_BETA_PRIME</p>
              <p>TOKEN_REMAINING: 84,203</p>
              <p>ENCRYPTION: QUANTUM_256</p>
              <p className="mt-2 text-secondary/30">&gt;&gt;_READY_FOR_INPUT</p>
            </div>
          </div>
        </aside>
      </main>

      {/* Decorative Brackets */}
      <div className="fixed top-20 left-72 w-4 h-4 border-t-2 border-l-2 border-primary/10 pointer-events-none z-0"></div>
      <div className="fixed top-20 right-8 w-4 h-4 border-t-2 border-r-2 border-primary/10 pointer-events-none z-0"></div>
      <div className="fixed bottom-24 left-72 w-4 h-4 border-b-2 border-l-2 border-primary/10 pointer-events-none z-0"></div>
      <div className="fixed bottom-24 right-8 w-4 h-4 border-b-2 border-r-2 border-primary/10 pointer-events-none z-0"></div>
    </div>
  );
}
