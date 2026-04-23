import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Cpu, Briefcase, Link, Factory, Leaf } from 'lucide-react';

const PILLAR_CONFIG = {
  economic_complexity: { label: 'Economic Complexity', icon: Cpu, color: '#3b82f6' },
  high_value_jobs: { label: 'High-Value Jobs', icon: Briefcase, color: '#8b5cf6' },
  domestic_linkages: { label: 'Domestic Linkages', icon: Link, color: '#f59e0b' },
  industrial_clusters: { label: 'Industrial Clusters', icon: Factory, color: '#6366f1' },
  inclusivity_sustainability: { label: 'Inclusivity & Sustainability', icon: Leaf, color: '#10b981' },
};

function ScoreRing({ score, maxScore = 10, color, delay = 0 }) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedScore / maxScore) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedScore(score), delay);
    return () => clearTimeout(timer);
  }, [score, delay]);

  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
        <circle
          cx="50" cy="50" r={radius}
          fill="none" stroke={color} strokeWidth="6" strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={offset}
          className="progress-ring-circle"
          style={{ filter: `drop-shadow(0 0 6px ${color}40)` }}
        />
      </svg>
      <span className="text-xl font-semibold text-white">{animatedScore}</span>
    </div>
  );
}

function TierBadge({ tier, totalScore }) {
  const tierConfig = {
    'Tier 1': { bg: 'bg-[#10b981]', text: 'text-[#09090b]' },
    'Tier 2': { bg: 'bg-[#3b82f6]', text: 'text-white' },
    'Tier 3': { bg: 'bg-[#71717a]', text: 'text-white' },
  };
  const config = tierConfig[tier] || tierConfig['Tier 3'];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 }}
      className="flex flex-col items-center gap-3"
    >
      <span className={`${config.bg} ${config.text} text-[11px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full`}>
        {tier}
      </span>
      <span className="text-5xl font-semibold text-white tracking-tight">
        {totalScore}<span className="text-2xl text-[#52525b]">/50</span>
      </span>
      <span className="text-sm text-[#71717a]">
        {tier === 'Tier 1' ? '5% Corporate Tax' : tier === 'Tier 2' ? '10% Corporate Tax' : '15% Corporate Tax'}
      </span>
    </motion.div>
  );
}

export default function NiaScorecardDisplay({ scorecard }) {
  if (!scorecard) return null;

  const pillars = Object.entries(PILLAR_CONFIG).map(([key, config]) => ({
    key, ...config,
    score: scorecard[key]?.score || 0,
    rationale: scorecard[key]?.rationale || '',
  }));

  return (
    <div className="space-y-12">
      <div className="flex flex-col items-center gap-3">
        <TierBadge tier={scorecard.tier} totalScore={scorecard.total_score} />
        {scorecard.score_gap && scorecard.score_gap !== 'Already Tier 1' && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="text-[13px] text-[#52525b] mt-2">
            Gap to next tier: {scorecard.score_gap}
          </motion.p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {pillars.map((pillar, i) => {
          const Icon = pillar.icon;
          return (
            <motion.div key={pillar.key}
              initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }}
              className="glass-card p-6 flex flex-col items-center text-center"
            >
              <div className="p-2.5 rounded-xl mb-4" style={{ backgroundColor: `${pillar.color}15`, color: pillar.color }}>
                <Icon size={22} strokeWidth={2} />
              </div>
              <ScoreRing score={pillar.score} color={pillar.color} delay={200 + i * 100} />
              <h3 className="text-[13px] font-medium text-white mt-4 mb-2">{pillar.label}</h3>
              <p className="text-[12px] text-[#71717a] leading-relaxed">{pillar.rationale}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
