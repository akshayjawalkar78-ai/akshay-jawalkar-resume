import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Radio } from 'lucide-react';

const navItems = [
  { label: 'CAPABILITIES', href: '#skills' },
  { label: 'MISSION LOG', href: '#experience' },
  { label: 'VOLUNTEER BAY', href: '#volunteer' },
  { label: 'HONORS', href: '#accomplishments' },
  { label: 'RESUME', href: '#resume' },
  { label: 'COMMS LINK', href: '#contact' }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState('#skills');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const scrollPos = window.scrollY + 200;
      for (const item of navItems) {
        const el = document.querySelector(item.href);
        if (el && el.offsetTop <= scrollPos && el.offsetTop + el.offsetHeight > scrollPos) {
          setActiveItem(item.href);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100, x: '-50%', opacity: 0 }}
        animate={{ y: 0, x: '-50%', opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        className="fixed top-12 md:top-8 left-1/2 -translate-x-1/2 z-[60] w-[92%] max-w-5xl transition-all duration-300"
      >
        <div className={`px-6 py-3 md:px-8 md:py-2.5 flex items-center justify-between border transition-all duration-300 rounded-xl bg-space-950/70 backdrop-blur-md ${
          scrolled 
            ? 'border-accent-blue/30 shadow-[0_4px_30px_rgba(0,e5,ff,0.1)]' 
            : 'border-white/5'
        }`}>
          <a href="#" className="font-mono font-bold text-sm tracking-widest text-white hover:text-accent-teal transition-colors flex items-center gap-2" style={{ cursor: 'none' }}>
            <Radio size={12} className="text-accent-teal animate-pulse" />
            <span>AKSHAY JAWALKAR</span>
          </a>

          <nav className="hidden md:flex items-center gap-8 font-mono">
            {navItems.map((item) => {
              const isActive = activeItem === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`text-[10px] tracking-[0.2em] font-semibold transition-all duration-300 relative py-2.5 group uppercase ${
                    isActive ? 'text-accent-teal text-glow-cyan' : 'text-gray-500 hover:text-white'
                  }`}
                  style={{ cursor: 'none' }}
                >
                  {item.label}
                  {isActive && (
                    <motion.span 
                      layoutId="navActiveLine" 
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-accent-blue to-accent-teal shadow-[0_0_8px_#00ffd2]"
                    />
                  )}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-4 text-[9px] font-mono text-gray-500 border-l border-white/10 pl-6 pr-2">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-accent-teal rounded-full animate-ping" />
              ONLINE
            </span>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-1.5 text-gray-400 hover:text-white border border-white/5 rounded-lg bg-space-900/40"
            aria-label="Toggle menu"
            style={{ cursor: 'none' }}
          >
            {isOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="absolute top-16 left-0 right-0 hud-panel p-6 bg-space-950/95 backdrop-blur-xl border border-accent-blue/20 rounded-xl md:hidden mt-2"
            >
              <nav className="flex flex-col gap-4 font-mono">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-[10px] tracking-[0.2em] text-gray-400 hover:text-accent-teal py-2.5 border-b border-white/5 last:border-0 transition-colors font-medium flex items-center justify-between"
                    style={{ cursor: 'none' }}
                  >
                    <span>{item.label}</span>
                    <span className="text-[8px] text-gray-600">SECTION</span>
                  </a>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
};

export default Navbar;

