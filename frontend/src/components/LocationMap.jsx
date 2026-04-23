import { motion } from 'framer-motion';

export default function LocationMap({ location }) {
  if (!location) return null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {location.zones?.map((zone, i) => {
          const isRecommended = location.recommended_zone === zone.name;
          return (
            <motion.div
              key={zone.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
              className={`glass-card p-7 relative overflow-hidden ${isRecommended ? 'border-[#10b981]/30' : ''}`}
            >
              {isRecommended && (
                <div className="absolute top-4 right-4">
                  <span className="bg-[#10b981] text-[#09090b] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    Best Fit
                  </span>
                </div>
              )}

              <h3 className="text-lg font-semibold text-white tracking-tight mb-1">{zone.name}</h3>
              <p className="text-[12px] text-[#52525b] mb-5">{zone.cluster_type}</p>

              {/* Suitability */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-[12px] mb-2">
                  <span className="text-[#71717a]">Suitability</span>
                  <span className="font-semibold text-white">{zone.suitability}/10</span>
                </div>
                <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(zone.suitability / 10) * 100}%` }}
                    transition={{ duration: 1, delay: 0.2 + i * 0.1 }}
                    className="h-full rounded-full bg-white"
                  />
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <h4 className="text-[11px] font-medium text-[#10b981] uppercase tracking-widest mb-2">Advantages</h4>
                  <ul className="space-y-1.5">
                    {zone.advantages?.map((adv, j) => (
                      <li key={j} className="text-[12px] text-[#a1a1aa] leading-relaxed">+ {adv}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-[11px] font-medium text-[#ef4444]/70 uppercase tracking-widest mb-2">Challenges</h4>
                  <ul className="space-y-1.5">
                    {zone.disadvantages?.map((dis, j) => (
                      <li key={j} className="text-[12px] text-[#a1a1aa] leading-relaxed">− {dis}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {location.rationale && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="glass-card p-8"
        >
          <h3 className="text-[15px] font-semibold text-white mb-3 tracking-tight">Zone Selection Rationale</h3>
          <p className="text-[13px] text-[#71717a] leading-relaxed">{location.rationale}</p>
        </motion.div>
      )}
    </div>
  );
}
