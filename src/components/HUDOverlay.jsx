import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Shield, Disc } from 'lucide-react';

const HUDOverlay = () => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState('');
  const [engagementLevel, setEngagementLevel] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCoords({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    const updateTime = () => {
      const d = new Date();
      const formatTime = d.toUTCString().replace('GMT', 'UTC');
      setTime(formatTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    const engagementInterval = setInterval(() => {
      setEngagementLevel(Math.floor(Math.random() * 5) + 95);
    }, 3000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
      clearInterval(engagementInterval);
    };
  }, []);

  return (
    <>
      <div className="cyber-grid" />
      <div className="nebula-clouds" />

      <div className="fixed inset-0 pointer-events-none z-40 hidden md:block">
        <div className="absolute top-0 left-0 right-0 h-8 bg-space-950/20 border-b border-accent-blue/10 backdrop-blur-[2px] flex items-center justify-between px-8 text-[9px] font-mono tracking-widest text-gray-500">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-accent-blue/70">
              <Disc size={10} className="animate-spin text-accent-blue" />
              PROFILE ONLINE
            </span>
          </div>
          <div>{time}</div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Cpu size={10} className="text-accent-teal" />
              ENGAGEMENT: <span className="text-accent-teal">{engagementLevel}%</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Shield size={10} className="text-accent-teal" />
              NETWORK STABILITY: MAX
            </span>
          </div>
        </div>

        <div className="absolute top-16 left-6 bottom-16 w-4 flex flex-col justify-between items-center text-[8px] font-mono text-gray-600 tracking-widest">
          <div className="flex flex-col gap-1 items-center">
            <span>NAV: OK</span>
            <div className="w-[1px] h-12 bg-white/10" />
          </div>
          <div className="rotate-270 origin-center my-10 uppercase text-accent-blue/40 font-semibold tracking-[0.3em]">
            OPERATIONAL STABILITY
          </div>
          <div className="flex flex-col gap-1 items-center">
            <div className="w-[1px] h-12 bg-white/10" />
            <span>04 // 0A // 17</span>
          </div>
        </div>

        <div className="absolute top-16 right-6 bottom-16 w-4 flex flex-col justify-between items-center text-[8px] font-mono text-gray-600 tracking-widest">
          <div className="flex flex-col gap-1 items-center">
            <span className="text-accent-teal">ELEVATION: 104M</span>
            <div className="w-[1px] h-12 bg-white/10" />
          </div>
          <div className="rotate-90 origin-center my-10 uppercase text-accent-teal/40 font-semibold tracking-[0.3em] whitespace-nowrap">
            CURRENT FOCUS // AKSHAY JAWALKAR
          </div>
          <div className="flex flex-col gap-1 items-center">
            <div className="w-[1px] h-12 bg-white/10" />
            <span className="text-accent-blue font-semibold">X: {coords.x} Y: {coords.y}</span>
          </div>
        </div>

        <div className="absolute top-12 left-12 w-6 h-6 border-t border-l border-accent-blue/30" />
        <div className="absolute top-12 right-12 w-6 h-6 border-t border-r border-accent-blue/30" />
        <div className="absolute bottom-12 left-12 w-6 h-6 border-b border-l border-accent-blue/30" />
        <div className="absolute bottom-12 right-12 w-6 h-6 border-b border-r border-accent-blue/30" />
      </div>

      <div className="fixed bottom-6 right-24 z-45 pointer-events-none hidden lg:block text-[9px] font-mono text-accent-blue/60 tracking-widest">
        <div className="hud-panel py-1.5 px-4 border-accent-blue/20 bg-space-950/80 backdrop-blur-md flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-ping" />
          <span>CONNECTION: ESTABLISHED</span>
          <span className="text-gray-600">|</span>
          <span>JACKSONVILLE NETWORK</span>
        </div>
      </div>
    </>
  );
};

export default HUDOverlay;
