import { useState, useEffect } from 'react';
import Starfield from './components/Starfield';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Accomplishments from './components/Accomplishments';
import Contact from './components/Contact';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate system boot-up
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-space-900 flex items-center justify-center font-display text-accent-teal">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-t-2 border-r-2 border-accent-teal rounded-full animate-spin"></div>
          <p className="tracking-[0.3em] uppercase text-sm animate-pulse">Initializing System...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-space-900 min-h-screen selection:bg-accent-teal/30 selection:text-white">
      <Starfield />
      
      {/* Decorative fixed overlays */}
      <div className="fixed top-0 left-0 w-full h-32 bg-gradient-to-b from-space-900 to-transparent z-50 pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 w-full h-32 bg-gradient-to-t from-space-900 to-transparent z-50 pointer-events-none"></div>
      
      <main className="relative z-10 pt-10 pb-20">
        <Hero />
        <Skills />
        <Experience />
        <Accomplishments />
        <Contact />
      </main>
    </div>
  );
}

export default App;
