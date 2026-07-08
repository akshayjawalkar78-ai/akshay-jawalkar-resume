import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download, Eye, X, Terminal } from 'lucide-react';

const Resume = () => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  return (
    <section className="py-20 relative z-10 max-w-5xl mx-auto px-6 lg:px-12" id="resume">
      <div className="mb-12 text-center flex flex-col items-center">
        <h2 className="font-display text-2xl md:text-4xl font-bold tracking-tight mb-3 text-white uppercase">
          RESUME
        </h2>
        <div className="h-[1.5px] w-24 bg-accent-teal mb-4"></div>
        <p className="text-gray-500 max-w-lg text-xs font-mono tracking-wider">
          ACCESSING SECURE ENCRYPTED PROFILES... IDENTITY CONFIRMED. YOU MAY DOWNLOAD OR PREVIEW THE DOSSIER BELOW.
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-6">
        <button
          onClick={() => setIsPreviewOpen(true)}
          className="hud-panel-glow border border-accent-blue/20 bg-space-900/50 hover:bg-space-800/80 px-8 py-4 rounded-xl flex items-center gap-3 transition-all duration-300 font-mono text-sm tracking-widest text-accent-teal group"
          style={{ cursor: 'none' }}
        >
          <Eye size={18} className="group-hover:animate-pulse" />
          SHOW PREVIEW
        </button>

        <a
          href="/Akshay_Jawalkar_Resume.pdf"
          download
          className="hud-panel-glow border border-accent-purple/20 bg-space-900/50 hover:bg-space-800/80 px-8 py-4 rounded-xl flex items-center gap-3 transition-all duration-300 font-mono text-sm tracking-widest text-accent-purple group"
          style={{ cursor: 'none' }}
        >
          <Download size={18} className="group-hover:-translate-y-1 transition-transform" />
          DOWNLOAD RESUME
        </a>
      </div>

      {/* Fullscreen Preview Modal */}
      <AnimatePresence>
        {isPreviewOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 pt-20 md:p-12 bg-space-950/90 backdrop-blur-xl"
          >
            {/* Absolute floating close button */}
            <button
              onClick={() => setIsPreviewOpen(false)}
              className="absolute top-4 right-4 md:top-8 md:right-8 flex items-center gap-2 px-4 py-2 bg-red-500/90 text-white hover:bg-red-600 rounded-md transition-colors font-bold tracking-widest border border-red-400 z-[110] shadow-[0_0_15px_rgba(239,68,68,0.4)] backdrop-blur-md"
              style={{ cursor: 'none' }}
            >
              <span>CLOSE</span>
              <X size={20} />
            </button>

            <div className="w-full max-w-5xl h-full max-h-[90vh] hud-panel border-accent-teal/30 bg-space-900/90 relative flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-center md:justify-start p-4 border-b border-white/10 text-accent-teal font-mono tracking-widest text-xs">
                <div className="flex items-center gap-2">
                  <Terminal size={14} />
                  <span>DOSSIER_PREVIEW.PDF</span>
                </div>
              </div>

              {/* PDF Container */}
              <div className="flex-1 bg-white/5 p-4 md:p-8 overflow-hidden relative">
                {/* Fallback text while PDF loads or if not found */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-gray-500 font-mono text-xs opacity-50 tracking-widest">
                  <FileText size={48} className="mb-4 text-accent-teal/30" />
                  <span>LOADING SECURE DOCUMENT...</span>
                </div>
                
                <iframe
                  src="/Akshay_Jawalkar_Resume.pdf#toolbar=0&navpanes=0&scrollbar=0"
                  className="w-full h-full relative z-10 border-0 rounded"
                  title="Resume Preview"
                ></iframe>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Resume;
