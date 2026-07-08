import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Starfield from './components/Starfield';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Volunteer from './components/Volunteer';
import Accomplishments from './components/Accomplishments';
import Contact from './components/Contact';
import Navbar from './components/Navbar';
import TargetingCursor from './components/TargetingCursor';
import SoundController from './components/SoundController';
import HUDOverlay from './components/HUDOverlay';
import RadarMap from './components/RadarMap';
import AIAssistant from './components/AIAssistant';
import Resume from './components/Resume';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) {
      // Ensure the page is at the very top immediately after loading finishes
      setTimeout(() => {
        try {
          window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        } catch (e) {
          window.scrollTo(0, 0);
        }
      }, 50);
    }
  }, [loading]);

  if (loading) {
    return (
      <div className="min-h-screen bg-space-950 flex flex-col items-center justify-center font-mono text-accent-blue p-6 hud-scanline">
        <div className="flex flex-col items-center gap-6 max-w-md w-full border border-accent-blue/20 bg-space-900/40 p-8 rounded-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-accent-blue" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-accent-blue" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-accent-blue" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-accent-blue" />
          
          <div className="relative w-20 h-20 flex items-center justify-center">
            <div className="absolute inset-0 w-full h-full border border-accent-blue/10 rounded-full" />
            <div className="absolute inset-0 w-full h-full border-t-2 border-r-2 border-accent-teal rounded-full animate-spin" />
            <div className="absolute inset-2 w-auto h-auto border-b-2 border-l-2 border-accent-purple rounded-full animate-[spin_3s_linear_infinite_reverse]" />
            <span className="text-[10px] font-bold tracking-widest text-accent-teal">LOAD</span>
          </div>
          
          <div className="w-full space-y-2 mt-4 text-center">
            <h3 className="tracking-[0.25em] uppercase text-sm font-semibold animate-pulse text-white">LOADING PORTFOLIO EXPERIENCE</h3>
            <p className="text-[9px] text-gray-500 font-mono tracking-widest">Preparing content for recruiters and admissions reviewers.</p>
            
            <div className="w-full bg-space-950 h-1.5 border border-white/5 rounded-full overflow-hidden mt-4">
              <motion.div 
                className="bg-gradient-to-r from-accent-blue to-accent-teal h-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen selection:bg-accent-blue/30 selection:text-white bg-space-950 text-gray-300">
      {/* Background canvas overlay */}
      <Starfield />
      
      {/* Ambient audio control */}
      <SoundController />

      {/* Custom cursor overlay */}
      <TargetingCursor />

      {/* Visual border and status overlay */}
      <HUDOverlay />

      {/* Section map and navigation */}
      <RadarMap />

      {/* Primary site navigation */}
      <Navbar />
      
      <div className="fixed top-0 left-0 w-full h-32 bg-gradient-to-b from-space-950 to-transparent z-30 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-full h-32 bg-gradient-to-t from-space-950 to-transparent z-30 pointer-events-none" />
      
      <main className="relative z-10 pt-16 pb-20">
        <Hero />
        <Skills />
        <Experience />
        <Volunteer />
        <Accomplishments />

        <section className="py-12 relative z-10 max-w-7xl mx-auto px-6 lg:px-12 text-center" id="assistant">
          <div className="mb-10 text-center flex flex-col items-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight mb-3 text-white uppercase">
              PROFILE CONSOLE
            </h2>
            <div className="h-[1.5px] w-16 bg-accent-teal mb-4"></div>
            <p className="text-gray-500 max-w-md text-xs font-mono tracking-wider">
              Use the command interface to explore key background, skills, experience, and contact details.
            </p>
          </div>
          <AIAssistant />
        </section>

        <Resume />

        <Contact />
      </main>
    </div>
  );
}

export default App;

