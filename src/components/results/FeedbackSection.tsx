import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ThumbsUp, ThumbsDown, CheckCircle, Send, Sparkles } from 'lucide-react';

export const FeedbackSection: React.FC = () => {
  const [feedback, setFeedback] = useState<'positive' | 'negative' | null>(null);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0b1120] border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-sky-50 dark:bg-blue-950 text-sky-600 dark:text-sky-400 flex items-center justify-center font-black">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-black text-[#111827] dark:text-white">
              Was this AI-generated plan helpful?
            </h3>
            <p className="text-xs text-[#4b5563] dark:text-[#cbd5e1] font-medium">
              Your feedback trains Trevixa's route & hotel optimization models.
            </p>
          </div>
        </div>

        {/* Thumbs buttons */}
        {!submitted && (
          <div className="flex items-center gap-3">
            <button
              onClick={() => setFeedback('positive')}
              className={`px-4 py-2.5 rounded-xl border text-xs font-black transition-all flex items-center gap-2 ${
                feedback === 'positive'
                  ? 'bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-500/20'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-emerald-500'
              }`}
            >
              <ThumbsUp className="w-4 h-4" />
              <span>Yes, Helpful</span>
            </button>

            <button
              onClick={() => setFeedback('negative')}
              className={`px-4 py-2.5 rounded-xl border text-xs font-black transition-all flex items-center gap-2 ${
                feedback === 'negative'
                  ? 'bg-rose-500 text-white border-rose-500 shadow-md shadow-rose-500/20'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-rose-500'
              }`}
            >
              <ThumbsDown className="w-4 h-4" />
              <span>Needs Work</span>
            </button>
          </div>
        )}
      </div>

      {/* Comment Form when feedback selected */}
      {feedback && !submitted && (
        <motion.form
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          onSubmit={handleSubmit}
          className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3"
        >
          <div className="flex gap-2">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="What did you like or wish to improve? (Optional)"
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:border-sky-500"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-sky-500 text-white text-xs font-black hover:bg-sky-600 transition-colors flex items-center gap-1.5"
            >
              <span>Submit</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.form>
      )}

      {/* Thank you message */}
      {submitted && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-black flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-500" />
          <span>Thank you! Your feedback helps us build smarter travel algorithms.</span>
        </div>
      )}
    </div>
  );
};
