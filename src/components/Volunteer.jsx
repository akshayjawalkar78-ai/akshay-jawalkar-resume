import { motion } from 'framer-motion';
import Section from './Section';
import { HeartPulse, Hospital, Home, Atom, Clock, CircleDot } from 'lucide-react';

const volunteersData = [
  {
    bay: 'PROJECT_01',
    role: 'Clinical Volunteer',
    organization: 'Brooks Rehabilitation',
    date: 'Jun – Jul 2025',
    hours: '44.67 hours',
    icon: <HeartPulse className="text-accent-teal" size={18} />,
    color: 'text-accent-teal',
    border: 'border-accent-teal/20',
    achievements: [
      'Delivered direct patient support in a clinical rehabilitation environment, assisting healthcare staff with patient care, administrative tasks, and daily operational workflows.',
      'Developed hands-on exposure to rehabilitation medicine, interdisciplinary care teams, and the patient interaction standards required in a clinical setting.'
    ]
  },
  {
    bay: 'PROJECT_02',
    role: 'Hospital Volunteer',
    organization: "Ascension St. Vincent's Foundation",
    date: 'Jun – Jul 2025',
    hours: '31.14 hours',
    icon: <Hospital className="text-accent-blue" size={18} />,
    color: 'text-accent-blue',
    border: 'border-accent-blue/20',
    achievements: [
      'Supported healthcare professionals across multiple hospital departments with patient transport, organizational tasks, and administrative assistance in a high-volume clinical environment.',
      'Strengthened cross-functional communication and teamwork skills while gaining direct exposure to hospital operations and patient care standards.'
    ]
  },
  {
    bay: 'PROJECT_03',
    role: 'Community Volunteer',
    organization: 'St. Francis Family Housing',
    date: 'Jul – Dec 2025',
    hours: '69 hours',
    icon: <Home className="text-accent-purple" size={18} />,
    color: 'text-accent-purple',
    border: 'border-accent-purple/20',
    achievements: [
      'Dedicated 69 hours over six months to a nonprofit serving families experiencing housing insecurity, supporting resident programs and daily operations.',
      'Collaborated with staff and fellow volunteers to deliver community services, reflecting a sustained commitment to social responsibility.'
    ]
  },
  {
    bay: 'PROJECT_04',
    role: 'Museum Volunteer',
    organization: 'Museum of Science & History (MOSH)',
    date: 'Jul 2025',
    hours: '5 hours',
    icon: <Atom className="text-accent-teal" size={18} />,
    color: 'text-accent-teal',
    border: 'border-accent-teal/20',
    achievements: [
      'Supported museum staff with visitor engagement and event operations, contributing to STEM outreach and public education efforts in the Jacksonville community.'
    ]
  }
];

const Volunteer = () => {
  return (
    <Section id="volunteer" className="relative z-10">
      
      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mb-16 border-l-2 border-accent-blue pl-6 text-left"
      >
        <div className="text-[10px] font-mono text-accent-blue tracking-[0.25em] uppercase mb-1">
          COMMUNITY SERVICE RECORD
        </div>
        <h2 className="font-mono text-3xl md:text-4xl font-bold tracking-tight mb-3 text-white uppercase text-glow-cyan">
          VOLUNTEER EXPERIENCE
        </h2>
        <p className="text-gray-400 max-w-2xl text-sm font-light">
          A record of volunteer service and community impact across clinical, educational, and nonprofit environments.
        </p>
      </motion.div>

      {/* Cargo bay grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
        {volunteersData.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className={`hud-panel p-6 border-accent-blue/10 bg-space-950/40 relative group overflow-hidden`}
          >
            {/* Corner bracket styling */}
            <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t border-l border-accent-blue/30" />
            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b border-r border-accent-blue/30" />

            {/* Docking Bay ID Header */}
            <div className="flex justify-between items-center border-b border-white/5 pb-3.5 mb-4 text-[9px] font-mono tracking-widest text-gray-500">
              <span className="flex items-center gap-1.5">
                <CircleDot size={10} className={`animate-pulse ${item.color}`} />
                {item.bay}
              </span>
              <span>PERIOD // {item.date}</span>
            </div>

            {/* Meta details */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-accent-teal transition-colors tracking-wide">
                  {item.role}
                </h3>
                <h4 className="text-xs text-gray-400 font-mono mt-0.5 uppercase tracking-wider">
                  {item.organization}
                </h4>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-[10px] text-accent-teal bg-white/5 px-2.5 py-1 rounded border border-white/5 shrink-0 whitespace-nowrap">
                <Clock size={12} className="text-accent-blue" />
                {item.hours}
              </div>
            </div>

            {/* Achievements bullets */}
            <ul className="space-y-2.5 mt-6 border-t border-white/5 pt-4">
              {item.achievements.map((achievement, aIdx) => (
                <li key={aIdx} className="text-xs text-gray-400 leading-relaxed flex items-start gap-2.5">
                  <span className={`w-1 h-1 rounded-full mt-1.5 shrink-0 bg-accent-blue`} />
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>

            {/* Simulated bar meter displaying charge/load */}
            <div className="mt-6 flex items-center justify-between text-[8px] font-mono text-gray-600 uppercase border-t border-white/5 pt-3">
              <span>COMMITMENT STATUS: COMPLETE</span>
              <span className="text-accent-teal">VERIFIED</span>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

export default Volunteer;

