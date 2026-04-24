import React, { useState } from 'react';
import { Plus, X, ChevronDown, Activity, ShieldCheck, Building2, Users, Wallet, Target, Eye, Cpu, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DataInputPanel({ onAnalyze, isLoading }) {
  const [activeTab, setActiveTab] = useState('Financials');

  const [formData, setFormData] = useState({
    companyName: 'Apex Semiconductor SG',
    industry: 'Advanced AI Chipsets',
    revenue: '15000000',
    rdSpend: '22',
    energyUsage: 'High (Data intensive)',
    strategy: `Apex aims to dominate the SE-Asia AI market. We need a manufacturing base close to our Singapore R&D hub but are struggling with Singapore's land costs and power quotas. We want to hire 60+ local Malaysian graduates but need to ensure our carbon footprint stays low to avoid the 2026 Carbon Tax. We are undecided between the Kulai Cluster and Sedenak.`,
    vision: `OpenCV Analysis of Warehouse Floor Plan: Detected 72% Automation Density. High integration of robotic sorting arms. Complies with 'Advanced Manufacturing' complexity requirements.`,
  });

  const [hrRoles, setHrRoles] = useState([
    { id: 1, title: 'Lead Architect', salary: '22000', count: '4' },
    { id: 2, title: 'Assembly Staff', salary: '3500', count: '40' },
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addRole = () => setHrRoles([...hrRoles, { id: Date.now(), title: '', salary: '', count: '1' }]);
  const removeRole = (id) => setHrRoles(hrRoles.filter((role) => role.id !== id));
  const handleRoleChange = (id, field, value) => {
    setHrRoles(hrRoles.map((role) => (role.id === id ? { ...role, [field]: value } : role)));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onAnalyze) {
      const financials = {
        company_name: formData.companyName,
        industry: formData.industry,
        current_revenue_sgd: Number(formData.revenue),
        r_and_d_spend_pct: `${formData.rdSpend}%`,
        hr_data: hrRoles.map((r) => ({ role: r.title, salary_myr: Number(r.salary), count: Number(r.count) })),
        energy_usage: formData.energyUsage,
      };
      onAnalyze({ financials, strategy: formData.strategy, visionInsights: formData.vision });
    }
  };

  const tabs = [
    { name: 'Financials', icon: Building2 },
    { name: 'Strategy Brief', icon: Target },
    { name: 'Vision Data', icon: Eye },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto min-h-[calc(100vh-6rem)] flex items-center justify-center py-12 px-4">
      {/* Premium Glass Container */}
      <div className="dip-container w-full relative">
        {/* Top edge glow line */}
        <div className="dip-top-glow" />

        {/* Ambient orbs */}
        <div className="dip-orb dip-orb--blue" />
        <div className="dip-orb dip-orb--indigo" />

        {/* Header */}
        <div className="mb-12 text-center relative z-10 flex flex-col items-center">
          <div className="dip-badge">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>Secure Sandbox Environment</span>
          </div>
          <h2 className="dip-title">
            Data Ingestion Engine
          </h2>
          <p className="text-sm text-zinc-500 mt-3 max-w-md">
            Configure your company profile and strategic parameters for AI-powered analysis.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="relative z-10">
          {/* Tab Bar */}
          <div className="flex justify-center mb-10">
            <div className="dip-tab-bar">
              {tabs.map(({ name: tab, icon: TabIcon }) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`dip-tab ${isActive ? 'dip-tab--active' : ''}`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-pill"
                        className="dip-tab-pill"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    <TabIcon className={`w-4 h-4 relative z-10 transition-colors duration-200 ${isActive ? 'text-white' : 'text-zinc-600'}`} />
                    <span className="relative z-10">{tab}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="min-h-[380px]">
            <AnimatePresence mode="wait">
              {activeTab === 'Financials' && (
                <motion.div
                  key="financials"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-6">
                      <SectionCard icon={Building2} title="Corporate Profile" color="blue">
                        <div className="space-y-4">
                          <FormInput label="Company Name" name="companyName" value={formData.companyName} onChange={handleInputChange} />
                          <FormInput label="Industry" name="industry" value={formData.industry} onChange={handleInputChange} />
                        </div>
                      </SectionCard>

                      <SectionCard icon={Wallet} title="Financial & Energy" color="emerald">
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <FormInput label="Revenue (SGD)" name="revenue" type="number" value={formData.revenue} onChange={handleInputChange} />
                            <FormInput label="R&D Spend (%)" name="rdSpend" type="number" value={formData.rdSpend} onChange={handleInputChange} />
                          </div>
                          <div className="space-y-2">
                            <label className="dip-label">Energy Profile</label>
                            <div className="relative group">
                              <select
                                name="energyUsage"
                                value={formData.energyUsage}
                                onChange={handleInputChange}
                                className="dip-select"
                              >
                                <option value="Low (Office standard)">Low (Office standard)</option>
                                <option value="Medium (Light manufacturing)">Medium (Light manufacturing)</option>
                                <option value="High (Data intensive)">High (Data intensive)</option>
                              </select>
                              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                            </div>
                          </div>
                        </div>
                      </SectionCard>
                    </div>

                    {/* Right Column */}
                    <div className="h-full">
                      <SectionCard icon={Users} title="Workforce Allocation" color="indigo" className="h-full flex flex-col">
                        <div className="flex justify-end mb-4">
                          <button
                            type="button"
                            onClick={addRole}
                            className="dip-add-role-btn"
                          >
                            <Plus className="w-3.5 h-3.5" /> Add Role
                          </button>
                        </div>

                        <div className="space-y-2 flex-1">
                          <div className="grid grid-cols-[2fr_1fr_1fr_32px] gap-3 px-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                            <div>Role</div>
                            <div>Salary (RM)</div>
                            <div>Qty</div>
                            <div />
                          </div>

                          {hrRoles.map((role) => (
                            <motion.div
                              layout
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              key={role.id}
                              className="dip-role-row group"
                            >
                              <input
                                type="text"
                                value={role.title}
                                placeholder="Lead Engineer"
                                onChange={(e) => handleRoleChange(role.id, 'title', e.target.value)}
                                className="dip-role-input"
                              />
                              <input
                                type="number"
                                value={role.salary}
                                placeholder="0"
                                onChange={(e) => handleRoleChange(role.id, 'salary', e.target.value)}
                                className="dip-role-input font-mono"
                              />
                              <input
                                type="number"
                                value={role.count}
                                placeholder="1"
                                onChange={(e) => handleRoleChange(role.id, 'count', e.target.value)}
                                className="dip-role-input font-mono"
                              />
                              <button
                                type="button"
                                onClick={() => removeRole(role.id)}
                                className="w-8 h-8 flex items-center justify-center text-zinc-600 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </motion.div>
                          ))}
                        </div>
                      </SectionCard>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'Strategy Brief' && (
                <motion.div key="strategy" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
                  <SectionCard icon={Target} title="Executive Strategy Brief" color="blue">
                    <p className="text-sm text-zinc-500 mb-5 -mt-1">Provide unstructured context to guide the AI's strategic recommendations.</p>
                    <textarea
                      name="strategy"
                      value={formData.strategy}
                      onChange={handleInputChange}
                      className="dip-textarea"
                    />
                  </SectionCard>
                </motion.div>
              )}

              {activeTab === 'Vision Data' && (
                <motion.div key="vision" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
                  <SectionCard icon={Eye} title="Computer Vision Logs" color="emerald">
                    <div className="absolute top-6 right-6 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live Stream
                    </div>
                    <textarea
                      name="vision"
                      value={formData.vision}
                      onChange={handleInputChange}
                      className="dip-textarea dip-textarea--vision"
                    />
                  </SectionCard>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Execute Analysis Button */}
          <div className="pt-10 flex justify-center mt-6">
            <button
              type="submit"
              disabled={isLoading}
              className="dip-execute-btn group"
            >
              <span className="dip-execute-btn__bg" />
              <span className="dip-execute-btn__shimmer" />
              <span className="dip-execute-btn__content">
                <Sparkles className={`w-5 h-5 transition-all duration-300 ${isLoading ? 'animate-spin' : 'group-hover:scale-110'}`} />
                <span>{isLoading ? 'Synthesizing Data Matrix...' : 'Execute Analysis'}</span>
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Reusable micro-components for ultra-clean code
function SectionCard({ title, icon: Icon, color, children, className = '' }) {
  const colorStyles = {
    blue: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    indigo: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
  };

  return (
    <div className={`relative bg-zinc-900/20 border border-white/5 rounded-2xl p-6 backdrop-blur-sm ${className}`}>
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-2 rounded-xl border ${colorStyles[color]}`}>
          <Icon className="w-4 h-4" />
        </div>
        <h3 className="text-lg font-semibold text-zinc-100">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function FormInput({ label, name, value, onChange, type = 'text' }) {
  return (
    <div className="space-y-2 group">
      <label className="dip-label">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="dip-input"
      />
    </div>
  );
}