import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { to: '/', label: 'Analyze' },
    { to: '/results', label: 'Results' },
    { to: '/about', label: 'About' },
    { to: '/chat', label: 'AI Chat' },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-[#09090b]/80 backdrop-blur-xl border-b border-white/[0.06] transition-all duration-300"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
              <span className="text-[#09090b] font-bold text-sm tracking-tight">N</span>
            </div>
            <span className="text-[15px] font-semibold text-white tracking-tight">
              NEXUS
            </span>
            <span className="text-[10px] font-medium bg-white/[0.06] text-[#a1a1aa] px-2 py-0.5 rounded-full border border-white/[0.08]">
              JS-SEZ
            </span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-[14px] font-medium transition-colors ${
                    isActive
                      ? 'text-white'
                      : 'text-[#71717a] hover:text-[#a1a1aa]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
