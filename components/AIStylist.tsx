
import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, X, Bot, User } from 'lucide-react';
import { ChatMessage } from '../types';
import { getStylingAdvice } from '../services/geminiService';

const AIStylist: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<ChatMessage[]>([
    { role: 'model', text: 'Yo! I\'m your WADIDAW AI Stylist. Looking for some futuristic drip or a cyber-outfit suggestion? Hit me up! 🔥' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setHistory(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const advice = await getStylingAdvice(history, userMsg);
    setHistory(prev => [...prev, { role: 'model', text: advice }]);
    setIsLoading(false);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-[80] bg-white text-black p-4 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-110 transition-transform active:scale-95 group"
      >
        <Sparkles className="w-6 h-6 group-hover:animate-spin" />
        <span className="absolute left-full ml-4 whitespace-nowrap bg-black/80 backdrop-blur px-3 py-1 rounded text-xs border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">AI Stylist</span>
      </button>

      {isOpen && (
        <div className="fixed bottom-24 left-6 z-[80] w-[350px] max-w-[90vw] h-[500px] bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300">
          <div className="p-4 bg-white/5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-red-400" />
              <h3 className="font-bold text-sm tracking-tight uppercase">WADIDAW Stylist</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:text-red-500 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            {history.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-red-500 text-black font-medium' 
                    : 'bg-white/5 border border-white/5'
                }`}>
                  <div className="flex items-center gap-2 mb-1 opacity-50">
                    {msg.role === 'model' ? <Bot className="w-3 h-3" /> : <User className="w-3 h-3" />}
                    <span className="text-[10px] font-bold uppercase">{msg.role === 'model' ? 'Stylist' : 'You'}</span>
                  </div>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/5 p-3 rounded-xl flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-white/10 flex gap-2">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask for fashion tips..."
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-red-500 transition-colors"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading}
              className="bg-white text-black p-2 rounded-lg hover:bg-red-500 transition-colors disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AIStylist;
