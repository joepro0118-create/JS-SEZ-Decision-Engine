import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

function AnimatedNumber({ value, duration = 1.5, delay = 0 }) {
  const [display, setDisplay] = useState(0);
  const numericValue = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.-]/g, '')) : value;

  useEffect(() => {
    if (isNaN(numericValue)) { setDisplay(value); return; }
    const timer = setTimeout(() => {
      let start = 0;
      const end = numericValue;
      const steps = 40;
      const increment = end / steps;
      let step = 0;
      const interval = setInterval(() => {
        step++;
        start += increment;
        if (step >= steps) { setDisplay(end); clearInterval(interval); }
        else { setDisplay(Math.round(start)); }
      }, duration * 1000 / steps);
      return () => clearInterval(interval);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [numericValue, duration, delay]);

  const formatted = typeof display === 'number' && !isNaN(display) ? display.toLocaleString() : display;
  return <span>{formatted}</span>;
}

function MetricRow({ label, value, type = 'neutral' }) {
  const colors = {
    neutral: 'text-[#a1a1aa]',
    danger: 'text-[#ef4444]/80',
    success: 'text-[#10b981] font-semibold',
    warning: 'text-[#f59e0b]/80',
  };
  return (
    <div className="flex justify-between items-center py-3.5 border-b border-white/[0.04] last:border-0">
      <span className="text-[13px] text-[#71717a]">{label}</span>
      <span className={`text-[13px] ${colors[type]}`}>{value}</span>
    </div>
  );
}

export default function ImpactTable({ impact }) {
  if (!impact) return null;
  const { before, after } = impact;

  return (
    <div className="space-y-8">
      {/* Big Number */}
      {after?.annual_tax_savings_rm && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-12 px-8 glass-card"
        >
          <span className="text-[11px] font-medium text-[#52525b] uppercase tracking-widest mb-4">
            Projected Annual Tax Savings
          </span>
          <div className="text-5xl sm:text-6xl font-semibold text-[#10b981] tracking-tight">
            RM <AnimatedNumber value={after.annual_tax_savings_rm} delay={0.3} />
          </div>
          <p className="text-[13px] text-[#52525b] mt-4">
            Based on {after.corporate_tax_rate} JS-SEZ rate vs standard 24%
          </p>
        </motion.div>
      )}

      {/* Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}
          className="glass-card p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-[#ef4444]/60" />
            <h3 className="text-[15px] font-semibold text-white tracking-tight">Current State</h3>
          </div>
          <MetricRow label="Corporate Tax Rate" value={before?.corporate_tax_rate || '24%'} type="danger" />
          <MetricRow label="Annual Tax Burden" value={before?.annual_tax_burden_rm ? `RM ${before.annual_tax_burden_rm.toLocaleString()}` : 'N/A'} type="danger" />
          <MetricRow label="ESG Compliance" value={before?.esg_compliance || 'Low'} type="warning" />
          <MetricRow label="Carbon Tax Exposure" value={before?.carbon_tax_exposure_rm ? `RM ${before.carbon_tax_exposure_rm.toLocaleString()}` : 'N/A'} type="danger" />
          <MetricRow label="High-Value Jobs (>RM10k)" value={before?.high_value_jobs || 'N/A'} type="neutral" />
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
          className="glass-card p-8 border-[#10b981]/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-[#10b981]" />
            <h3 className="text-[15px] font-semibold text-white tracking-tight">JS-SEZ Optimized</h3>
            <span className="text-[10px] bg-[#10b981]/10 text-[#10b981] px-2.5 py-0.5 rounded-full font-medium">AI Recommended</span>
          </div>
          <MetricRow label="Corporate Tax Rate" value={after?.corporate_tax_rate || '5%'} type="success" />
          <MetricRow label="Annual Tax Savings" value={after?.annual_tax_savings_rm ? `RM ${after.annual_tax_savings_rm.toLocaleString()}` : 'N/A'} type="success" />
          <MetricRow label="ESG Compliance" value={after?.esg_compliance || 'High'} type="success" />
          <MetricRow label="Carbon Tax Exposure" value={after?.carbon_tax_exposure_rm ? `RM ${after.carbon_tax_exposure_rm.toLocaleString()}` : '0'} type="neutral" />
          <MetricRow label="High-Value Jobs (>RM10k)" value={after?.high_value_jobs || 'N/A'} type="success" />
        </motion.div>
      </div>
    </div>
  );
}
