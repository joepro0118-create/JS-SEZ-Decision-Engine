import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { sendChatMessage } from '../utils/api.js';

export default function AiChatBox({ analysisContext }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hello! I'm **NEXUS AI Advisor**. Ask me about JS-SEZ strategies, NIA scores, or zone selection.",
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => { scrollToBottom(); }, [messages, isTyping]);
  useEffect(() => { if (isOpen) setTimeout(() => inputRef.current?.focus(), 300); }, [isOpen]);

  const handleSend = async (customMessage = null) => {
    const textToSend = customMessage || input;
    if (!textToSend.trim() || isTyping) return;

    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: textToSend.trim() }]);
    setIsTyping(true);

    try {
      const history = messages
        .filter((_, i) => i > 0)
        .map((m) => ({ role: m.role === 'assistant' ? 'model' : 'user', content: m.content }));
      const result = await sendChatMessage(textToSend.trim(), history, analysisContext);
      if (result.success) {
        setMessages((prev) => [...prev, { role: 'assistant', content: result.reply }]);
      } else {
        setMessages((prev) => [...prev, { role: 'assistant', content: '⚠️ Error. Please try again.' }]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: `⚠️ ${err.response?.data?.error || 'Connection failed.'}` },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  return (
    <>
      {/* FAB */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[90] w-14 h-14 rounded-full bg-white shadow-xl flex items-center justify-center cursor-pointer border border-[#e4e4e7]"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} className="text-xl text-[#09090b] font-bold">✕</motion.span>
          ) : (
            <motion.span key="open" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="text-2xl">💬</motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-[90] w-full max-w-[380px] max-h-[600px] flex flex-col rounded-[24px] overflow-hidden shadow-2xl bg-white border border-[#e4e4e7]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 shrink-0 border-b border-[#f4f4f5]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-[10px] bg-[#09090b] flex items-center justify-center shadow-sm">
                  <div className="w-4 h-4 rounded-full border-[2.5px] border-white"></div>
                </div>
                <div className="flex flex-col">
                  <h3 className="text-[15px] font-semibold text-[#09090b] leading-tight mb-0.5">Customer Support</h3>
                  <span className="text-[13px] text-[#71717a] leading-tight">
                    {analysisContext ? 'Context loaded' : 'The team can also help'}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[#a1a1aa]">
                <button className="p-1.5 hover:bg-[#f4f4f5] rounded-lg transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                  </svg>
                </button>
                <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-[#f4f4f5] rounded-lg transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-6" style={{ maxHeight: '420px' }}>
              <div className="space-y-1">
                {messages.map((msg, i) => {
                  const isLastAssistant = msg.role === 'assistant' && (i === messages.length - 1 || messages[i+1]?.role !== 'assistant');
                  
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} ${isLastAssistant ? 'mb-5' : 'mb-1'}`}
                    >
                      <div
                        className={`max-w-[85%] px-4 py-3 text-[14px] leading-relaxed ${
                          msg.role === 'user'
                            ? 'bg-[#09090b] text-white rounded-[20px] rounded-br-sm'
                            : 'bg-[#f4f4f5] text-[#09090b] rounded-[20px] rounded-bl-sm'
                        }`}
                      >
                        {msg.role === 'assistant' ? (
                          <div className="prose prose-sm max-w-none [&>p]:mb-2 [&>p:last-child]:mb-0 [&>ul]:ml-4 [&_li]:text-[#09090b] [&_em]:text-[#3b82f6] [&_strong]:text-black">
                            <ReactMarkdown>{msg.content}</ReactMarkdown>
                          </div>
                        ) : msg.content}
                      </div>
                      {isLastAssistant && (
                        <span className="text-[11px] text-[#a1a1aa] mt-1.5 ml-1">Customer Support • Just now</span>
                      )}
                    </motion.div>
                  );
                })}
              </div>
              
              {isTyping && (
                <div className="flex justify-start mt-4">
                  <div className="flex items-center gap-1.5 px-4 py-3 bg-[#f4f4f5] rounded-[20px] rounded-bl-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#a1a1aa] animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#a1a1aa] animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#a1a1aa] animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="px-4 pb-4 pt-2 shrink-0 bg-white">
              <div className="flex flex-col border-[1.5px] border-[#09090b] rounded-[24px] p-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Message..."
                  className="w-full bg-transparent px-2.5 py-1.5 text-[14px] text-[#09090b] placeholder-[#71717a] focus:outline-none"
                />
                <div className="flex items-center justify-between mt-1 px-1.5">
                  <div className="flex items-center gap-3 text-[#71717a]">
                    <svg className="w-4.5 h-4.5 cursor-pointer hover:text-[#09090b] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                    <svg className="w-4.5 h-4.5 cursor-pointer hover:text-[#09090b] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <div className="text-[9px] font-bold border-2 border-[#71717a] rounded-[4px] px-0.5 cursor-pointer hover:text-[#09090b] hover:border-[#09090b] transition-colors flex items-center justify-center h-4.5">GIF</div>
                    <svg className="w-4.5 h-4.5 cursor-pointer hover:text-[#09090b] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSend(input)}
                    disabled={!input.trim() || isTyping}
                    className="w-7 h-7 rounded-full bg-[#f4f4f5] flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#e4e4e7] transition-colors"
                  >
                    <svg className="w-4 h-4 text-[#d4d4d8] data-[active=true]:text-[#09090b]" data-active={!!input.trim() && !isTyping} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
