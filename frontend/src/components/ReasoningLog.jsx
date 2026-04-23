import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const highlightText = (text) => {
  const parts = text.split(/(Kulai|Sedenak|Forest City|5%|10%|15%|Tier 1|Tier 2|Tier 3|Carbon Tax|RM15\/tonne|Risks?|Supply Chain)/gi);
  return parts.map((part, i) => {
    if (!part) return null;
    const lower = part.toLowerCase();
    if (['kulai', 'sedenak', 'forest city'].includes(lower))
      return <span key={i} className="text-[#3b82f6] font-medium">{part}</span>;
    if (['5%', '10%', '15%', 'tier 1', 'tier 2', 'tier 3'].includes(lower))
      return <span key={i} className="text-[#10b981] font-medium">{part}</span>;
    if (['carbon tax', 'rm15/tonne', 'risk', 'risks', 'supply chain'].includes(lower))
      return <span key={i} className="text-[#ef4444]/80 font-medium">{part}</span>;
    return <span key={i}>{part}</span>;
  });
};

export default function ReasoningLog({ log }) {
  const [isExpanded, setIsExpanded] = useState(true);
  if (!log) return null;

  const paragraphs = typeof log === 'string' ? log.split('\n').filter(p => p.trim()) : [String(log)];

  return (
    <div className="terminal-bg overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06] cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]/60" />
          </div>
          <span className="text-[11px] font-mono text-[#52525b]">reasoning-log</span>
        </div>
        <motion.span animate={{ rotate: isExpanded ? 180 : 0 }} className="text-[#52525b] text-xs">▼</motion.span>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-6 space-y-4 max-h-[500px] overflow-y-auto">
              {paragraphs.map((para, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.3, duration: 0.4 }}
                  className="flex items-start gap-3"
                >
                  <span className="text-[#52525b] font-mono text-[11px] mt-0.5 shrink-0">
                    [{String(i + 1).padStart(2, '0')}]
                  </span>
                  <p className="text-[13px] text-[#a1a1aa] leading-relaxed font-mono">
                    {highlightText(para)}
                  </p>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: paragraphs.length * 0.3 }}
                className="text-[11px] text-[#52525b] font-mono mt-4"
              >
                {'>'} Analysis complete. ■
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
