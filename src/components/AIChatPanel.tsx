"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Send, Sparkles } from "lucide-react";
import { CampusAssistantProvider } from "@/lib/ai";

type Message = {
  id: string;
  sender: "user" | "ai";
  text: string;
};

interface AIChatPanelProps {
  onClose: () => void;
}

export default function AIChatPanel({ onClose }: AIChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", sender: "ai", text: "Hi! I'm your Campus360 AI Assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    "Where are MCA classes?",
    "Who teaches DSA?",
    "What is today's timetable?",
    "What are the latest notices?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { id: crypto.randomUUID(), sender: "user", text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(async () => {
      const responseText = await CampusAssistantProvider.ask(text);
      const aiMsg: Message = { id: (Date.now() + 1).toString(), sender: "ai", text: responseText };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className="fixed bottom-6 right-6 z-50 w-[380px] h-[600px] max-h-[80vh] max-w-[calc(100vw-48px)] glass-always border border-white/20 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
    >
      {/* Header */}
      <div className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-brand flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-white font-bold text-sm">Campus360 AI</h3>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] text-white/50 uppercase tracking-widest font-bold">Online</span>
            </div>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-white/60 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
          >
            <div 
              className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm whitespace-pre-wrap ${
                msg.sender === "user" 
                  ? "bg-white/10 text-white rounded-tr-sm" 
                  : "bg-brand-blue/10 border border-brand-blue/20 text-brand-cyan rounded-tl-sm"
              }`}
            >
              {msg.text.split(/(\*\*.*?\*\*)/).map((part, i) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                  return <strong key={i} className="font-bold text-white">{part.slice(2, -2)}</strong>;
                }
                return <span key={i}>{part}</span>;
              })}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex items-start">
            <div className="bg-brand-blue/10 border border-brand-blue/20 rounded-2xl rounded-tl-sm px-4 py-4 flex gap-1">
              <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-brand-cyan/60 rounded-full" />
              <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-brand-cyan/60 rounded-full" />
              <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-brand-cyan/60 rounded-full" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input & Suggestions */}
      <div className="p-4 border-t border-white/10 bg-[#050505]/50">
        {messages.length < 3 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {suggestions.map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(suggestion)}
                className="text-[11px] bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 px-3 py-1.5 rounded-full transition-colors whitespace-nowrap"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
        
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
            placeholder="Ask anything..."
            className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-4 pr-12 text-sm text-white placeholder-white/40 focus:outline-none focus:border-brand-blue transition-colors"
          />
          <button
            onClick={() => handleSend(input)}
            disabled={!input.trim()}
            className="absolute right-1 top-1 bottom-1 w-10 rounded-full bg-brand-blue flex items-center justify-center text-white disabled:opacity-50 disabled:bg-white/10 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
