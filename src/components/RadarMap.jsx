import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const radarSections = [
  { id: 'hero', label: 'HOME', angle: 0, radius: 20 },
  { id: 'skills', label: 'CAPABILITIES', angle: 60, radius: 32 },
  { id: 'experience', label: 'EXPERIENCE', angle: 135, radius: 44 },
  { id: 'volunteer', label: 'VOLUNTEER', angle: 210, radius: 56 },
  { id: 'accomplishments', label: 'AWARDS', angle: 285, radius: 68 },
  { id: 'contact', label: 'CONTACT', angle: 340, radius: 80 }
];

const RadarMap = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px',
      threshold: 0.1
    };

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    radarSections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end">
      {/* Expanded Label HUD Panel */}
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="hud-panel p-3 border-accent-blue/20 bg-space-950/90 backdrop-blur-md mb-2 w-48 text-[10px] font-mono leading-relaxed"
        >
          <div className="text-accent-blue border-b border-white/10 pb-1.5 mb-1.5 uppercase font-bold tracking-widest flex justify-between">
            <span>SECTION MAP</span>
            <span className="animate-pulse">READY</span>
          </div>
          <div className="space-y-1 text-gray-400">
            {radarSections.map((sec) => (
              <button
                key={sec.id}
                onClick={() => scrollToSection(sec.id)}
                className={`w-full text-left hover:text-white flex items-center justify-between transition-colors ${
                  activeSection === sec.id ? 'text-accent-teal font-bold' : ''
                }`}
              >
                <span>{sec.label}</span>
                <span>{activeSection === sec.id ? '◄ SELECTED' : 'VIEW'}</span>
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Radar Console Circle */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="hud-panel p-2.5 rounded-full border-accent-blue/30 hover:border-accent-teal/60 bg-space-950/80 backdrop-blur-md transition-all duration-300 relative group flex items-center justify-center overflow-hidden w-20 h-20 shadow-[0_0_15px_rgba(0,229,255,0.15)] hover:scale-105"
        style={{ cursor: 'none' }}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full relative z-10">
          {/* Concentric Scanner Rings */}
          <circle cx="100" cy="100" r="25" fill="none" stroke="rgba(0, 229, 255, 0.1)" strokeWidth="1" />
          <circle cx="100" cy="100" r="50" fill="none" stroke="rgba(0, 229, 255, 0.1)" strokeWidth="1" />
          <circle cx="100" cy="100" r="75" fill="none" stroke="rgba(0, 229, 255, 0.1)" strokeWidth="1" />
          <circle cx="100" cy="100" r="95" fill="none" stroke="rgba(0, 229, 255, 0.2)" strokeWidth="1" />

          {/* Crosshairs */}
          <line x1="100" y1="5" x2="100" y2="195" stroke="rgba(0, 229, 255, 0.05)" strokeWidth="1" />
          <line x1="5" y1="100" x2="195" y2="100" stroke="rgba(0, 229, 255, 0.05)" strokeWidth="1" />

          {/* Rotating sonar sweep line */}
          <g transform="translate(100, 100)">
            <motion.line
              x1="0"
              y1="0"
              x2="95"
              y2="0"
              stroke="rgba(0, 229, 255, 0.4)"
              strokeWidth="1.5"
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />
            {/* Soft gradient tail for sweep */}
            <motion.path
              d="M0 0 L 90 0 A 90 90 0 0 1 80 40 Z"
              fill="rgba(0, 229, 255, 0.04)"
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />
          </g>

          {/* Blips / Nodes representing sections */}
          {radarSections.map((sec) => {
            const radAngle = (sec.angle * Math.PI) / 180;
            const x = 100 + sec.radius * Math.cos(radAngle);
            const y = 100 + sec.radius * Math.sin(radAngle);
            const isActive = activeSection === sec.id;

            return (
              <g key={sec.id}>
                {/* Orbital dots */}
                <circle
                  cx={x}
                  cy={y}
                  r={isActive ? 6 : 4}
                  fill={isActive ? '#00ffd2' : 'rgba(0, 229, 255, 0.4)'}
                  className="transition-all duration-300"
                />
                
                {/* Blip glow effect */}
                {isActive && (
                  <circle
                    cx={x}
                    cy={y}
                    r={12}
                    fill="none"
                    stroke="#00ffd2"
                    strokeWidth="1"
                    className="animate-ping"
                    style={{ transformOrigin: `${x}px ${y}px` }}
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* Diagnostic screen glitch scanline overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-blue/5 to-transparent pointer-events-none animate-pulse" />
      </button>
    </div>
  );
};

export default RadarMap;
