import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { sendChatMessage } from '../utils/api.js';

const SUGGESTIONS = [
  { icon: "🗺️", text: "Compare Sedenak vs Kulai zones" },
  { icon: "💰", text: "How to qualify for 5% tax rate?" },
  { icon: "🌱", text: "Improve my ESG compliance score" },
  { icon: "🏭", text: "Explain RM15 Carbon Tax impact" },
];

// Shimmer typing indicator
function TypingIndicator() {
  return (
    <div className="chat-typing-row">
      <div className="chat-avatar chat-avatar--ai">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
      <div className="chat-typing-dots">
        <span className="chat-dot" />
        <span className="chat-dot" style={{ animationDelay: '0.15s' }} />
        <span className="chat-dot" style={{ animationDelay: '0.3s' }} />
      </div>
    </div>
  );
}

// Single message bubble
function MessageBubble({ msg, isLast }) {
  const isUser = msg.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`chat-msg-row ${isUser ? 'chat-msg-row--user' : 'chat-msg-row--ai'}`}
    >
      {!isUser && (
        <div className="chat-avatar chat-avatar--ai">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
      )}
      <div className={`chat-bubble ${isUser ? 'chat-bubble--user' : 'chat-bubble--ai'}`}>
        {isUser ? (
          <p>{msg.content}</p>
        ) : (
          <div className="chat-markdown">
            <ReactMarkdown>{msg.content}</ReactMarkdown>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function AiChatBox({ analysisContext }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const isEmpty = messages.length === 0;

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => { scrollToBottom(); }, [messages, isTyping, scrollToBottom]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => textareaRef.current?.focus(), 350);
      // Lock body scroll when panel is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Auto-resize textarea
  const handleInputChange = (e) => {
    setInput(e.target.value);
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 160) + 'px';
  };

  const handleSend = async (customMessage = null) => {
    const textToSend = customMessage || input;
    if (!textToSend.trim() || isTyping) return;

    setInput('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
    setMessages((prev) => [...prev, { role: 'user', content: textToSend.trim() }]);
    setIsTyping(true);

    try {
      const history = messages.map((m) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        content: m.content,
      }));
      const result = await sendChatMessage(textToSend.trim(), history, analysisContext);
      if (result.success) {
        setMessages((prev) => [...prev, { role: 'assistant', content: result.reply }]);
      } else {
        setMessages((prev) => [...prev, { role: 'assistant', content: '⚠️ Something went wrong. Please try again.' }]);
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

  return (
    <>
      {/* ─── Floating Action Button ─── */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setIsOpen(true)}
        className="chat-fab"
        style={{ display: isOpen ? 'none' : 'flex' }}
        aria-label="Open AI Chat"
      >
        <div className="chat-fab__inner">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div className="chat-fab__ping" />
      </motion.button>

      {/* ─── Chat Panel Overlay ─── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="chat-backdrop"
              onClick={() => setIsOpen(false)}
            />

            {/* Panel */}
            <motion.div
              key="panel"
              initial={{ x: '100%', opacity: 0.5 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="chat-panel"
            >
              {/* ─── Header ─── */}
              <div className="chat-header">
                <div className="chat-header__left">
                  <div className="chat-header__avatar">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span className="chat-header__status" />
                  </div>
                  <div className="chat-header__info">
                    <h3>NEXUS AI</h3>
                    <span>JS-SEZ Strategic Advisor</span>
                  </div>
                </div>
                <div className="chat-header__actions">
                  <button
                    className="chat-header__btn"
                    onClick={() => {
                      setMessages([]);
                      setInput('');
                    }}
                    title="New conversation"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                  <button className="chat-header__btn" onClick={() => setIsOpen(false)} title="Close">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* ─── Messages Area ─── */}
              <div className="chat-messages">
                {isEmpty ? (
                  <div className="chat-empty">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="chat-empty__icon"
                    >
                      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </motion.div>
                    <motion.h2
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1, duration: 0.4 }}
                    >
                      How can I help you?
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                    >
                      Ask me anything about JS-SEZ investment, NIA scores, tax incentives, or zone comparisons.
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35, duration: 0.4 }}
                      className="chat-suggestions"
                    >
                      {SUGGESTIONS.map((s, i) => (
                        <button
                          key={i}
                          className="chat-suggestion"
                          onClick={() => handleSend(s.text)}
                        >
                          <span className="chat-suggestion__icon">{s.icon}</span>
                          <span>{s.text}</span>
                        </button>
                      ))}
                    </motion.div>
                  </div>
                ) : (
                  <div className="chat-messages__list">
                    {messages.map((msg, i) => (
                      <MessageBubble key={i} msg={msg} isLast={i === messages.length - 1} />
                    ))}
                    {isTyping && <TypingIndicator />}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </div>

              {/* ─── Input Area ─── */}
              <div className="chat-input-area">
                <div className="chat-input-wrapper">
                  <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Message NEXUS AI..."
                    rows={1}
                    className="chat-textarea"
                  />
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleSend()}
                    disabled={!input.trim() || isTyping}
                    className="chat-send-btn"
                    aria-label="Send message"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                  </motion.button>
                </div>
                <p className="chat-disclaimer">NEXUS AI can make mistakes. Verify important information.</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
