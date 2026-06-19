import { motion } from 'framer-motion';
import Section from './Section';
import { Shield, Zap, Sparkles } from 'lucide-react';

const skillCategories = [
  {
    title: 'QUANTITATIVE & RESEARCH',
    icon: <Shield className="text-accent-teal" size={18} />,
    color: 'from-accent-teal to-accent-blue',
    skills: [
      { name: 'Equity Research', level: 92 },
      { name: 'Valuation Modeling', level: 88 },
      { name: 'Portfolio Analysis', level: 85 },
      { name: 'BLS/SBA Data Research', level: 90 },
      { name: 'Pathophysiology Research', level: 85 }
    ]
  },
  {
    title: 'STRATEGY & OPERATIONS',
    icon: <Zap className="text-accent-purple" size={18} />,
    color: 'from-accent-purple to-pink-500',
    skills: [
      { name: 'Campaign Management', level: 90 },
      { name: 'User Engagement Strategy', level: 87 },
      { name: 'Competitive Sector Analysis', level: 85 },
      { name: 'Cross-functional Outreach', level: 92 }
    ]
  },
  {
    title: 'TECHNICAL SKILLS',
    icon: <Sparkles className="text-accent-blue" size={18} />,
    color: 'from-accent-blue to-accent-teal',
    skills: [
      { name: 'JavaScript ES6+', level: 95 },
      { name: 'Data Pipeline Cleaning', level: 90 },
      { name: 'Spreadsheet Analytics', level: 92 },
      { name: 'React SPA Engineering', level: 90 },
      { name: 'Tailwind Styling Systems', level: 92 }
    ]
  }
];

const Skills = () => {
  return (
    <Section id="skills" className="relative z-10">
      <div className="mb-16 text-left border-l-2 border-accent-teal pl-6">
        <div className="text-[10px] font-mono text-accent-teal tracking-[0.25em] uppercase mb-1">
          CORE COMPETENCIES
        </div>
        <h2 className="font-mono text-3xl md:text-4xl font-bold tracking-tight mb-3 text-white uppercase text-glow-cyan">
          CAPABILITIES & EXPERTISE
        </h2>
        <p className="text-gray-400 max-w-2xl text-sm font-light">
          A multi-disciplinary matrix of skills currently supporting work across engineering, finance, and medical science domains.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {skillCategories.map((category, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="hud-panel p-6 relative overflow-hidden group border-accent-blue/10"
          >
            {/* Corner bracket styling */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-accent-blue/30" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-accent-blue/30" />

            <div className="flex items-center gap-3 border-b border-white/5 pb-4 mb-6">
              <div className="p-2 bg-white/5 border border-white/10 rounded-lg">
                {category.icon}
              </div>
              <h3 className="text-xs font-mono font-bold tracking-widest text-white uppercase">
                {category.title}
              </h3>
            </div>
            
            <div className="space-y-6">
              {category.skills.map((skill, sIdx) => (
                <div key={sIdx} className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-mono">
                    <span className="text-gray-300 tracking-wider uppercase font-semibold">{skill.name}</span>
                    <span className="text-accent-teal">{skill.level}% PROFICIENCY</span>
                  </div>

                  {/* Spaceship Battery Power bar */}
                  <div className="w-full bg-space-950 h-2 border border-white/5 rounded-sm overflow-hidden p-[1px] flex items-center relative">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: sIdx * 0.05, ease: "easeOut" }}
                      className={`h-full bg-gradient-to-r ${category.color} rounded-sm relative`}
                    >
                      {/* Pulse spark inside bar */}
                      <span className="absolute right-0 top-0 bottom-0 w-1 bg-white animate-pulse" />
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>

            {/* Simulated hardware info at panel bottom */}
            <div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-center text-[8px] font-mono text-gray-600 uppercase">
              <span>CATEGORY: {idx + 1}</span>
              <span className="animate-pulse text-accent-teal">STATUS: READY</span>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

export default Skills;

