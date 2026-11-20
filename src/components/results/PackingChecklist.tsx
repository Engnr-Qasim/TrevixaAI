import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckSquare, Square, CheckCircle2, RefreshCw, FileText, Shirt, Smartphone, Stethoscope, Mountain, ShieldCheck } from 'lucide-react';

interface ChecklistItem {
  id: string;
  category: 'Documents' | 'Clothing' | 'Electronics' | 'Medicine' | 'Outdoor Gear' | 'Personal Essentials';
  label: string;
}

interface PackingChecklistProps {
  customItems?: any[];
}

export const PackingChecklist: React.FC<PackingChecklistProps> = ({ customItems }) => {
  const defaultItems: ChecklistItem[] = [
    // Documents
    { id: 'p1', category: 'Documents', label: 'Original CNIC / Passport & photocopies' },
    { id: 'p2', category: 'Documents', label: 'Hotel booking confirmations & voucher PDFs' },
    { id: 'p3', category: 'Documents', label: 'Physical cash PKR 30,000 (ATMs are rare in Gojal)' },
    
    // Clothing
    { id: 'p4', category: 'Clothing', label: 'Heavy windproof thermal jacket' },
    { id: 'p5', category: 'Clothing', label: 'Layerable fleece jacket & warm wool sweater' },
    { id: 'p6', category: 'Clothing', label: 'Comfortable trek pants & breathable cotton t-shirts' },
    
    // Electronics
    { id: 'p7', category: 'Electronics', label: '20,000mAh high-capacity fast-charging power bank' },
    { id: 'p8', category: 'Electronics', label: 'DSLR Camera / Drone with extra memory cards' },
    { id: 'p9', category: 'Electronics', label: 'Car mobile charger & universal plug adapter' },
    
    // Medicine
    { id: 'p10', category: 'Medicine', label: 'High-altitude motion sickness pills (Acetazolamide)' },
    { id: 'p11', category: 'Medicine', label: 'First aid bandages, antiseptic wipes & ORS hydration salts' },
    { id: 'p12', category: 'Medicine', label: 'Personal prescription medications & pain relievers' },
    
    // Outdoor Gear
    { id: 'p13', category: 'Outdoor Gear', label: 'Waterproof ankle trekking boots with solid grip' },
    { id: 'p14', category: 'Outdoor Gear', label: 'Insulated stainless steel water thermal flask' },
    { id: 'p15', category: 'Outdoor Gear', label: 'Lightweight daypack (20-30L) with rain cover' },

    // Personal Essentials
    { id: 'p16', category: 'Personal Essentials', label: 'UV protection sunglasses & SPF 50+ sunscreen' },
    { id: 'p17', category: 'Personal Essentials', label: 'Lip balm, heavy moisturizer & wet wipes' },
    { id: 'p18', category: 'Personal Essentials', label: 'Hand sanitizer & travel toiletries kit' },
  ];

  const initialItems: ChecklistItem[] = customItems && customItems.length > 0
    ? customItems.map((ci, idx) => ({
        id: ci.id || `custom-${idx}`,
        category: (ci.category as any) || 'Personal Essentials',
        label: ci.label || ci.name || 'Essential Travel Item',
      }))
    : defaultItems;

  const [checkedIds, setCheckedIds] = useState<string[]>(['p1', 'p4', 'p7', 'p10', 'p13', 'p16']);

  const toggleCheck = (id: string) => {
    if (checkedIds.includes(id)) {
      setCheckedIds(checkedIds.filter((i) => i !== id));
    } else {
      setCheckedIds([...checkedIds, id]);
    }
  };

  const handleSelectAll = () => {
    setCheckedIds(initialItems.map((i) => i.id));
  };

  const handleReset = () => {
    setCheckedIds([]);
  };

  const progressPercent = Math.round((checkedIds.length / initialItems.length) * 100);

  const categories: ChecklistItem['category'][] = [
    'Documents',
    'Clothing',
    'Electronics',
    'Medicine',
    'Outdoor Gear',
    'Personal Essentials',
  ];

  const categoryIcons = {
    Documents: FileText,
    Clothing: Shirt,
    Electronics: Smartphone,
    Medicine: Stethoscope,
    'Outdoor Gear': Mountain,
    'Personal Essentials': ShieldCheck,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            <h2 className="text-2xl font-black text-[#111827] dark:text-white tracking-tight">
              Smart Interactive Packing Checklist
            </h2>
          </div>
          <p className="text-xs text-[#4b5563] dark:text-[#cbd5e1] font-medium mt-0.5">
            Tailored gear checklist categorized by documents, clothing, electronics, medicine, gear & essentials.
          </p>
        </div>

        {/* Controls & Progress */}
        <div className="flex items-center gap-3">
          <button
            onClick={progressPercent === 100 ? handleReset : handleSelectAll}
            className="px-3.5 py-2 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-black transition-colors flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5 text-sky-500" />
            <span>{progressPercent === 100 ? 'Reset All' : 'Select All'}</span>
          </button>

          <div className="px-4 py-2 rounded-2xl bg-slate-900 text-white border border-slate-800 flex items-center gap-3">
            <div className="space-y-0.5 text-right">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">
                Packed
              </span>
              <span className="text-xs font-black text-emerald-400">
                {checkedIds.length} / {initialItems.length}
              </span>
            </div>

            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-xs border border-emerald-500/40">
              {progressPercent}%
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-sky-500 via-blue-500 to-emerald-400 rounded-full"
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Categorized Checklist Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map((cat) => {
          const catItems = initialItems.filter((i) => i.category === cat);
          const CategoryIcon = categoryIcons[cat];
          if (catItems.length === 0) return null;

          return (
            <div
              key={cat}
              className="p-5 rounded-3xl bg-white dark:bg-[#0b1120] border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3"
            >
              <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                <CategoryIcon className="w-4 h-4 text-sky-500 shrink-0" />
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200">
                  {cat}
                </h3>
              </div>

              <div className="space-y-2">
                {catItems.map((item) => {
                  const isChecked = checkedIds.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      onClick={() => toggleCheck(item.id)}
                      className={`w-full p-2.5 rounded-xl border text-left text-xs font-bold transition-all flex items-center gap-2.5 ${
                        isChecked
                          ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 line-through opacity-85'
                          : 'bg-slate-50 dark:bg-slate-900/80 text-slate-800 dark:text-slate-200 border-slate-100 dark:border-slate-800 hover:border-sky-400'
                      }`}
                    >
                      {isChecked ? (
                        <CheckSquare className="w-4 h-4 text-emerald-500 shrink-0" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                      <span className="leading-snug">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
