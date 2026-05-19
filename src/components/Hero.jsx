import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden z-10 px-6">
      <div className="max-w-5xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Text Content */}
        <motion.div 
          className="flex-1 text-left"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2, delayChildren: 0.1 } }
          }}
        >
          <motion.p
            variants={fadeUpVariant}
            className="text-accent-teal uppercase tracking-[0.2em] text-sm mb-4 font-semibold"
          >
            Professional Portfolio
          </motion.p>
          
          <motion.h1
            variants={fadeUpVariant}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 text-white leading-[1.1]"
          >
            AKSHAY <br />
            <span className="text-gradient">JAWALKAR</span>
          </motion.h1>
          
          <motion.p
            variants={fadeUpVariant}
            className="text-gray-400 text-lg md:text-xl max-w-2xl font-light leading-relaxed mb-10"
          >
            Operating at the intersection of quantitative finance, clinical research, 
            and scalable software engineering. Orchestrating complex systems to extract 
            actionable insights from noise.
          </motion.p>

          <motion.div variants={fadeUpVariant}>
            <a href="#experience" className="inline-flex items-center gap-3 text-white border border-white/20 hover:border-accent-teal hover:text-accent-teal px-8 py-4 rounded-full transition-all duration-300 group bg-space-800/30 backdrop-blur-sm">
              <span className="uppercase tracking-widest text-xs font-semibold">View Experience</span>
              <ArrowDown size={16} className="group-hover:translate-y-1 transition-transform" />
            </a>
          </motion.div>
        </motion.div>

        {/* Decorative Floating Elements */}
        <div className="hidden lg:block relative w-96 h-96">
          <motion.div
            animate={{ 
              y: [-10, 10, -10],
              rotate: [0, 2, -2, 0]
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute inset-0 rounded-full border border-white/5 bg-gradient-to-tr from-accent-blue/5 to-transparent blur-xl"
            style={{ willChange: "transform" }}
          />
          <motion.div
            animate={{ 
              y: [10, -10, 10],
              rotate: [0, -4, 4, 0]
            }}
            transition={{ 
              duration: 15, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-accent-teal/20 backdrop-blur-sm shadow-[0_0_30px_rgba(20,184,166,0.1)]"
            style={{ willChange: "transform" }}
          />
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1.5, ease: "easeOut" }}
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-accent-teal to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;
