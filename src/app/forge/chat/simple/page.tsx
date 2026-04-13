"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgeChatSimple() {
  const [messages] = useState([
    {
      role: 'agent',
      name: 'ASSISTANT',
      time: '09:12:44',
      content: "Hello. I've analyzed current fashion trends. How should we proceed with your custom fabric? I have three new mesh prototypes ready for you to look at."
    },
    {
      role: 'user',
      name: 'YOU',
      time: '09:14:02',
      content: "Show me the iridescent black prototype first. Make sure it can handle extreme temperatures."
    },
    {
      role: 'agent',
      name: 'ASSISTANT',
      time: '09:14:15',
      content: "Here is the \"Dark Chrome\" prototype. This fabric uses light-shifting technology and is designed to remain durable between -40°C and +85°C.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA3qOoc8ZOI0etlOW93otBl0uHy-Iw8ZYMDM4khGFcjcXAKkU7ilq1mBgfkhwxvGx_ptmRL_Ygh1L8vV0GK5qxsFQBrI8f1MsiViEj6qV3oJo0W5vgvxeJm-Xo0Bl5dpTvS8duFPSIWYBlOvFEDXqK1dGYewO-0SM7Ihq2UTTNRv2HpwHt1gxp9Iz9KESW2_T1N64RIPcFTkIUMBs1O-nm7MgAvtNydyzKid3pst09E2mR4o1KyBcHwlO0xZsGu00zL1CLvE2oXM_o"
    }
  ]);

  return (
    <div className="flex h-screen bg-background pt-16">
      {/* Main Content Canvas */}
      <main className="flex-1 flex overflow-hidden max-w-5xl mx-auto">
        {/* Chat Area */}
        <section className="flex-1 flex flex-col relative border-x border-zinc-800/30">
          {/* Chat Header */}
          <div className="h-14 flex items-center justify-between px-8 bg-surface-container-low border-b border-zinc-800/30">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-secondary animate-pulse"></div>
              <span className="font-label text-xs uppercase tracking-[0.2em] text-zinc-500">Active Chat Session</span>
            </div>
            <span className="font-label text-[10px] text-primary/50 uppercase tracking-widest hidden sm:block">Connected</span>
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
                        <div className="absolute top-2 right-2 px-2 py-1 text-[8px] font-label text-primary border border-primary/40 uppercase bg-black/60 backdrop-blur-md">FABRIC PREVIEW</div>
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
                <span className="font-label text-[10px] text-primary uppercase tracking-widest font-bold">Message Assistant</span>
              </div>
              <div className="flex items-end gap-4 bg-surface-container-highest p-4 border border-zinc-800 group-focus-within:border-primary/50 transition-colors">
                <textarea 
                  className="flex-1 bg-transparent border-none focus:ring-0 text-zinc-100 placeholder:text-zinc-700 resize-none font-body text-sm outline-none" 
                  placeholder="Ask a question or give a command..." 
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
      </main>

      {/* Decorative Brackets */}
      <div className="fixed top-24 left-8 w-4 h-4 border-t-2 border-l-2 border-primary/10 pointer-events-none"></div>
      <div className="fixed top-24 right-8 w-4 h-4 border-t-2 border-r-2 border-primary/10 pointer-events-none"></div>
      <div className="fixed bottom-8 left-8 w-4 h-4 border-b-2 border-l-2 border-primary/10 pointer-events-none"></div>
      <div className="fixed bottom-8 right-8 w-4 h-4 border-b-2 border-r-2 border-primary/10 pointer-events-none"></div>
    </div>
  );
}
