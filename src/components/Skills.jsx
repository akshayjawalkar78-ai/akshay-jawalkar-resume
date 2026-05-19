import { motion } from 'framer-motion';
import Section from './Section';

const skillCategories = [
  {
    title: 'Quantitative & Research',
    skills: ['Equity Research', 'Valuation Modeling', 'Portfolio Analysis', 'BLS/SBA Data', 'Pathophysiology']
  },
  {
    title: 'Strategy & Execution',
    skills: ['Campaign Management', 'User Engagement', 'Competitive Analysis', 'Cross-functional Leadership']
  },
  {
    title: 'Technical Arsenal',
    skills: ['JavaScript', 'Data Cleaning', 'Spreadsheet Analysis', 'React', 'Tailwind CSS']
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { ease: [0.16, 1, 0.3, 1], duration: 0.8 }
  }
};

const Skills = () => {
  return (
    <Section id="skills" className="relative z-10">
      <div className="mb-16">
        <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-4">
          CAPABILITIES
        </h2>
        <div className="h-[2px] w-24 bg-accent-teal mb-6"></div>
        <p className="text-gray-400 max-w-2xl text-lg">
          A multi-disciplinary skill tree optimized for high-leverage execution across 
          finance, software engineering, and clinical research.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {skillCategories.map((category, idx) => (
          <motion.div 
            key={idx}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="glass-panel p-8 relative overflow-hidden group"
          >
            {/* Background glow effect on hover */}
            <div className="absolute -right-20 -top-20 w-40 h-40 bg-accent-blue/10 rounded-full blur-3xl group-hover:bg-accent-blue/20 transition-all duration-500" />
            
            <h3 className="text-xl font-semibold mb-6 tracking-wide text-white border-b border-white/10 pb-4">
              {category.title}
            </h3>
            
            <div className="flex flex-wrap gap-3">
              {category.skills.map((skill, sIdx) => (
                <motion.span
                  key={sIdx}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(20, 184, 166, 0.15)', borderColor: 'rgba(20, 184, 166, 0.4)' }}
                  className="px-4 py-2 text-sm text-gray-300 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm transition-colors cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

export default Skills;
