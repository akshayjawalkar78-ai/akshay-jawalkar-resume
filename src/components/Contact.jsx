import { motion } from 'framer-motion';
import Section from './Section';
import { Mail, ExternalLink, ShieldCheck } from 'lucide-react';

const GithubIcon = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 3.6 2.9 5.5 5.9 5.5.4 0 .9.1 1.2.4.4.3.5.9.5 1.4v4" />
    <path d="M9 18c-4.5 1.5-5-2.5-7-3" />
  </svg>
);

const Contact = () => {
  return (
    <Section id="contact" className="relative z-10 pb-32">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="hud-panel p-10 md:p-12 relative overflow-hidden bg-space-950/50 border-accent-blue/15"
        >
          {/* Corner bracket styling */}
          <div className="absolute top-0 left-0 w-4.5 h-4.5 border-t border-l border-accent-blue/30" />
          <div className="absolute bottom-0 right-0 w-4.5 h-4.5 border-b border-r border-accent-blue/30" />

          {/* Secure lock indicator */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2 px-3 py-1 rounded bg-accent-teal/5 border border-accent-teal/20 text-[9px] font-mono text-accent-teal uppercase tracking-widest animate-pulse">
              <ShieldCheck size={12} />
              <span>SECURE CONTACT PORTAL</span>
            </div>
          </div>

          <h2 className="font-mono text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white uppercase text-glow-cyan">
            GET IN TOUCH
          </h2>
          <p className="text-gray-400 mb-10 max-w-md mx-auto text-xs leading-relaxed font-light">
            Open to strategic partnerships, research opportunities, and roles where analytical rigor meets practical execution.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-5 relative z-10">
            <a 
              href="mailto:akshay.jawalkar78@gmail.com"
              className="flex items-center gap-3 px-6 py-3.5 bg-white/5 border border-white/10 rounded-xl hover:border-accent-teal hover:bg-accent-teal/5 transition-all group w-full sm:w-auto justify-center font-mono text-xs uppercase tracking-wider text-gray-300 hover:text-white"
              style={{ cursor: 'none' }}
            >
              <Mail size={14} className="text-gray-400 group-hover:text-accent-teal transition-colors" />
              <span>akshay.jawalkar78@gmail.com</span>
            </a>

            <a 
              href="https://github.com/akshayjawalkar78-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3.5 bg-white/5 border border-white/10 rounded-xl hover:border-accent-blue hover:bg-accent-blue/5 transition-all group w-full sm:w-auto justify-center font-mono text-xs uppercase tracking-wider text-gray-300 hover:text-white"
              style={{ cursor: 'none' }}
            >
              <GithubIcon size={14} className="text-gray-400 group-hover:text-accent-blue transition-colors" />
              <span>GitHub Profile</span>
              <ExternalLink size={12} className="text-gray-600 group-hover:text-accent-blue" />
            </a>
          </div>

          <div className="mt-16 pt-6 border-t border-white/5 text-[9px] font-mono text-gray-600 tracking-widest uppercase flex flex-col md:flex-row justify-between items-center gap-4">
            <p>AVAILABLE FOR COOPERATIVE OPERATIONS</p>
            <p>LOC: JACKSONVILLE, FL // STANTON PREP</p>
          </div>
        </motion.div>
      </div>
    </Section>
  );
};

export default Contact;

