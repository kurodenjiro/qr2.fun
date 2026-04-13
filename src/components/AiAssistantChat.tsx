"use client";

import { useChat } from '@ai-sdk/react';
import { useState } from 'react';

export default function AiAssistantChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const { messages, sendMessage, status } = useChat();
  const isLoading = status === 'submitted' || status === 'streaming';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage({ text: input });
    setInput('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <>
      {/* Floating Action Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-primary border-2 border-primary-container text-on-primary rounded-none shadow-[0_0_20px_rgba(143,245,255,0.4)] flex items-center justify-center hover:bg-primary-dim transition-all z-50 group"
      >
        <span className="material-symbols-outlined text-3xl group-hover:rotate-180 transition-transform duration-500">smart_toy</span>
      </button>

      {/* Chat Panel */}
      <div className={`fixed right-0 top-16 bottom-0 w-96 bg-surface-container-high border-l-2 border-primary/30 shadow-[-10px_0_30px_rgba(0,0,0,0.8)] z-40 transform transition-transform duration-300 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="p-4 border-b border-primary/20 bg-surface-container-lowest flex justify-between items-center">
          <div>
            <div className="font-headline font-bold text-primary tracking-widest uppercase">FORGE_ASSISTANT</div>
            <div className="font-label text-[10px] text-secondary tracking-widest uppercase flex items-center gap-1 mt-1">
              <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse"></span> ONLINE
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-error transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
             <div className="text-zinc-500 font-label text-xs uppercase tracking-widest text-center mt-10">
               Sys_Init_Complete.<br/>Awaiting queries...
             </div>
          )}
          {messages.map(m => (
            <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-3 font-label text-sm ${m.role === 'user' ? 'bg-primary/10 border border-primary text-primary' : 'bg-surface-container-low border border-zinc-700 text-zinc-300'}`}>
                {m.role === 'assistant' && <div className="text-[10px] text-secondary mb-1 uppercase tracking-widest font-bold">FORGE_AI //</div>}
                {m.parts.map((part, i) => (
                  part.type === 'text' ? <div key={i}>{part.text}</div> : null
                ))}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="text-primary font-label text-xs uppercase flex items-center gap-2">
               Processing <span className="material-symbols-outlined animate-spin text-sm">sync</span>
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="p-4 bg-surface-container-lowest border-t border-primary/20">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              className="flex-1 bg-surface-container-low border border-zinc-700 p-2 font-label text-sm text-zinc-200 focus:outline-none focus:border-primary transition-colors"
              value={input}
              placeholder="Query system..."
              onChange={handleInputChange}
            />
            <button type="submit" className="bg-primary text-on-primary w-10 flex items-center justify-center hover:bg-primary-dim transition-colors">
               <span className="material-symbols-outlined text-sm font-bold">send</span>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
