import { motion } from 'framer-motion';

function StrategyCard({ title, description, pros, cons, isRecommended }) {
  return (
    <div className={`glass-card p-8 relative overflow-hidden ${isRecommended ? 'border-[#10b981]/30' : ''}`}>
      {isRecommended && (
        <div className="absolute top-4 right-4">
          <span className="bg-[#10b981] text-[#09090b] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
            Recommended
          </span>
        </div>
      )}

      <h3 className="text-lg font-semibold text-white tracking-tight mb-3">{title}</h3>
      <p className="text-sm text-[#71717a] mb-6 leading-relaxed">{description}</p>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <h4 className="text-[11px] font-medium text-[#10b981] uppercase tracking-widest mb-3">Advantages</h4>
          <ul className="space-y-2">
            {pros?.map((pro, i) => (
              <li key={i} className="flex items-start gap-2 text-[13px] text-[#a1a1aa]">
                <span className="text-[#10b981] mt-0.5 shrink-0">✓</span>
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-[11px] font-medium text-[#ef4444]/80 uppercase tracking-widest mb-3">Challenges</h4>
          <ul className="space-y-2">
            {cons?.map((con, i) => (
              <li key={i} className="flex items-start gap-2 text-[13px] text-[#a1a1aa]">
                <span className="text-[#ef4444]/70 mt-0.5 shrink-0">✗</span>
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function StrategyPanel({ strategy }) {
  if (!strategy) return null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StrategyCard
          title="Twinning (SG + Johor)"
          description={strategy.twinning?.description}
          pros={strategy.twinning?.pros}
          cons={strategy.twinning?.cons}
          isRecommended={strategy.recommended?.toLowerCase().includes('twinning')}
        />
        <StrategyCard
          title="Full Relocation"
          description={strategy.full_relocation?.description}
          pros={strategy.full_relocation?.pros}
          cons={strategy.full_relocation?.cons}
          isRecommended={strategy.recommended?.toLowerCase().includes('relocation')}
        />
      </div>

      {strategy.specific_actions?.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-8"
        >
          <h3 className="text-[15px] font-semibold text-white mb-5 tracking-tight">Actions to Unlock Tier 1</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {strategy.specific_actions.map((action, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <span className="text-[#71717a] font-mono text-sm mt-0.5 shrink-0">{i + 1}.</span>
                <span className="text-[13px] text-[#a1a1aa] leading-relaxed">{action}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
