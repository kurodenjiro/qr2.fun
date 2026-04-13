"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgeChatBasic() {
  const [messages] = useState([
    {
      role: 'agent',
      name: 'Agent Alpha',
      time: '09:12',
      content: "Hello. I have scanning the latest trends. How can I help with your design today? I've prepared three fabric prototypes for you."
    },
    {
      role: 'user',
      name: 'You',
      time: '09:14',
      content: "Show me the black iridescent prototype. Make sure it works in extreme temperatures."
    },
    {
      role: 'agent',
      name: 'Agent Alpha',
      time: '09:14',
      content: "Here is the 'Dark Chrome' prototype. It is designed to withstand temperatures from -40°C to +85°C.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA3qOoc8ZOI0etlOW93otBl0uHy-Iw8ZYMDM4khGFcjcXAKkU7ilq1mBgfkhwxvGx_ptmRL_Ygh1L8vV0GK5qxsFQBrI8f1MsiViEj6qV3oJo0W5vgvxeJm-Xo0Bl5dpTvS8duFPSIWYBlOvFEDXqK1dGYewO-0SM7Ihq2UTTNRv2HpwHt1gxp9Iz9KESW2_T1N64RIPcFTkIUMBs1O-nm7MgAvtNydyzKid3pst09E2mR4o1KyBcHwlO0xZsGu00zL1CLvE2oXM_o"
    }
  ]);

  return (
    <div className="flex h-screen bg-background pt-16 justify-center">
      {/* Centered Main Chat Area */}
      <main className="flex-1 max-w-5xl flex flex-col relative border-x border-zinc-800/30">
        {/* Minimal Chat Header */}
        <div className="h-14 flex items-center justify-between px-8 bg-surface-container-low border-b border-zinc-800/30">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-secondary animate-pulse"></div>
            <span className="font-label text-xs uppercase tracking-widest text-zinc-500">Active Session</span>
          </div>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-6 ${msg.role === 'user' ? 'justify-end' : ''}`}>
              {msg.role === 'agent' && (
                <div className="flex-shrink-0 w-10 h-10 bg-surface-container-highest flex items-center justify-center border border-primary/20 text-primary">
                  <span className="material-symbols-outlined">smart_toy</span>
                </div>
              )}
              <div className={`flex flex-col gap-2 max-w-2xl ${msg.role === 'user' ? 'items-end' : ''}`}>
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
                    </div>
                  )}
                </div>
              </div>
              {msg.role === 'user' && (
                <div className="flex-shrink-0 w-10 h-10 bg-surface-container-highest flex items-center justify-center border border-secondary/20 text-secondary">
                  <span className="material-symbols-outlined">person</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Simple Message Input */}
        <div className="p-8 bg-surface-container-low border-t border-zinc-800/30">
          <div className="relative max-w-3xl mx-auto group">
            <div className="absolute -top-3 left-4 bg-background px-2 z-10">
              <span className="font-label text-[10px] text-primary uppercase tracking-widest font-bold">Message</span>
            </div>
            <div className="flex items-center gap-4 bg-surface-container-highest p-4 border border-zinc-800 group-focus-within:border-primary/50 transition-colors">
              <input 
                className="flex-1 bg-transparent border-none focus:ring-0 text-zinc-100 placeholder:text-zinc-700 font-body text-sm outline-none" 
                placeholder="Type a message..." 
                type="text"
              />
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
      </main>

      {/* Subtle Decorative Brackets */}
      <div className="fixed top-24 left-10 w-4 h-4 border-t-2 border-l-2 border-primary/20 pointer-events-none"></div>
      <div className="fixed top-24 right-10 w-4 h-4 border-t-2 border-r-2 border-primary/20 pointer-events-none"></div>
      <div className="fixed bottom-10 left-10 w-4 h-4 border-b-2 border-l-2 border-primary/20 pointer-events-none"></div>
      <div className="fixed bottom-10 right-10 w-4 h-4 border-b-2 border-r-2 border-primary/20 pointer-events-none"></div>
    </div>
  );
}
