import React, { useState } from 'react';
import { Plus, X, ChevronDown, Activity, ShieldCheck, Building2, Users, Wallet, Target, Eye, Cpu } from 'lucide-react';
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

  const tabs = ['Financials', 'Strategy Brief', 'Vision Data'];

  return (
    <div className="w-full max-w-5xl mx-auto min-h-[calc(100vh-6rem)] flex items-center justify-center py-12 px-4">
      {/* Premium Glass Container */}
      <div className="w-full relative rounded-[2rem] bg-zinc-950/40 backdrop-blur-3xl border border-white/10 shadow-[0_0_80px_-20px_rgba(59,130,246,0.15)] p-8 md:p-14 overflow-hidden">

        {/* Ambient Background Effects */}
        <div className="absolute top-0 inset-x-0 h-px w-full bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />

        {/* Header Section */}
        <div className="mb-14 text-center relative z-10 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-300">Secure Sandbox Environment</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400 tracking-tight">
            Data Ingestion Engine
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="relative z-10">
          {/* Segmented Control Tabs */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center gap-1 p-1.5 rounded-2xl bg-zinc-900/50 border border-white/5 backdrop-blur-lg">
              {tabs.map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`relative px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors duration-300 ${isActive ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
                      }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-pill"
                        className="absolute inset-0 bg-blue-600/20 border border-blue-500/30 rounded-xl shadow-[0_0_15px_rgba(37,99,235,0.2)]"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{tab}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="min-h-[400px]">
            <AnimatePresence mode="wait">
              {activeTab === 'Financials' && (
                <motion.div
                  key="financials"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column: Corporate & Financials */}
                    <div className="space-y-8">
                      <SectionCard icon={Building2} title="Corporate Profile" color="blue">
                        <div className="space-y-5">
                          <FormInput label="Company Name" name="companyName" value={formData.companyName} onChange={handleInputChange} />
                          <FormInput label="Industry" name="industry" value={formData.industry} onChange={handleInputChange} />
                        </div>
                      </SectionCard>

                      <SectionCard icon={Wallet} title="Financial & Energy" color="emerald">
                        <div className="space-y-5">
                          <div className="grid grid-cols-2 gap-4">
                            <FormInput label="Revenue (SGD)" name="revenue" type="number" value={formData.revenue} onChange={handleInputChange} />
                            <FormInput label="R&D Spend (%)" name="rdSpend" type="number" value={formData.rdSpend} onChange={handleInputChange} />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Energy Profile</label>
                            <div className="relative group">
                              <select
                                name="energyUsage"
                                value={formData.energyUsage}
                                onChange={handleInputChange}
                                className="w-full bg-zinc-900/50 border border-white/5 hover:border-white/10 text-zinc-200 text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all appearance-none"
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

                    {/* Right Column: Workforce */}
                    <div className="h-full">
                      <SectionCard icon={Users} title="Workforce Allocation" color="indigo" className="h-full flex flex-col">
                        <div className="flex justify-end mb-4">
                          <button
                            type="button"
                            onClick={addRole}
                            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 transition-all hover:bg-indigo-500/20"
                          >
                            <Plus className="w-3.5 h-3.5" /> Add Role
                          </button>
                        </div>

                        <div className="space-y-3 flex-1">
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
                              className="grid grid-cols-[2fr_1fr_1fr_32px] gap-3 items-center bg-zinc-900/30 border border-white/5 hover:border-indigo-500/30 rounded-xl p-2 transition-all group"
                            >
                              <input
                                type="text"
                                value={role.title}
                                placeholder="Lead Engineer"
                                onChange={(e) => handleRoleChange(role.id, 'title', e.target.value)}
                                className="w-full bg-transparent border-none text-zinc-200 text-sm px-2 py-1.5 focus:outline-none focus:ring-0 placeholder:text-zinc-700"
                              />
                              <input
                                type="number"
                                value={role.salary}
                                placeholder="0"
                                onChange={(e) => handleRoleChange(role.id, 'salary', e.target.value)}
                                className="w-full bg-transparent border-none text-zinc-300 text-sm px-2 py-1.5 focus:outline-none focus:ring-0 placeholder:text-zinc-700 font-mono"
                              />
                              <input
                                type="number"
                                value={role.count}
                                placeholder="1"
                                onChange={(e) => handleRoleChange(role.id, 'count', e.target.value)}
                                className="w-full bg-transparent border-none text-zinc-300 text-sm px-2 py-1.5 focus:outline-none focus:ring-0 placeholder:text-zinc-700 font-mono"
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

              {/* Other tabs remain structurally similar but upgraded with the new textarea design */}
              {activeTab === 'Strategy Brief' && (
                <motion.div key="strategy" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  <SectionCard icon={Target} title="Executive Strategy Brief" color="blue">
                    <p className="text-sm text-zinc-400 mb-6 -mt-2">Provide unstructured context to guide the AI's strategic recommendations.</p>
                    <textarea
                      name="strategy"
                      value={formData.strategy}
                      onChange={handleInputChange}
                      className="w-full bg-zinc-900/50 border border-white/5 hover:border-white/10 text-zinc-200 text-sm rounded-xl px-5 py-4 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all h-72 resize-none leading-relaxed"
                    />
                  </SectionCard>
                </motion.div>
              )}

              {activeTab === 'Vision Data' && (
                <motion.div key="vision" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  <SectionCard icon={Eye} title="Computer Vision Logs" color="emerald">
                    <div className="absolute top-6 right-6 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live Stream
                    </div>
                    <textarea
                      name="vision"
                      value={formData.vision}
                      onChange={handleInputChange}
                      className="w-full bg-black/40 border border-white/5 hover:border-emerald-500/30 text-emerald-400 font-mono text-sm rounded-xl px-5 py-4 focus:outline-none focus:border-emerald-500/50 transition-all h-72 resize-none leading-relaxed"
                    />
                  </SectionCard>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Master CTA Button */}
          <div className="pt-12 flex justify-center mt-8 border-t border-white/5">
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full max-w-md h-16 rounded-2xl flex items-center justify-center overflow-hidden transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {/* Dynamic Animated Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-[length:200%_auto] animate-[gradientShift_3s_linear_infinite]" />

              {/* Glass overlay for depth */}
              <div className="absolute inset-[1px] bg-zinc-950/40 rounded-2xl group-hover:bg-transparent transition-colors duration-500" />

              <div className="relative flex items-center justify-center gap-3">
                <Activity className={`w-5 h-5 text-blue-300 group-hover:text-white transition-colors ${isLoading ? 'animate-spin' : ''}`} />
                <span className="font-bold text-white tracking-wide">
                  {isLoading ? 'Synthesizing Data Matrix...' : 'Execute Analysis'}
                </span>
              </div>
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
      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-blue-400">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full bg-zinc-900/50 border border-white/5 group-hover:border-white/10 text-zinc-200 text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-zinc-600"
      />
    </div>
  );
}