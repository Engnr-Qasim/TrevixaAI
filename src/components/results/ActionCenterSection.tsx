import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, Share2, Copy, Printer, PlusCircle, Check, X, MessageSquare, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ActionCenterSectionProps {
  onToast: (msg: string) => void;
  tripSummaryText?: string;
  destinationName?: string;
}

export const ActionCenterSection: React.FC<ActionCenterSectionProps> = ({
  onToast,
  tripSummaryText,
  destinationName = 'Hunza Valley',
}) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);

  const handleCopySummary = () => {
    const summary = tripSummaryText || `Trevixa AI Custom Itinerary for ${destinationName}: Optimized 5-day route covering heritage fort tours, mountain lakes, jeep safari, and curated trout dining in Gilgit-Baltistan.`;
    navigator.clipboard?.writeText(summary);
    setCopiedSummary(true);
    onToast('📋 Trip summary copied to clipboard!');
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    onToast('🔗 Trip URL copied to clipboard!');
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handlePrint = () => {
    onToast('🖨️ Opening print view for itinerary...');
    setTimeout(() => {
      window.print();
    }, 500);
  };

  const handleDownloadPDF = () => {
    onToast('📄 Preparing high-resolution PDF itinerary download...');
    setTimeout(() => {
      window.print();
    }, 800);
  };

  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`Check out my custom AI travel itinerary for ${destinationName} on Trevixa: ${window.location.href}`)}`;

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-950 to-blue-950 text-white border border-slate-800 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-sky-400 block mb-1">
            Trip Management & Export
          </span>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Action Center
          </h2>
          <p className="text-xs text-slate-300 font-medium">
            Copy summary, share itinerary link, print physical copy, or download high-res PDF.
          </p>
        </div>
      </div>

      {/* Grid of 5 Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* 1. Copy Summary */}
        <button
          onClick={handleCopySummary}
          className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-sky-500 text-left transition-all hover:scale-[1.02] space-y-2 group"
        >
          <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center group-hover:bg-sky-500 group-hover:text-white transition-colors">
            {copiedSummary ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
          </div>
          <div>
            <h3 className="text-sm font-black text-white">Copy Summary</h3>
            <span className="text-[11px] text-slate-400 block">Copy AI trip text</span>
          </div>
        </button>

        {/* 2. Share Plan Modal */}
        <button
          onClick={() => setIsShareModalOpen(true)}
          className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-sky-500 text-left transition-all hover:scale-[1.02] space-y-2 group"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-colors">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-black text-white">Share Plan</h3>
            <span className="text-[11px] text-slate-400 block">WhatsApp & link share</span>
          </div>
        </button>

        {/* 3. Download PDF */}
        <button
          onClick={handleDownloadPDF}
          className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-sky-500 text-left transition-all hover:scale-[1.02] space-y-2 group"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center group-hover:bg-purple-500 group-hover:text-white transition-colors">
            <Download className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-black text-white">Download PDF</h3>
            <span className="text-[11px] text-slate-400 block">Formatted offline PDF</span>
          </div>
        </button>

        {/* 4. Print Trip */}
        <button
          onClick={handlePrint}
          className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-sky-500 text-left transition-all hover:scale-[1.02] space-y-2 group"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-white transition-colors">
            <Printer className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-black text-white">Print Itinerary</h3>
            <span className="text-[11px] text-slate-400 block">Printer layout</span>
          </div>
        </button>

        {/* 5. Plan New Trip */}
        <Link to="/plan-trip" className="block">
          <button className="w-full p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-sky-500 text-left transition-all hover:scale-[1.02] space-y-2 group">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-black text-white">Plan New Trip</h3>
              <span className="text-[11px] text-slate-400 block">Start AI wizard</span>
            </div>
          </button>
        </Link>
      </div>

      {/* Share Modal Dialog */}
      <AnimatePresence>
        {isShareModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsShareModalOpen(false)}
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-2xl max-w-md w-full space-y-5 relative"
            >
              <button
                onClick={() => setIsShareModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <h3 className="text-lg font-black text-white">Share Travel Plan</h3>
                <p className="text-xs text-slate-400">
                  Share this custom AI travel plan for {destinationName} with friends and family.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                {/* Copy Link Button */}
                <button
                  onClick={handleCopyLink}
                  className="w-full p-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-between text-xs font-bold transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Copy className="w-4 h-4 text-sky-400" />
                    <span>Copy Page URL Link</span>
                  </span>
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <span className="text-sky-400">Copy</span>}
                </button>

                {/* WhatsApp Share */}
                <a
                  href={whatsappShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full p-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-between text-xs font-bold transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-white" />
                    <span>Share via WhatsApp</span>
                  </span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
