import { motion } from 'framer-motion';
import Section from './Section';
import { Briefcase, Activity, Code, GraduationCap, MapPin } from 'lucide-react';

const experiences = [
  {
    role: 'Investment Analyst',
    company: 'Advanced Equities',
    date: 'May 2026 – Present',
    icon: <Activity className="text-accent-teal" size={24} />,
    achievements: [
      'Managed and analyzed a live $15,500+ capital portfolio through systematic performance tracking and risk-focused decision-making.',
      'Conducted institutional-style equity research utilizing valuation models, catalyst identification, and structured investment thesis development.'
    ]
  },
  {
    role: 'Independent Researcher',
    company: 'Synthica',
    date: 'Apr 2026 – Present',
    icon: <GraduationCap className="text-accent-blue" size={24} />,
    achievements: [
      'Leading original research on the differential effects of H1 vs. H2 antihistamines on osteoclast and osteoblast activity, contributing to the emerging intersection of pharmacology and bone biology.'
    ]
  },
  {
    role: 'Data Analyst',
    company: 'Equity Economics Research Lab',
    date: 'Present',
    icon: <Briefcase className="text-accent-teal" size={24} />,
    achievements: [
      'Executed end-to-end dataset cleaning and equity research data analysis using BLS and SBA datasets to surface actionable economic insights.',
      "Mentored by MIT Master's in Data Science grad, applying graduate-level analytical frameworks to real-world research projects."
    ]
  },
  {
    role: 'Founder',
    company: 'ActiveRecallCoach',
    date: 'Present',
    icon: <Code className="text-accent-blue" size={24} />,
    achievements: [
      'Founded and independently engineered ActiveRecallCoach, a science-backed active recall study platform coded in JavaScript, from concept through deployment.'
    ]
  }
];

const Experience = () => {
  return (
    <Section id="experience" className="relative z-10">
      <div className="mb-16 flex flex-col items-end text-right">
        <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-4">
          MISSION LOGS
        </h2>
        <div className="h-[2px] w-24 bg-accent-blue mb-6"></div>
        <p className="text-gray-400 max-w-2xl text-lg">
          Chronological record of operational deployments and strategic initiatives.
        </p>
      </div>

      <div className="relative">
        {/* Central Timeline Line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-accent-teal via-white/10 to-transparent -translate-x-1/2"></div>

        <div className="space-y-12">
          {experiences.map((exp, idx) => (
            <div key={idx} className={`relative flex flex-col md:flex-row gap-8 items-start md:items-center ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
              
              {/* Timeline Node */}
              <div className="absolute left-8 md:left-1/2 w-12 h-12 rounded-full bg-space-900 border border-white/20 flex items-center justify-center -translate-x-1/2 z-10 shadow-[0_0_15px_rgba(20,184,166,0.15)] group-hover:border-accent-teal transition-colors">
                {exp.icon}
              </div>

              {/* Content Panel */}
              <div className={`w-full md:w-1/2 pl-24 md:pl-0 ${idx % 2 === 0 ? 'md:pr-16 text-left md:text-right' : 'md:pl-16 text-left'}`}>
                <motion.div 
                  initial={{ opacity: 0, x: idx % 2 === 0 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, type: "spring", stiffness: 50 }}
                  className="glass-panel p-8 glass-panel-hover"
                >
                  <span className="text-xs font-mono text-accent-teal tracking-widest uppercase mb-2 block">
                    {exp.date}
                  </span>
                  <h3 className="text-2xl font-semibold text-white mb-1">{exp.role}</h3>
                  <h4 className="text-lg text-gray-400 mb-6 font-light">{exp.company}</h4>
                  
                  <ul className="space-y-3">
                    {exp.achievements.map((achievement, aIdx) => (
                      <li key={aIdx} className="text-sm text-gray-300 leading-relaxed flex items-start gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${idx % 2 === 0 ? 'bg-accent-blue md:ml-auto md:order-2' : 'bg-accent-teal'}`}></div>
                        <span className={idx % 2 === 0 ? 'md:text-right' : ''}>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Experience;
