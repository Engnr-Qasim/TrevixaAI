import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Edit3, X, Check } from 'lucide-react';
import { Button } from '../ui/button';

interface EditTitleModalProps {
  isOpen: boolean;
  currentTitle: string;
  onClose: () => void;
  onSave: (newTitle: string) => Promise<void>;
}

export const EditTitleModal: React.FC<EditTitleModalProps> = ({ isOpen, currentTitle, onClose, onSave }) => {
  const [title, setTitle] = useState(currentTitle);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setIsSubmitting(true);
    try {
      await onSave(title.trim());
      onClose();
    } catch {
      // ignore
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="p-6 rounded-3xl bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800 shadow-2xl max-w-md w-full space-y-5 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-sky-500">
          <Edit3 className="w-5 h-5" />
          <h3 className="text-lg font-black text-[#111827] dark:text-white tracking-tight">Edit Custom Trip Title</h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Trip Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Hunza Honeymoon 2027"
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#050b14] text-sm font-bold text-[#111827] dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button variant="ghost" type="button" onClick={onClose} className="text-xs font-bold">
              Cancel
            </Button>
            <Button variant="neon" type="submit" disabled={isSubmitting || !title.trim()} className="text-xs font-black gap-2">
              <Check className="w-4 h-4" />
              <span>{isSubmitting ? 'Saving...' : 'Save Title'}</span>
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
