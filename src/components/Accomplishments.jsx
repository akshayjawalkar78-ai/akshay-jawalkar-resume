import { motion } from 'framer-motion';
import Section from './Section';
import { Trophy, Award, Sparkles, Heart } from 'lucide-react';

const awardsData = [
  {
    organization: 'DECA — Distributive Education Clubs of America',
    icon: <Trophy className="text-accent-teal" size={28} />,
    items: [
      {
        title: 'ICDC Qualifier — Sports & Entertainment Marketing',
        description: 'Advanced to the DECA International Career Development Conference, a distinction earned by fewer than 5% of DECA members nationwide.',
        badge: 'Top 5% National'
      },
      {
        title: '2nd Place, District 2 — Sports & Entertainment Marketing',
        description: 'Earned runner-up honors in a highly competitive district-wide event, securing advancement to the Florida State Career Development Conference.',
        badge: 'District Runner-up'
      },
      {
        title: 'SCDC Qualifier — Sports & Entertainment Marketing',
        description: 'Competed among top business students statewide at the Florida State Career Development Conference after placing in the top tier at the district level.',
        badge: 'State Qualifier'
      }
    ]
  },
  {
    organization: 'HOSA — Future Health Professionals',
    icon: <Heart className="text-accent-blue" size={28} />,
    items: [
      {
        title: 'Regional Leadership Conference Qualifier — Pathophysiology',
        description: 'Demonstrated mastery of advanced disease mechanisms and medical science concepts, qualifying for the regional competition in health sciences.',
        badge: 'Regional Qualifier'
      },
      {
        title: 'Barbara James Service Award',
        description: 'Recognized for outstanding commitment to community service and volunteerism within the healthcare field.',
        badge: 'Service Recognition'
      }
    ]
  }
];

const Accomplishments = () => {
  return (
    <Section id="accomplishments" className="relative z-10">
      <div className="mb-16">
        <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-4">
          HONORS & AWARDS
        </h2>
        <div className="h-[2px] w-24 bg-accent-teal mb-6"></div>
        <p className="text-gray-400 max-w-2xl text-lg">
          Recognition for academic excellence, competitive business marketing, and health sciences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {awardsData.map((org, orgIdx) => (
          <motion.div
            key={orgIdx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: orgIdx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ willChange: "transform, opacity" }}
            className="glass-panel p-8 flex flex-col relative group overflow-hidden"
          >
            {/* Subtle light leak effect */}
            <div className="absolute -right-20 -top-20 w-40 h-40 bg-accent-blue/5 rounded-full blur-3xl group-hover:bg-accent-blue/10 transition-all duration-500" />
            
            <div className="flex items-center gap-4 mb-8 pb-4 border-b border-white/5 relative z-10">
              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                {org.icon}
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-white tracking-wide">
                {org.organization}
              </h3>
            </div>

            <div className="space-y-6 relative z-10 flex-1">
              {org.items.map((item, itemIdx) => (
                <div 
                  key={itemIdx} 
                  className="group/item flex flex-col gap-2 p-4 rounded-xl hover:bg-white/[0.02] border border-transparent hover:border-white/5 transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h4 className="text-md font-semibold text-white group-hover/item:text-accent-teal transition-colors flex items-center gap-2">
                      <Award size={16} className="text-accent-teal shrink-0" />
                      {item.title}
                    </h4>
                    <span className="text-[10px] uppercase tracking-wider font-mono px-2.5 py-1 bg-white/5 border border-white/10 rounded-full text-gray-400 w-fit">
                      {item.badge}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 font-light leading-relaxed pl-6">
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
