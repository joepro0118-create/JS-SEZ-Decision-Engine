import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, ChevronDown } from 'lucide-react';

const highlightText = (text) => {
  const parts = text.split(/(Kulai|Sedenak|Forest City|5%|10%|15%|Tier 1|Tier 2|Tier 3|Carbon Tax|RM15\/tonne|Risks?|Supply Chain)/gi);
  return parts.map((part, i) => {
    if (!part) return null;
    const lower = part.toLowerCase();
    if (['kulai', 'sedenak', 'forest city'].includes(lower))
      return <span key={i} className="text-blue-400 font-bold bg-blue-500/10 px-1 rounded">{part}</span>;
    if (['5%', '10%', '15%', 'tier 1', 'tier 2', 'tier 3'].includes(lower))
      return <span key={i} className="text-emerald-400 font-bold bg-emerald-500/10 px-1 rounded">{part}</span>;
    if (['carbon tax', 'rm15/tonne', 'risk', 'risks', 'supply chain'].includes(lower))
      return <span key={i} className="text-rose-400 font-bold bg-rose-500/10 px-1 rounded">{part}</span>;
    return <span key={i}>{part}</span>;
  });
};

export default function ReasoningLog({ log }) {
  const [isExpanded, setIsExpanded] = useState(false);
  if (!log) return null;

  const lines = typeof log === 'string' ? log.split('\n').filter(p => p.trim()) : [String(log)];

  return (
    <div className="w-full flex flex-col items-center">

      {/* Centered Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsExpanded(!isExpanded)}
        className="group relative flex flex-col items-center gap-3 z-10"
      >
        <div className="w-16 h-16 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center shadow-xl group-hover:border-blue-500/50 transition-colors">
          <BrainCircuit className={`w-7 h-7 text-zinc-400 group-hover:text-blue-400 transition-colors ${isExpanded ? 'text-blue-400' : ''}`} />
        </div>
        <div className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-zinc-500 group-hover:text-zinc-300">
          View Processing Matrix <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
        </div>
      </motion.button>

      {/* Expanded Sequence */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: 'auto', opacity: 1, marginTop: '2rem' }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-full overflow-hidden flex flex-col items-center"
          >
            <div className="relative w-full max-w-3xl pb-10">
              {/* Central Timeline Spine */}
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-white/5" />

              <div className="space-y-8 relative z-10 pt-4">
                {lines.map((line, i) => {
                  const content = line.replace(/^[\-\*]\s*/, '').trim();
                  const formattedContent = content.split(/(\*\*.*?\*\*)/g).map((chunk, idx) => {
                    if (chunk.startsWith('**') && chunk.endsWith('**')) {
                      return <strong key={idx} className="text-white">{highlightText(chunk.slice(2, -2))}</strong>;
                    }
                    return <span key={idx}>{highlightText(chunk)}</span>;
                  });

                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      className="flex flex-col items-center w-full group"
                    >
                      {/* Timeline Node */}
                      <div className="w-8 h-8 rounded-full bg-[#09090b] border-2 border-white/10 flex items-center justify-center mb-4 group-hover:border-blue-500/50 transition-colors z-10 shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                        <span className="text-[10px] font-bold text-zinc-500 group-hover:text-blue-400">{i + 1}</span>
                      </div>

                      {/* Glass Content Card */}
                      <div className="w-full bg-zinc-900/60 border border-white/5 backdrop-blur-md p-6 sm:p-8 rounded-3xl text-center shadow-xl group-hover:bg-zinc-800/40 transition-colors">
                        <p className="text-[15px] text-zinc-300 leading-relaxed max-w-2xl mx-auto">
                          {formattedContent}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* End Node */}
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: lines.length * 0.1 + 0.3 }}
                className="flex flex-col items-center mt-8 relative z-10"
              >
                <div className="w-3 h-3 rounded-full bg-blue-500 animate-ping absolute" />
                <div className="w-3 h-3 rounded-full bg-blue-400 relative" />
                <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase mt-4">Sequence Complete</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}