import { motion } from 'framer-motion';
import Section from './Section';
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
  TrendingUp
} from 'lucide-react';

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
    role: 'Marketing Team',
    company: 'USA Economics Olympiad',
    date: 'May 2026 – Present',
    icon: <TrendingUp className="text-accent-blue" size={24} />,
    achievements: [
      'Identified technical and on-page SEO optimization opportunities, implementing site structure improvements, metadata optimization, and performance enhancements to strengthen search visibility and organic rankings.',
      'Developed SEO-driven content strategy focused on keyword optimization and search intent alignment, increasing organic visibility for AI-related services and target industries.',
      'Collaborated with the marketing team to execute data-driven SEO initiatives that strengthened digital presence and drove sustained organic growth.'
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
      "Mentored by Ng Kai Ming (MIT, Master's in Data Science), applying graduate-level analytical frameworks to real-world research projects."
    ]
  },
  {
    role: 'Outreach Officer',
    company: 'ThinkFinance',
    date: 'Apr 2026 – Present',
    icon: <Users className="text-accent-blue" size={24} />,
    achievements: [
      'Drove external partnership and stakeholder outreach initiatives to expand organizational visibility within the finance education sector.'
    ]
  },
  {
    role: 'Marketing Intern',
    company: 'Mind4Youth',
    date: 'Apr 2026 – Present',
    icon: <Megaphone className="text-accent-teal" size={24} />,
    achievements: [
      'Designed and executed multi-channel marketing campaigns across social media, print, and presentations, increasing organizational engagement.',
      'Developed data-driven user engagement strategies and produced high-quality content to grow the organization\'s digital footprint.',
      'Maintained accurate meeting records and supported internal communications across the leadership team.'
    ]
  },
  {
    role: 'Growth Director',
    company: 'Volta',
    date: 'Present',
    icon: <Rocket className="text-accent-blue" size={24} />,
    achievements: [
      'Spearheaded client acquisition and strategic partnership development, directly expanding Volta\'s market reach and revenue pipeline.'
    ]
  },
  {
    role: 'Florida State Lead',
    company: 'Youth Economy Lab',
    date: 'Present',
    icon: <Map className="text-accent-teal" size={24} />,
    achievements: [
      'Directed statewide operations for Youth Economy Lab in Florida, overseeing student recruitment, partnership building, and program coordination across the state.',
      'Advanced a mission of youth-led economic education and entrepreneurship by launching and scaling regional initiatives.'
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
  },
  {
    role: 'Treasurer',
    company: 'Stanton College Preparatory School — FBLA',
    date: 'May 2026 – Present',
    icon: <Calculator className="text-accent-teal" size={24} />,
    achievements: [
      'Oversaw financial planning and budget management for the chapter, ensuring fiscal accountability and resource allocation in support of competitive programming.'
    ]
  },
  {
    role: 'Varsity Soccer',
    company: 'Stanton College Preparatory School',
    date: 'Nov 2025 – Present',
    icon: <Trophy className="text-accent-blue" size={24} />,
    achievements: [
      'Competed at the varsity level, maintaining high academic performance alongside a rigorous athletic training and competition schedule.'
    ]
  }
];

const Experience = () => {
  return (
    <Section id="experience" className="relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mb-16 flex flex-col items-end text-right"
      >
        <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-4">
          EXPERIENCE
        </h2>
        <div className="h-[2px] w-24 bg-accent-blue mb-6"></div>
        <p className="text-gray-400 max-w-2xl text-lg">
          Chronological record of professional experience, research, and strategic initiatives.
        </p>
      </motion.div>

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
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  style={{ willChange: "transform, opacity" }}
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
