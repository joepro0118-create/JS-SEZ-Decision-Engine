import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Navbar() {
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 h-16 z-50 bg-[var(--color-nexus-bg)]/80 backdrop-blur-md border-b border-[var(--color-nexus-border)]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-full flex items-center justify-between">

        {/* Logo Area */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-[var(--color-nexus-primary-dim)] flex items-center justify-center border border-[var(--color-nexus-primary)]/20 group-hover:border-[var(--color-nexus-primary)]/40 transition-colors shadow-[0_0_15px_rgba(59,130,246,0.1)]">
            <span className="text-[var(--color-nexus-primary)] font-bold tracking-tighter text-sm">NX</span>
          </div>
          <span className="font-semibold text-[var(--color-nexus-text-header)] tracking-tight">NEXUS</span>
        </Link>

      </div>
    </header>
  );
}