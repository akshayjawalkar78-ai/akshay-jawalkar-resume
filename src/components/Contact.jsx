import { motion } from 'framer-motion';
import Section from './Section';
import { Mail, ExternalLink } from 'lucide-react';

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
          style={{ willChange: "transform, opacity" }}
          className="glass-panel p-12 relative overflow-hidden"
        >
          {/* Decorative Background */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-accent-blue/10 to-transparent blur-3xl pointer-events-none"></div>

          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-6 relative z-10">
            CONTACT
          </h2>
          <p className="text-gray-400 mb-10 max-w-xl mx-auto relative z-10">
            Open to strategic partnerships, research opportunities, and operational roles where 
            high-leverage thinking meets rigorous execution.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 relative z-10">
            <a 
              href="mailto:akshay.jawalkar78@gmail.com"
              className="flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-full hover:border-accent-teal hover:bg-accent-teal/10 transition-all group w-full sm:w-auto justify-center"
            >
              <Mail size={18} className="text-gray-300 group-hover:text-accent-teal transition-colors" />
              <span className="text-sm font-medium tracking-wide">akshay.jawalkar78@gmail.com</span>
            </a>

            <a 
              href="https://github.com/akshayjawalkar78-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-full hover:border-accent-blue hover:bg-accent-blue/10 transition-all group w-full sm:w-auto justify-center"
            >
              <GithubIcon size={18} className="text-gray-300 group-hover:text-accent-blue transition-colors" />
              <span className="text-sm font-medium tracking-wide">GitHub Profile</span>
              <ExternalLink size={14} className="text-gray-500 group-hover:text-accent-blue" />
            </a>
          </div>

          <div className="mt-16 pt-8 border-t border-white/5 text-xs text-gray-500 tracking-widest uppercase flex flex-col md:flex-row justify-between items-center gap-4">
            <p>Available for New Opportunities</p>
            <p>Location: Jacksonville, FL</p>
          </div>
        </motion.div>
      </div>
    </Section>
  );
};

export default Contact;
