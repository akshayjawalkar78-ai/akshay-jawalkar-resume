import { useState, useRef, useEffect } from 'react';
import { Terminal, Send, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const MOCK_BIO = `AKSHAY JAWALKAR
====================
MISSION OBJECTIVE: Operating at the intersection of quantitative finance, clinical research, and scalable systems.
LOCATION: STANTON_PREP // JACKSONVILLE_FL // CLOUD_NODES
TELEMETRY: Active in SEO/Growth (Volta, MOSH, ThinkFinance), Equity Research (Advanced Equities), and Pharmacology (Synthica).`;

const HELP_TEXT = `AVAILABLE TELEMETRY COMMANDS:
-----------------------------
> help          - Displays available terminal commands
> about         - Access core mission parameters
> skills        - Scan capabilities & operational tools
> experience    - Retrieve flight timeline registry
> contact       - Establish secure communication uplink
> warp          - Engage warp drive engine core simulation
> clear         - Purge console screen buffer`;

const SKILLS_TEXT = `CAPABILITY MATRIX SCANS:
------------------------
[RESEARCH] Equity Research, Valuation Modeling, BLS/SBA Datasets, Pathophysiology
[STRATEGY] Campaign Management, Competitive Analysis, Strategic Outreach, Leadership
[TECHNICAL] JavaScript, React, Tailwind CSS, Data Cleaning, Spreadsheet Analysis`;

const EXP_TEXT = `FLIGHT LOG HISTORICAL TIMELINE:
-------------------------------
[2026.05 - PRES] Advanced Equities -> Investment Analyst (Live $15.5k Portfolio)
[2026.05 - PRES] USA Economics Olympiad -> IT & Marketing SEO Specialist
[2026.04 - PRES] Synthica -> Pharmacology Researcher (Antihistamines vs Bone Cells)
[2026.04 - PRES] ThinkFinance -> External Partnerships Outreach
[2026.04 - PRES] Mind4Youth -> Marketing Intern / Multi-channel Growth
[PRESENT]        Equity Economics Research Lab -> Data Analyst (BLS/SBA Databases)
[PRESENT]        ActiveRecallCoach -> Founder & Lead Developer`;

const CONTACT_TEXT = `COMMUNICATION UPLINK SECURE:
-----------------------------
EMAIL  : akshay.jawalkar78@gmail.com
GITHUB : https://github.com/akshayjawalkar78-ai
STATUS : OPEN TO MISSION ROLES / QUANTITATIVE AND RESEARCH INITIATIVES`;

const AIAssistant = ({ onWarpTrigger }) => {
  const [history, setHistory] = useState([
    { text: 'TELEMETRY TERMINAL v4.0.2', type: 'system' },
    { text: 'Type "help" to display available diagnostics commands.', type: 'system' }
  ]);
  const [input, setInput] = useState('');
  const terminalEndRef = useRef(null);

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  const handleCommand = (cmd) => {
    const cleanCmd = cmd.trim().toLowerCase();
    let response = '';
    let isWarp = false;

    if (cleanCmd === '') return;

    // Add prompt line
    const nextHistory = [...history, { text: `> ${cmd}`, type: 'input' }];

    switch (cleanCmd) {
      case 'help':
        response = HELP_TEXT;
        break;
      case 'about':
      case 'bio':
        response = MOCK_BIO;
        break;
      case 'skills':
      case 'capabilities':
        response = SKILLS_TEXT;
        break;
      case 'experience':
      case 'timeline':
        response = EXP_TEXT;
        break;
      case 'contact':
      case 'email':
        response = CONTACT_TEXT;
        break;
      case 'warp':
        response = 'WARP DRIVE ENGAGING... PREPARE FOR HYPERSPACE JUMP!';
        isWarp = true;
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      default:
        response = `COMMAND NOT FOUND: "${cmd}". Type "help" for a list of telemetry directives.`;
    }

    setHistory([...nextHistory, { text: response, type: 'output' }]);
    setInput('');

    if (isWarp && onWarpTrigger) {
      setTimeout(() => {
        onWarpTrigger();
      }, 500);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCommand(input);
  };

  return (
    <div className="hud-panel border-accent-blue/20 bg-space-950/75 p-6 font-mono text-xs leading-relaxed max-w-2xl mx-auto w-full relative z-10 hud-scanline">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between border-b border-accent-blue/15 pb-3 mb-4 text-accent-blue/80 text-[10px] tracking-wider">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-accent-teal" />
          <span>COSMIC TELEMETRY CONSOLE</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-accent-teal animate-pulse" />
          <span>PORT: 8080 // ONLINE</span>
        </div>
      </div>

      {/* Console history buffer */}
      <div className="h-64 overflow-y-auto pr-2 mb-4 space-y-3 font-mono scrollbar-thin scrollbar-thumb-white/10 text-left">
        {history.map((line, idx) => (
          <div 
            key={idx} 
            className={`whitespace-pre-wrap ${
              line.type === 'system' 
                ? 'text-gray-500' 
                : line.type === 'input' 
                  ? 'text-accent-blue font-semibold' 
                  : 'text-accent-teal'
            }`}
          >
            {line.text}
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      {/* Command input prompt */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-accent-blue/15 pt-3">
        <ChevronRight size={14} className="text-accent-blue animate-pulse shrink-0" />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="ENTER DIRECTIVE (e.g. 'help', 'skills', 'warp')..."
          className="bg-transparent border-0 outline-0 ring-0 text-accent-teal placeholder-gray-600 w-full font-mono text-xs focus:ring-0 focus:outline-none"
          style={{ cursor: 'none' }}
        />
        <button 
          type="submit" 
          className="p-1.5 text-accent-blue hover:text-accent-teal transition-colors focus:outline-none"
          style={{ cursor: 'none' }}
        >
          <Send size={14} />
        </button>
      </form>
    </div>
  );
};

export default AIAssistant;
