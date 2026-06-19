import { motion } from 'framer-motion';
import Section from './Section';
import InteractiveGlobe from './InteractiveGlobe';
import experiences from '../data/experiences';
import { 
  Briefcase, 
  Activity, 
  Code, 
  GraduationCap, 
  Users, 
  Megaphone, 
  Rocket, 
  Map, 
  Calculator, 
  Trophy,
  TrendingUp,
  Compass
} from 'lucide-react';

const Experience = () => {
  return (
    <Section id="experience" className="relative z-10">
      
      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mb-16 flex flex-col items-start text-left border-l-2 border-accent-blue pl-6"
      >
        <div className="text-[10px] font-mono text-accent-blue tracking-[0.25em] uppercase mb-1">
          PROFESSIONAL TIMELINE
        </div>
        <h2 className="font-mono text-3xl md:text-4xl font-bold tracking-tight mb-3 text-white uppercase text-glow-cyan">
          CAREER EXPERIENCE HIGHLIGHTS
        </h2>
        <p className="text-gray-400 max-w-2xl text-sm font-light">
          A chronological overview of professional experience across finance, research, and technical leadership.
        </p>
      </motion.div>

      {/* Grid Layout: Timeline + Interactive Globe */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        
        {/* Left Side: Timeline (takes 2 cols) */}
        <div className="lg:col-span-2 relative pl-8 md:pl-12">
          {/* Vertical Vector Flight Path Line */}
          <div className="absolute left-3 md:left-4 top-2 bottom-2 w-[1px] bg-gradient-to-b from-accent-blue via-accent-teal/30 to-transparent"></div>

          <div className="space-y-12">
            {experiences.map((exp, idx) => (
              <div key={idx} className="relative group text-left">
                
                {/* Timeline Orbiter Node */}
                <div className="absolute -left-8 md:-left-12 top-0.5 w-6 h-6 md:w-8 md:h-8 rounded-full bg-space-950 border border-accent-blue/30 flex items-center justify-center -translate-x-1/2 z-10 shadow-[0_0_12px_rgba(0,229,255,0.1)] group-hover:border-accent-teal group-hover:shadow-[0_0_15px_rgba(0,255,210,0.3)] transition-all duration-300">
                  {exp.icon}
                </div>

                {/* Dashboard style card */}
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="hud-panel p-6 hud-panel-glow border-accent-blue/10"
                >
                  {/* Corner bracket styling */}
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-accent-blue/30" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-accent-blue/30" />

                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 mb-4">
                    <div>
                      <span className="text-[8px] font-mono text-accent-blue tracking-widest uppercase font-semibold">
                        {exp.sector}
                      </span>
                      <h3 className="text-lg font-bold text-white tracking-wide mt-0.5">{exp.role}</h3>
                      <h4 className="text-xs text-accent-teal font-mono mt-0.5 uppercase tracking-wider">{exp.company}</h4>
                    </div>
                    
                    <span className="text-[9px] font-mono text-gray-500 bg-white/5 border border-white/5 px-2.5 py-1 rounded-sm uppercase tracking-widest whitespace-nowrap">
                      {exp.date}
                    </span>
                  </div>
                  
                  <ul className="space-y-2.5 pl-1.5 mt-2">
                    {exp.achievements.map((achievement, aIdx) => (
                      <li key={aIdx} className="text-xs text-gray-400 leading-relaxed flex items-start gap-2.5">
                        <Compass size={12} className="text-accent-blue shrink-0 mt-0.5" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Interactive 3D Coordinate Globe (takes 1 col) */}
        <div className="lg:sticky lg:top-24 flex flex-col gap-6">
          <InteractiveGlobe />
          
          <div className="hud-panel p-4 border-accent-blue/10 bg-space-950/40 text-[9px] font-mono text-gray-500 uppercase tracking-widest space-y-2">
            <div className="flex justify-between">
              <span>PROFILE STATUS:</span>
              <span className="text-accent-teal">ONLINE</span>
            </div>
          </div>
        </div>

      </div>
    </Section>
  );
};

export default Experience;

