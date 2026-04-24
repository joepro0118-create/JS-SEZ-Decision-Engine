import { motion } from 'framer-motion';

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
  if (!log) return null;

  const lines = typeof log === 'string' ? log.split('\n').filter(p => p.trim()) : [String(log)];

  return (
    <div className="w-full flex justify-center">
      <ul className="reasoning-list">
        {lines.map((line, i) => {
          const content = line.replace(/^[\-\*]\s*/, '').trim();
          const formattedContent = content.split(/(\*\*.*?\*\*)/g).map((chunk, idx) => {
            if (chunk.startsWith('**') && chunk.endsWith('**')) {
              return <strong key={idx} className="text-white">{highlightText(chunk.slice(2, -2))}</strong>;
            }
            return <span key={idx}>{highlightText(chunk)}</span>;
          });

          return (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="reasoning-list__item"
            >
              {formattedContent}
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}