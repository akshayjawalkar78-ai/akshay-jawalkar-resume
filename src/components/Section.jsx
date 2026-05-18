import { motion } from 'framer-motion';

const Section = ({ children, className = '', id = '' }) => {
  return (
    <motion.section
      id={id}
      className={`py-24 relative z-10 max-w-7xl mx-auto px-6 lg:px-12 ${className}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {children}
    </motion.section>
  );
};

export default Section;
