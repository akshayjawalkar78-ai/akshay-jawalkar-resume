import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Radio } from 'lucide-react';
import { motion } from 'framer-motion';

const SoundController = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.2); // 0.0 to 1.0 scale
  const [systemBeepsEnabled, setSystemBeepsEnabled] = useState(true);
  
  const audioContextRef = useRef(null);
  const mainGainRef = useRef(null);
  
  // Oscillators and nodes for ambient bridge hum
  const humOsc1 = useRef(null);
  const humOsc2 = useRef(null);
  const subHum = useRef(null);
  const filterRef = useRef(null);

  const initAudio = () => {
    if (audioContextRef.current) return;

    // Create audio context
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContextClass();
    audioContextRef.current = ctx;

    // Lowpass filter for deep engine hum
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(110, ctx.currentTime);
    filter.Q.setValueAtTime(1.5, ctx.currentTime);
    filterRef.current = filter;

    // Main gain node
    const mainGain = ctx.createGain();
    mainGain.gain.setValueAtTime(volume * 0.15, ctx.currentTime); // keep it subtle
    mainGainRef.current = mainGain;

    // Build hum oscillator 1 (55Hz - base note)
    const osc1 = ctx.createOscillator();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(55, ctx.currentTime);
    humOsc1.current = osc1;

    // Build hum oscillator 2 (55.4Hz - slight detuning for phasing beat)
    const osc2 = ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(55.4, ctx.currentTime);
    humOsc2.current = osc2;

    // Build deep sub hum (27.5Hz - sub-bass rumble)
    const sub = ctx.createOscillator();
    sub.type = 'sine';
    sub.frequency.setValueAtTime(27.5, ctx.currentTime);
    subHum.current = sub;

    // Connect nodes: Oscs -> Filter -> MainGain -> Destination
    osc1.connect(filter);
    osc2.connect(filter);
    sub.connect(filter);
    filter.connect(mainGain);
    mainGain.connect(ctx.destination);

    // Start oscillators
    osc1.start(0);
    osc2.start(0);
    sub.start(0);
  };

  const togglePlayback = async () => {
    if (!audioContextRef.current) {
      initAudio();
    }

    const ctx = audioContextRef.current;

    if (ctx.state === 'suspended') {
      await ctx.resume();
    }

    if (isPlaying) {
      // Fade out
      mainGainRef.current.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      setTimeout(() => {
        if (ctx.state === 'running') {
          // Keep running but gain is practically zero
        }
      }, 500);
      setIsPlaying(false);
    } else {
      // Fade in
      initAudio();
      mainGainRef.current.gain.setValueAtTime(0.001, ctx.currentTime);
      mainGainRef.current.gain.exponentialRampToValueAtTime(volume * 0.15, ctx.currentTime + 1.0);
      setIsPlaying(true);
      playSystemBeep(880, 0.08); // short startup beep
    }
  };

  const playSystemBeep = (freq = 880, duration = 0.05) => {
    if (!audioContextRef.current || !systemBeepsEnabled || !isPlaying) return;
    const ctx = audioContextRef.current;
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    
    gain.gain.setValueAtTime(volume * 0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + duration + 0.05);
  };

  // Adjust volume
  useEffect(() => {
    if (mainGainRef.current && audioContextRef.current) {
      mainGainRef.current.gain.setValueAtTime(volume * 0.15, audioContextRef.current.currentTime);
    }
  }, [volume]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (humOsc1.current) humOsc1.current.stop();
      if (humOsc2.current) humOsc2.current.stop();
      if (subHum.current) subHum.current.stop();
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, []);

  // Play a random subtle computer click occasionally to add realism
  useEffect(() => {
    if (!isPlaying) return;

    const playRandomClick = () => {
      const freq = 600 + Math.random() * 800;
      const dur = 0.02 + Math.random() * 0.03;
      playSystemBeep(freq, dur);
    };

    const interval = setInterval(() => {
      if (Math.random() > 0.4) {
        playRandomClick();
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isPlaying, volume, systemBeepsEnabled]);

  return (
    <div className="fixed bottom-6 left-6 z-[60] flex items-center gap-3">
      {/* Audio Panel Container */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="hud-panel p-3 flex items-center gap-3 border-accent-blue/20 bg-space-950/80 backdrop-blur-md"
      >
        <button
          onClick={togglePlayback}
          className={`p-2.5 rounded-lg border transition-all duration-300 relative group flex items-center justify-center ${
            isPlaying 
              ? 'border-accent-teal/40 bg-accent-teal/10 text-accent-teal shadow-[0_0_10px_rgba(0,255,210,0.2)]' 
              : 'border-white/10 text-gray-400 hover:text-white hover:border-white/20'
          }`}
          aria-label="Toggle ambient spacecraft audio"
        >
          {isPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
          
          {/* Glowing scanner line on button when active */}
          {isPlaying && (
            <span className="absolute inset-0 rounded-lg overflow-hidden pointer-events-none">
              <span className="absolute left-0 right-0 h-[1px] bg-accent-teal/50 animate-pulse top-1/2" />
            </span>
          )}
        </button>

        {/* Small holographic visualizer bar */}
        <div className="flex items-end gap-[2px] h-6 px-1.5 border-l border-white/5">
          {Array.from({ length: 4 }).map((_, i) => (
            <motion.div
              key={i}
              className={`w-[3px] rounded-t-sm ${isPlaying ? 'bg-accent-teal' : 'bg-gray-700'}`}
              animate={isPlaying ? {
                height: [4, 20, 8, 24, 4][i % 4],
              } : { height: 4 }}
              transition={{
                duration: 0.5 + i * 0.1,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        {/* Console Text Readout */}
        <div className="flex flex-col text-[9px] font-mono leading-none tracking-widest text-gray-500 uppercase pr-1">
          <span className="text-gray-400 font-semibold">{isPlaying ? 'AMB ACTIVE' : 'AMB STDBY'}</span>
          <span className="text-[8px] mt-0.5">{isPlaying ? '55.4HZ DRONE' : 'MUTE'}</span>
        </div>
      </motion.div>
    </div>
  );
};

export default SoundController;
