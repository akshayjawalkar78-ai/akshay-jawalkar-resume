import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Radio, Activity, Compass, ShieldAlert } from 'lucide-react';
import HolographicPlanet from './HolographicPlanet';

const roles = [
  'QUANTITATIVE ANALYST',
  'DECA COMPETITOR',
  'SCALABLE SOFTWARE ENGINEER',
  'CLINICAL RESEARCHER',
  'YOUTH OPERATOR',
  'FOUNDER & DEVELOPER'
];

const Hero = () => {
  const [currentRoleIdx, setCurrentRoleIdx] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const role = roles[currentRoleIdx];
    
    // Typing speed configurations
    const typeSpeed = isDeleting ? 40 : 80;
    
    const handleType = () => {
      if (!isDeleting) {
        // Typing characters
        setCurrentText(role.substring(0, currentText.length + 1));
        
        if (currentText.length === role.length) {
          // Finished typing, wait before backspacing
          timer = setTimeout(() => setIsDeleting(true), 2000);
          return;
        }
      } else {
        // Backspacing characters
        setCurrentText(role.substring(0, currentText.length - 1));
        
        if (currentText.length === 0) {
          // Finished deleting, go to next role
          setIsDeleting(false);
          setCurrentRoleIdx((prev) => (prev + 1) % roles.length);
          return;
        }
      }
      
      timer = setTimeout(handleType, typeSpeed);
    };

    timer = setTimeout(handleType, typeSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentRoleIdx]);

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden z-10 px-6 pt-24 md:pt-16 pb-12" id="hero">
      
      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center justify-between gap-12 flex-1">
        
        {/* Telemetry HUD details left side */}
        <motion.div 
          className="flex-1 text-left relative z-10"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
          }}
        >
          <motion.div
            variants={fadeUpVariant}
            className="flex items-center gap-2 border border-accent-blue/25 bg-accent-blue/5 py-1 px-3.5 rounded-full w-fit mb-6 text-xs font-mono text-accent-blue tracking-widest uppercase"
          >
            <Radio size={12} className="animate-pulse text-accent-teal" />
            <span>BRIDGE DECK STATUS: ACTIVE</span>
          </motion.div>
          
          <motion.h1
            variants={fadeUpVariant}
            className="font-mono text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 text-white leading-none text-glow-cyan"
          >
            AKSHAY <span className="text-accent-teal">JAWALKAR</span>
          </motion.h1>

          {/* Typing Roles Terminal */}
          <motion.div 
            variants={fadeUpVariant}
            className="h-8 mb-6 flex items-center font-mono text-sm md:text-base tracking-[0.2em] text-accent-blue/90"
          >
            <span className="text-gray-500 mr-2">&gt;&gt;</span>
            <span>{currentText}</span>
            <span className="w-2 h-4 bg-accent-blue ml-1 animate-pulse" />
          </motion.div>
          
          <motion.p
            variants={fadeUpVariant}
            className="text-gray-400 text-sm md:text-base max-w-xl font-light leading-relaxed mb-8 pr-4 border-l-2 border-accent-blue/10 pl-4"
          >
            Operating at the intersection of quantitative finance, clinical research, 
            and scalable software engineering. Orchestrating complex systems to extract 
            actionable insights from noise.
          </motion.p>

          <motion.div variants={fadeUpVariant} className="flex flex-wrap items-center gap-4">
            <a href="#experience" className="inline-flex items-center gap-3 text-white border border-accent-blue/30 hover:border-accent-teal hover:text-accent-teal px-6 py-3 rounded-xl transition-all duration-300 group bg-space-900/40 backdrop-blur-sm relative overflow-hidden" style={{ cursor: 'none' }}>
              <span className="absolute inset-0 bg-accent-blue/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="uppercase tracking-widest text-xs font-mono relative z-10">ENGAGE NAV DRIVES</span>
              <ArrowDown size={14} className="group-hover:translate-y-0.5 transition-transform relative z-10 text-accent-blue" />
            </a>
            <a href="#assistant" className="inline-flex items-center gap-2 text-gray-400 hover:text-white border border-white/5 hover:border-white/20 px-6 py-3 rounded-xl transition-all duration-300 font-mono text-xs uppercase" style={{ cursor: 'none' }}>
              <span>COMMS UNIT</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Space Wireframe Hologram Center/Right */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 flex justify-center items-center relative"
        >
          {/* Orbital glowing ring */}
          <div className="absolute w-[400px] h-[400px] border border-accent-blue/5 rounded-full animate-[spin_60s_linear_infinite]" />
          <HolographicPlanet />
        </motion.div>
      </div>

      {/* Futuristic spacecraft HUD readouts at bottom of hero */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="w-full max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-6 border-t border-accent-blue/10 relative z-10"
      >
        <div className="hud-panel p-4 bg-space-950/40 border-accent-blue/10 flex flex-col justify-center text-left">
          <span className="text-[9px] font-mono text-gray-500 tracking-widest uppercase">VOLUNTEER DOCK</span>
          <span className="font-mono text-lg font-bold text-accent-teal mt-1">150+ HOURS</span>
          <span className="text-[8px] font-mono text-gray-600 mt-0.5">BROOKS REHAB / MOSH</span>
        </div>
        <div className="hud-panel p-4 bg-space-950/40 border-accent-blue/10 flex flex-col justify-center text-left">
          <span className="text-[9px] font-mono text-gray-500 tracking-widest uppercase">HONORS SYSTEMS</span>
          <span className="font-mono text-lg font-bold text-accent-blue mt-1">SCDC & ICDC</span>
          <span className="text-[8px] font-mono text-gray-600 mt-0.5">DECA & HOSA COMPETITOR</span>
        </div>
        <div className="hud-panel p-4 bg-space-950/40 border-accent-blue/10 flex flex-col justify-center text-left">
          <span className="text-[9px] font-mono text-gray-500 tracking-widest uppercase">PORTFOLIO WEIGHT</span>
          <span className="font-mono text-lg font-bold text-accent-purple mt-1">$15,500+</span>
          <span className="text-[8px] font-mono text-gray-600 mt-0.5">LIVE CAPITAL MANAGEMENT</span>
        </div>
        <div className="hud-panel p-4 bg-space-950/40 border-accent-blue/10 flex flex-col justify-center text-left">
          <span className="text-[9px] font-mono text-gray-500 tracking-widest uppercase">FLIGHT COORDS</span>
          <span className="font-mono text-lg font-bold text-white mt-1">JACKSONVILLE, FL</span>
          <span className="text-[8px] font-mono text-gray-600 mt-0.5">STANTON COLLEGE PREP</span>
        </div>
      </motion.div>

    </section>
  );
};

export default Hero;

