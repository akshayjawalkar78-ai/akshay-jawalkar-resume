import { motion } from 'framer-motion';
import Section from './Section';
import InteractiveGlobe from './InteractiveGlobe';
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

const experiences = [
  {
    role: 'Investment Analyst',
    company: 'Advanced Equities',
    date: 'May 2026 – Present',
    icon: <Activity className="text-accent-teal" size={18} />,
    sector: 'QUANT_FINANCE // LIVE_PORTFOLIO',
    achievements: [
      'Managed and analyzed a live $15,500+ capital portfolio through systematic performance tracking and risk-focused decision-making.',
      'Conducted institutional-style equity research utilizing valuation models, catalyst identification, and structured investment thesis development.'
    ]
  },
  {
    role: 'IT and Marketing Team',
    company: 'USA Economics Olympiad',
    date: 'May 2026 – Present',
    icon: <TrendingUp className="text-accent-blue" size={18} />,
    sector: 'GROWTH_SEO // ON_PAGE_TRAFFIC',
    achievements: [
      'Identified technical and on-page SEO optimization opportunities, implementing site structure improvements, metadata optimization, and performance enhancements to strengthen search visibility and organic rankings.',
      'Developed SEO-driven content strategy focused on keyword optimization and search intent alignment, increasing organic visibility for AI-related services and target industries.'
    ]
  },
  {
    role: 'Independent Researcher',
    company: 'Synthica',
    date: 'Apr 2026 – Present',
    icon: <GraduationCap className="text-accent-blue" size={18} />,
    sector: 'PHARMACOLOGY // OSTEOCLAST_BIOLOGY',
    achievements: [
      'Leading original research on the differential effects of H1 vs. H2 antihistamines on osteoclast and osteoblast activity, contributing to the emerging intersection of pharmacology and bone biology.'
    ]
  },
  {
    role: 'Data Analyst',
    company: 'Equity Economics Research Lab',
    date: 'Present',
    icon: <Briefcase className="text-accent-teal" size={18} />,
    sector: 'DATA_SCIENCE // DATASET_CLEANING',
    achievements: [
      'Executed end-to-end dataset cleaning and equity research data analysis using BLS and SBA datasets to surface actionable economic insights.',
      "Mentored by Ng Kai Ming (MIT, Master's in Data Science), applying graduate-level analytical frameworks to real-world research projects."
    ]
  },
  {
    role: 'Outreach Officer',
    company: 'ThinkFinance',
    date: 'Apr 2026 – Present',
    icon: <Users className="text-accent-blue" size={18} />,
    sector: 'PARTNERSHIPS // SOCIAL_ENGAGEMENT',
    achievements: [
      'Drove external partnership and stakeholder outreach initiatives to expand organizational visibility within the finance education sector.'
    ]
  },
  {
    role: 'Marketing Intern',
    company: 'Mind4Youth',
    date: 'Apr 2026 – Present',
    icon: <Megaphone className="text-accent-teal" size={18} />,
    sector: 'CAMPAIGNS // OUTREACH_OPS',
    achievements: [
      'Designed and executed multi-channel marketing campaigns across social media, print, and presentations, increasing organizational engagement.',
      'Developed data-driven user engagement strategies and produced high-quality content to grow the organization\'s digital footprint.'
    ]
  },
  {
    role: 'Growth Director',
    company: 'Volta',
    date: 'Present',
    icon: <Rocket className="text-accent-blue" size={18} />,
    sector: 'CLIENT_ACQUISITION // PIPELINE_OPS',
    achievements: [
      'Spearheaded client acquisition and strategic partnership development, directly expanding Volta\'s market reach and revenue pipeline.'
    ]
  },
  {
    role: 'Florida State Lead',
    company: 'Youth Economy Lab',
    date: 'Present',
    icon: <Map className="text-accent-teal" size={18} />,
    sector: 'STATE_LEAD // RECRUITMENT_OPS',
    achievements: [
      'Directed statewide operations for Youth Economy Lab in Florida, overseeing student recruitment, partnership building, and program coordination across the state.'
    ]
  },
  {
    role: 'Founder',
    company: 'ActiveRecallCoach',
    date: 'Present',
    icon: <Code className="text-accent-blue" size={18} />,
    sector: 'ENGINEERING // STACK_DEPLOYMENT',
    achievements: [
      'Founded and independently engineered ActiveRecallCoach, a science-backed active recall study platform coded in JavaScript, from concept through deployment.'
    ]
  },
  {
    role: 'Treasurer',
    company: 'Stanton College Preparatory School — FBLA',
    date: 'May 2026 – Present',
    icon: <Calculator className="text-accent-teal" size={18} />,
    sector: 'BUDGETARY_PLANNING // chapter_ops',
    achievements: [
      'Oversaw financial planning and budget management for the chapter, ensuring fiscal accountability and resource allocation in support of competitive programming.'
    ]
  },
  {
    role: 'Varsity Soccer',
    company: 'Stanton College Preparatory School',
    date: 'Nov 2025 – Present',
    icon: <Trophy className="text-accent-blue" size={18} />,
    sector: 'ATHLETICS // STAMINA_OPS',
    achievements: [
      'Competed at the varsity level, maintaining high academic performance alongside a rigorous athletic training and competition schedule.'
    ]
  }
];

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
          NAVIGATION LOG REGISTRY
        </div>
        <h2 className="font-mono text-3xl md:text-4xl font-bold tracking-tight mb-3 text-white uppercase text-glow-cyan">
          FLIGHT EXPERIENCE TIMELINE
        </h2>
        <p className="text-gray-400 max-w-2xl text-sm font-light">
          A chronological logbook of professional operations, quantitative engineering, and clinical research missions.
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
              <span>ACTIVE_RECOVERY:</span>
              <span className="text-accent-teal">ONLINE</span>
            </div>
            <div className="flex justify-between">
              <span>PING:</span>
              <span>12MS // STANTON</span>
            </div>
            <div className="flex justify-between">
              <span>GRID SECURE:</span>
              <span className="text-accent-teal">AES_256</span>
            </div>
          </div>
        </div>

      </div>
    </Section>
  );
};

export default Experience;

