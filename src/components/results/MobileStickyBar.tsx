import React from 'react';
import { Bookmark, Download, Share2, Sparkles } from 'lucide-react';

interface MobileStickyBarProps {
  onSave: () => void;
  onDownload: () => void;
  onShare: () => void;
  isSaved?: boolean;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({
  onSave,
  onDownload,
  onShare,
  isSaved,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden p-3 bg-slate-950/90 backdrop-blur-2xl border-t border-slate-800 shadow-2xl flex items-center justify-around gap-2">
      <button
        onClick={onSave}
        className={`flex-1 py-3 rounded-2xl border font-black text-xs flex items-center justify-center gap-2 transition-all ${
          isSaved
            ? 'bg-rose-500 text-white border-rose-500 shadow-lg shadow-rose-500/20'
            : 'bg-slate-900 text-white border-white/10'
        }`}
      >
        <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
        <span>{isSaved ? 'Saved' : 'Save'}</span>
      </button>

      <button
        onClick={onDownload}
        className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-black text-xs shadow-lg shadow-sky-500/20 flex items-center justify-center gap-2"
      >
        <Download className="w-4 h-4" />
        <span>Get PDF</span>
      </button>

      <button
        onClick={onShare}
        className="py-3 px-4 rounded-2xl bg-slate-900 text-white border border-white/10 font-black text-xs flex items-center justify-center"
      >
        <Share2 className="w-4 h-4" />
      </button>
    </div>
  );
};
