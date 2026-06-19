import { useState, useRef, useEffect } from 'react';
import { Terminal, Send, ChevronRight } from 'lucide-react';

const MOCK_BIO = `AKSHAY JAWALKAR
====================
PROFILE: Operating at the intersection of quantitative finance, clinical research, and scalable systems.
LOCATION: Jacksonville, FL // Stanton College Prep
FOCUS: SEO/Growth, equity research, pharmacology, and product engineering.`;

const HELP_TEXT = `AVAILABLE PROFILE COMMANDS:
---------------------------
> help       - Displays available commands
> about      - Shows a professional summary
> skills     - Lists key capabilities and tools
> experience - Reviews career timeline and roles
> contact    - Provides contact information
> clear      - Clears the console history`;

const SKILLS_TEXT = `SKILLS & TOOLS:
---------------
[RESEARCH] Equity Research, Valuation Modeling, BLS/SBA Data Research, Pathophysiology
[STRATEGY] Campaign Management, Competitive Analysis, Leadership, Outreach
[TECHNICAL] JavaScript, React, Tailwind CSS, Data Cleaning, Spreadsheet Analysis`;

const EXP_TEXT = `PROFESSIONAL TIMELINE:
----------------------
[2026.05 - PRES] Advanced Equities -> Investment Analyst (Live $15.5k Portfolio)
[2026.05 - PRES] USA Economics Olympiad -> IT & Marketing SEO Specialist
[2026.04 - PRES] Synthica -> Pharmacology Researcher (Antihistamines vs Bone Cells)
[2026.04 - PRES] ThinkFinance -> External Partnerships Outreach
[2026.04 - PRES] Mind4Youth -> Marketing Intern / Multi-channel Growth
[PRESENT]        Equity Economics Research Lab -> Data Analyst (BLS/SBA Databases)
[PRESENT]        ActiveRecallCoach -> Founder & Lead Developer`;

const CONTACT_TEXT = `CONTACT INFORMATION:
--------------------
EMAIL  : akshay.jawalkar78@gmail.com
GITHUB : https://github.com/akshayjawalkar78-ai
STATUS : Open to quantitative, research, and software development opportunities.`;

const AIAssistant = () => {
  const [history, setHistory] = useState([
    { text: 'INTERACTIVE PROFILE CONSOLE', type: 'system' },
    { text: 'Type "help" to display available commands.', type: 'system' }
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

    if (cleanCmd === '') return;

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
      case 'resume':
        response = EXP_TEXT;
        break;
      case 'contact':
      case 'email':
        response = CONTACT_TEXT;
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      default:
        response = `COMMAND NOT FOUND: "${cmd}". Type "help" for available commands.`;
    }

    setHistory([...nextHistory, { text: response, type: 'output' }]);
    setInput('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCommand(input);
  };

  return (
    <div className="hud-panel border-accent-blue/20 bg-space-950/75 p-6 font-mono text-xs leading-relaxed max-w-2xl mx-auto w-full relative z-10 hud-scanline">
      <div className="flex items-center justify-between border-b border-accent-blue/15 pb-3 mb-4 text-accent-blue/80 text-[10px] tracking-wider">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-accent-teal" />
          <span>PROFILE CONSOLE</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-accent-teal animate-pulse" />
          <span>STATUS: READY</span>
        </div>
      </div>

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
            }`}>
            {line.text}
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-accent-blue/15 pt-3">
        <ChevronRight size={14} className="text-accent-blue animate-pulse shrink-0" />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type 'help', 'about', 'skills', 'experience', 'contact', or 'clear'..."
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
