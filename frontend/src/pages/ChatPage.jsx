import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { sendChatMessage } from '../utils/api.js';
import { useAnalysis } from '../context/AnalysisContext.jsx';

export default function ChatPage() {
  const { analysisResult } = useAnalysis();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSend = async (customMessage = null) => {
    const textToSend = customMessage || input;
    if (!textToSend.trim() || isTyping) return;

    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: textToSend.trim() }]);
    setIsTyping(true);

    try {
      const history = messages.map((m) => ({ role: m.role === 'assistant' ? 'model' : 'user', content: m.content }));
      const result = await sendChatMessage(textToSend.trim(), history, analysisResult);

      if (result.success) {
        setMessages((prev) => [...prev, { role: 'assistant', content: result.reply }]);
      } else {
        setMessages((prev) => [...prev, { role: 'assistant', content: '⚠️ Sorry, I encountered an error. Please try again.' }]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: `⚠️ ${err.response?.data?.error || 'Connection failed. Is the backend running?'}` },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickActions = [
    { label: "Compare Sedenak vs Kulai", icon: "🗺️" },
    { label: "Improve ESG score", icon: "🌱" },
    { label: "5% tax bracket", icon: "💰" },
    { label: "RM15 Carbon Tax", icon: "🏭" },
  ];

  const isEmpty = messages.length === 0;

  return (
    <div className="pt-[64px] h-screen flex flex-col bg-[#09090b]">
      {isEmpty ? (
        <div className="flex-1 flex flex-col items-center justify-center -mt-20">
          {/* Hero text */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="w-full max-w-[800px] px-6 mb-12 flex flex-col items-start"
          >
            <h1 className="text-4xl md:text-[44px] font-medium text-white mb-2 tracking-tight">Hi Joe</h1>
            <h2 className="text-4xl md:text-[44px] font-medium text-[#71717a] tracking-tight">Where should we start?</h2>
          </motion.div>

          {/* Big Input Pill */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full max-w-[800px] px-6 mb-8"
          >
            <div className="bg-[#18181b] rounded-[32px] p-2 flex flex-col w-full border border-white/[0.04] shadow-lg">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask NEXUS..."
                className="bg-transparent text-white px-5 py-6 text-[17px] placeholder-[#71717a] focus:outline-none w-full"
              />
              <div className="flex justify-between items-center px-4 pb-2 pt-2">
                <button className="flex items-center gap-2 text-[#a1a1aa] hover:text-white transition-colors text-[14px] font-medium">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                  Tools
                </button>
                <div className="flex items-center gap-5">
                  <button className="text-[#a1a1aa] hover:text-white transition-colors text-[14px] font-medium flex items-center gap-1">
                    Fast 
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  <button className="text-[#a1a1aa] hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions Row */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-3 px-6 max-w-[800px]"
          >
            {quickActions.map((action, i) => (
              <button
                key={i}
                onClick={() => handleSend(action.label)}
                className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#18181b] border border-white/[0.04] text-[#a1a1aa] hover:bg-[#27272a] hover:text-white transition-colors text-[14px] font-medium"
              >
                <span>{action.icon}</span>
                {action.label}
              </button>
            ))}
          </motion.div>
        </div>
      ) : (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-6 lg:px-8 pt-8">
            <div className="max-w-[800px] mx-auto py-8 space-y-8">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 mr-4 mt-1">
                      <svg className="w-5 h-5 text-[#09090b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] rounded-[24px] px-6 py-4 text-[15px] leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-[#27272a] text-[#fafafa] rounded-tr-sm'
                        : 'bg-transparent text-[#e4e4e7] px-0'
                    }`}
                  >
                    {msg.role === 'assistant' ? (
                      <div className="prose prose-invert max-w-none [&>p]:mb-4 [&>p:last-child]:mb-0 [&>ul]:mb-4 [&>ul]:ml-4 [&_li]:text-[#e4e4e7] [&_em]:text-[#3b82f6] [&_strong]:text-white [&_code]:text-[#3b82f6] [&_code]:bg-white/[0.04] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    ) : (
                      msg.content
                    )}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 mr-4 mt-1">
                    <svg className="w-5 h-5 text-[#09090b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#52525b] animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#52525b] animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#52525b] animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area (Ongoing Chat) */}
          <div className="px-6 lg:px-8 pb-8 pt-2 shrink-0 bg-[#09090b]">
            <div className="max-w-[800px] mx-auto">
              <div className="bg-[#18181b] rounded-[32px] p-2 flex items-center w-full border border-white/[0.04] shadow-lg">
                <button className="p-3 text-[#a1a1aa] hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                </button>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask NEXUS..."
                  className="flex-1 bg-transparent px-3 py-3.5 text-[15px] text-[#fafafa] placeholder-[#71717a] focus:outline-none"
                />
                {input.trim() ? (
                  <motion.button
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSend(input)}
                    disabled={isTyping}
                    className="w-10 h-10 mr-1 rounded-full bg-white flex items-center justify-center cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
                  >
                    <svg className="w-4 h-4 text-[#09090b] ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                  </motion.button>
                ) : (
                  <button className="p-3 mr-1 text-[#a1a1aa] hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
