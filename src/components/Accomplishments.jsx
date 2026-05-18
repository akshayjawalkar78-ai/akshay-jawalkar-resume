import { motion } from 'framer-motion';
import Section from './Section';
import { Award, Trophy, Target, TrendingUp } from 'lucide-react';

const stats = [
  {
    value: '<5%',
    label: 'DECA ICDC Qualifier',
    subtext: 'Nationwide distinction in Sports & Entertainment Marketing',
    icon: <Trophy className="text-accent-teal mb-4" size={32} />
  },
  {
    value: '2nd',
    label: 'Place, District 2',
    subtext: 'Secured runner-up in competitive district-wide event',
    icon: <Award className="text-accent-blue mb-4" size={32} />
  },
  {
    value: 'Top Tier',
    label: 'SCDC Qualifier',
    subtext: 'Competed among top business students statewide',
    icon: <TrendingUp className="text-accent-teal mb-4" size={32} />
  },
  {
    value: 'Qualified',
    label: 'HOSA Regional Leadership',
    subtext: 'Mastery of advanced disease mechanisms (Pathophysiology)',
    icon: <Target className="text-accent-blue mb-4" size={32} />
  }
];

const Accomplishments = () => {
  return (
    <Section id="accomplishments" className="relative z-10">
      <div className="mb-16">
        <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-4">
          METRICS & AWARDS
        </h2>
        <div className="h-[2px] w-24 bg-accent-teal mb-6"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="glass-panel p-8 flex flex-col items-center text-center relative group overflow-hidden"
          >
            {/* Subtle radial gradient background */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10">
              {stat.icon}
              <h3 className="text-4xl font-display font-bold text-white mb-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                {stat.value}
              </h3>
              <div className="h-[1px] w-12 bg-white/20 mx-auto mb-4"></div>
              <p className="text-sm font-semibold text-accent-teal uppercase tracking-wider mb-2">
                {stat.label}
              </p>
              <p className="text-xs text-gray-400 font-light leading-relaxed">
                {stat.subtext}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

export default Accomplishments;
