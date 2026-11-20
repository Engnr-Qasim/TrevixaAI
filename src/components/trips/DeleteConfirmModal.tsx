import React from 'react';
import { motion } from 'motion/react';
import { Trash2, AlertTriangle, X } from 'lucide-react';
import { Button } from '../ui/button';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  tripTitle: string;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  tripTitle,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="p-6 rounded-3xl bg-white dark:bg-[#0b1120] border border-rose-200 dark:border-rose-950/60 shadow-2xl max-w-md w-full space-y-4 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
          <AlertTriangle className="w-5 h-5 shrink-0" />
          <h3 className="text-lg font-black text-[#111827] dark:text-white">Delete Trip Confirmation</h3>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
          Are you sure you want to delete <span className="font-bold text-slate-900 dark:text-white">"{tripTitle}"</span>?
          It will be soft-deleted and can be undone immediately from the toast notification.
        </p>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <Button variant="ghost" type="button" onClick={onClose} className="text-xs font-bold">
            Cancel
          </Button>
          <button
            onClick={async () => {
              await onConfirm();
              onClose();
            }}
            className="px-5 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs transition-colors flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete Trip</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
