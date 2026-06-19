import { motion } from 'framer-motion';
import Section from './Section';
import { Trophy, Award, Target, Sparkles, Heart } from 'lucide-react';

const awardsData = [
  {
    organization: 'DECA — DISTRIBUTIVE EDUCATION CLUBS OF AMERICA',
    icon: <Trophy className="text-accent-teal" size={20} />,
    items: [
      {
        title: 'ICDC Qualifier — Sports & Entertainment Marketing',
        description: 'Advanced to the DECA International Career Development Conference, a distinction earned by fewer than 5% of DECA members nationwide.',
        badge: 'TOP 5% NATIONAL // SYSTEM_OK'
      },
      {
        title: '2nd Place, District 2 — Sports & Entertainment Marketing',
        description: 'Earned runner-up honors in a highly competitive district-wide event, securing advancement to the Florida State Career Development Conference.',
        badge: 'DISTRICT RUNNER-UP // एडवांस'
      },
      {
        title: 'SCDC Qualifier — Sports & Entertainment Marketing',
        description: 'Competed among top business students statewide at the Florida State Career Development Conference after placing in the top tier at the district level.',
        badge: 'STATE QUALIFIER // ACTIVE'
      }
    ]
  },
  {
    organization: 'HOSA — FUTURE HEALTH PROFESSIONALS',
    icon: <Heart className="text-accent-blue" size={20} />,
    items: [
      {
        title: 'Regional Leadership Conference Qualifier — Pathophysiology',
        description: 'Demonstrated mastery of advanced disease mechanisms and medical science concepts, qualifying for the regional competition in health sciences.',
        badge: 'REGIONAL QUALIFIER // LOG_01'
      },
      {
        title: 'Barbara James Service Award',
        description: 'Recognized for outstanding commitment to community service and volunteerism within the healthcare field.',
        badge: 'SERVICE RECOGNITION // OK'
      }
    ]
  }
];

const Accomplishments = () => {
  return (
    <Section id="accomplishments" className="relative z-10">
      
      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mb-16 border-l-2 border-accent-teal pl-6 text-left"
      >
        <div className="text-[10px] font-mono text-accent-teal tracking-[0.25em] uppercase mb-1">
          CREDENTIAL REGISTRY
        </div>
        <h2 className="font-mono text-3xl md:text-4xl font-bold tracking-tight mb-3 text-white uppercase text-glow-cyan">
          HONORS & SYSTEM AWARDS
        </h2>
        <p className="text-gray-400 max-w-2xl text-sm font-light">
          Official recognition log files validating competitive excellence in business marketing, leadership, and health sciences.
        </p>
      </motion.div>

      {/* Accomplishments grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
        {awardsData.map((org, orgIdx) => (
          <motion.div
            key={orgIdx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: orgIdx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="hud-panel p-6 border-accent-blue/10 bg-space-950/40 relative group overflow-hidden"
          >
            {/* Corner bracket styling */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-accent-blue/30" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-accent-blue/30" />
            
            <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-white/5 relative z-10">
              <div className="p-2.5 bg-white/5 rounded-lg border border-white/10 text-accent-blue group-hover:text-accent-teal transition-colors duration-300">
                {org.icon}
              </div>
              <h3 className="text-xs font-mono font-bold text-white tracking-widest uppercase">
                {org.organization}
              </h3>
            </div>

            <div className="space-y-6 relative z-10">
              {org.items.map((item, itemIdx) => (
                <div 
                  key={itemIdx} 
                  className="group/item flex flex-col gap-2 p-4 rounded-xl bg-white/[0.01] border border-white/5 hover:border-accent-blue/30 hover:bg-space-900/50 transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <h4 className="text-sm font-bold text-white group-hover/item:text-accent-teal transition-colors flex items-start gap-2.5">
                      <Award size={14} className="text-accent-blue shrink-0 mt-0.5" />
                      <span>{item.title}</span>
                    </h4>
                    
                    <span className="text-[8px] tracking-widest font-mono px-2 py-0.5 bg-white/5 border border-white/5 rounded text-gray-500 w-fit shrink-0 whitespace-nowrap">
                      {item.badge}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 font-light leading-relaxed pl-6">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

export default Accomplishments;

