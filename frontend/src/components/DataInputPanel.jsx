import { useState } from 'react';
import { motion } from 'framer-motion';

const DEFAULT_FINANCIALS = {
  company_name: "Apex Semiconductor SG",
  industry: "Advanced AI Chipsets",
  current_revenue_sgd: 15000000,
  r_and_d_spend_pct: "22%",
  hr_data: [
    { role: "Lead Architect", salary_myr: 22000, count: 4 },
    { role: "Assembly Staff", salary_myr: 3500, count: 40 }
  ],
  energy_usage: "High (Data intensive)"
};

const DEFAULT_STRATEGY = `Apex aims to dominate the SE-Asia AI market. We need a manufacturing base close to our Singapore R&D hub but are struggling with Singapore's land costs and power quotas. We want to hire 60+ local Malaysian graduates but need to ensure our carbon footprint stays low to avoid the 2026 Carbon Tax. We are undecided between the Kulai Cluster and Sedenak.`;

const DEFAULT_VISION = `OpenCV Analysis of Warehouse Floor Plan: Detected 72% Automation Density. High integration of robotic sorting arms. Complies with 'Advanced Manufacturing' complexity requirements.`;

const TABS = [
  { id: 'financials', label: 'Financials' },
  { id: 'strategy', label: 'Strategy Brief' },
  { id: 'vision', label: 'Vision Data' },
];

export default function DataInputPanel({ onAnalyze, isLoading }) {
  const [activeTab, setActiveTab] = useState('financials');
  const [companyName, setCompanyName] = useState(DEFAULT_FINANCIALS.company_name);
  const [industry, setIndustry] = useState(DEFAULT_FINANCIALS.industry);
  const [revenue, setRevenue] = useState(DEFAULT_FINANCIALS.current_revenue_sgd);
  const [rdSpend, setRdSpend] = useState('22');
  const [energyUsage, setEnergyUsage] = useState(DEFAULT_FINANCIALS.energy_usage);
  const [hrData, setHrData] = useState(DEFAULT_FINANCIALS.hr_data);
  const [strategy, setStrategy] = useState(DEFAULT_STRATEGY);
  const [vision, setVision] = useState(DEFAULT_VISION);

  const handleAddRole = () => {
    setHrData([...hrData, { role: '', salary_myr: 0, count: 0 }]);
  };

  const handleRemoveRole = (index) => {
    setHrData(hrData.filter((_, i) => i !== index));
  };

  const handleHrChange = (index, field, value) => {
    const updated = [...hrData];
    updated[index] = { ...updated[index], [field]: field === 'role' ? value : Number(value) };
    setHrData(updated);
  };

  const handleSubmit = () => {
    const financials = {
      company_name: companyName,
      industry,
      current_revenue_sgd: Number(revenue),
      r_and_d_spend_pct: `${rdSpend}%`,
      hr_data: hrData,
      energy_usage: energyUsage,
    };
    onAnalyze({ financials, strategy, visionInsights: vision });
  };

  const inputClass = "w-full bg-[#09090b] border border-white/[0.08] rounded-xl px-4 py-3 text-[#fafafa] text-sm focus:outline-none focus:border-white/[0.2] transition-colors placeholder-[#52525b]";
  const labelClass = "block text-[13px] font-medium text-[#71717a] mb-2";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-card overflow-hidden"
    >
      {/* Header */}
      <div className="px-8 pt-8 pb-6">
        <h2 className="text-xl font-semibold text-white tracking-tight mb-1">
          Input Data Sources
        </h2>
        <p className="text-sm text-[#52525b]">Pre-filled with sample data. Edit or use as-is.</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/[0.06] px-8 gap-1">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 text-[13px] font-medium transition-all cursor-pointer rounded-t-lg ${
              activeTab === tab.id
                ? 'text-white border-b-2 border-white'
                : 'text-[#52525b] hover:text-[#a1a1aa]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-8">
        {activeTab === 'financials' && (
          <motion.div
            key="financials"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Company Name</label>
                <input className={inputClass} value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>Industry</label>
                <input className={inputClass} value={industry} onChange={(e) => setIndustry(e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>Revenue (SGD)</label>
                <input type="number" className={inputClass} value={revenue} onChange={(e) => setRevenue(e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>R&D Spend (%)</label>
                <input type="number" className={inputClass} value={rdSpend} onChange={(e) => setRdSpend(e.target.value)} />
              </div>
            </div>

            <div>
              <label className={labelClass}>Energy Usage</label>
              <select className={inputClass} value={energyUsage} onChange={(e) => setEnergyUsage(e.target.value)}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High (Data intensive)">High (Data intensive)</option>
                <option value="Very High (Manufacturing)">Very High (Manufacturing)</option>
              </select>
            </div>

            {/* HR Table */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className={labelClass + " mb-0"}>HR Data</label>
                <button
                  onClick={handleAddRole}
                  className="text-[13px] text-[#3b82f6] hover:text-[#60a5fa] font-medium cursor-pointer transition-colors"
                >
                  + Add Role
                </button>
              </div>
              <div className="space-y-2">
                <div className="grid grid-cols-[1fr_100px_80px_40px] gap-3 text-[11px] text-[#52525b] font-medium px-1 uppercase tracking-wider">
                  <span>Role</span><span>Salary (RM)</span><span>Count</span><span></span>
                </div>
                {hrData.map((row, i) => (
                  <div key={i} className="grid grid-cols-[1fr_100px_80px_40px] gap-3">
                    <input className={inputClass} value={row.role} onChange={(e) => handleHrChange(i, 'role', e.target.value)} />
                    <input type="number" className={inputClass} value={row.salary_myr} onChange={(e) => handleHrChange(i, 'salary_myr', e.target.value)} />
                    <input type="number" className={inputClass} value={row.count} onChange={(e) => handleHrChange(i, 'count', e.target.value)} />
                    <button onClick={() => handleRemoveRole(i)} className="text-[#ef4444]/60 hover:text-[#ef4444] text-lg cursor-pointer transition-colors">×</button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'strategy' && (
          <motion.div key="strategy" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <label className={labelClass}>Strategy Brief</label>
            <textarea
              className={inputClass + " h-48 resize-none leading-relaxed"}
              value={strategy}
              onChange={(e) => setStrategy(e.target.value)}
              placeholder="Describe your company's strategic goals..."
            />
          </motion.div>
        )}

        {activeTab === 'vision' && (
          <motion.div key="vision" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <label className={labelClass}>OpenCV / Vision Analysis Output</label>
            <textarea
              className={inputClass + " h-48 resize-none font-mono text-xs leading-relaxed"}
              value={vision}
              onChange={(e) => setVision(e.target.value)}
              placeholder="Paste OpenCV analysis output..."
            />
          </motion.div>
        )}
      </div>

      {/* Submit */}
      <div className="px-8 pb-8">
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full py-4 rounded-xl bg-white text-[#09090b] font-semibold text-[15px] hover:bg-[#e4e4e7] transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          {isLoading ? 'Analyzing...' : 'Run NEXUS Analysis'}
        </motion.button>
      </div>
    </motion.div>
  );
}
