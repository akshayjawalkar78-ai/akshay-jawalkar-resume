import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Experience', href: '#experience' },
  { label: 'Volunteering', href: '#volunteer' },
  { label: 'Honors & Awards', href: '#accomplishments' },
  { label: 'Contact', href: '#contact' }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Floating Navbar Container */}
      <motion.header
        initial={{ y: -100, x: '-50%', opacity: 0 }}
        animate={{ y: 0, x: '-50%', opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-[60] w-[90%] max-w-4xl transition-all duration-300 ${
          scrolled 
            ? 'shadow-[0_8px_30px_rgba(0,0,0,0.5)]' 
            : ''
        }`}
      >
        <div className="px-6 py-4 md:px-8 md:py-3 flex items-center justify-between bg-space-900/30 backdrop-blur-xl border border-white/10 rounded-full">
          {/* Logo / Initials */}
          <a href="#" className="font-display font-bold text-lg tracking-wider text-white hover:text-accent-teal transition-colors flex items-center gap-2">
            AJ<span className="w-1.5 h-1.5 rounded-full bg-accent-teal"></span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-xs uppercase tracking-widest text-gray-400 hover:text-white font-medium transition-colors relative py-1.5 group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gradient-to-r from-accent-teal to-accent-blue transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-1 text-gray-400 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Dropdown Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="absolute top-16 left-0 right-0 glass-panel p-6 bg-space-900/90 backdrop-blur-xl border border-white/10 rounded-3xl md:hidden mt-2"
            >
              <nav className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-sm uppercase tracking-widest text-gray-300 hover:text-accent-teal py-2 border-b border-white/5 last:border-0 transition-colors font-medium"
                  >
                    {item.label}
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
