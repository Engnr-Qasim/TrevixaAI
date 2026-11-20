import React from 'react';
import { motion } from 'motion/react';
import {
  Wallet,
  Car,
  Hotel,
  Utensils,
  Ticket,
  ShoppingBag,
  ShieldAlert,
  PieChart,
  ArrowUpRight,
} from 'lucide-react';

import { BudgetCategoryItem } from '../../types/tripResult';

interface BudgetBreakdownProps {
  totalBudget: number;
  customItems?: BudgetCategoryItem[];
}

export const BudgetBreakdown: React.FC<BudgetBreakdownProps> = ({ totalBudget, customItems }) => {
  const defaultItems = [
    {
      category: 'Hotels & Lodging',
      amount: Math.round(totalBudget * 0.38),
      percentage: 38,
      icon: Hotel,
      color: 'bg-sky-500 text-sky-500',
      barColor: 'bg-sky-500',
      description: '3-4 Star hotel rooms & resort stays with breakfast',
    },
    {
      category: 'Transport & Jeep Safari',
      amount: Math.round(totalBudget * 0.28),
      percentage: 28,
      icon: Car,
      color: 'bg-blue-600 text-blue-600',
      barColor: 'bg-blue-600',
      description: 'Private saloon car + 4x4 Jeep rentals for local transfers',
    },
    {
      category: 'Food & Mountain Cafes',
      amount: Math.round(totalBudget * 0.16),
      percentage: 16,
      icon: Utensils,
      color: 'bg-amber-500 text-amber-500',
      barColor: 'bg-amber-500',
      description: 'Local trout dinners, breakfasts & tea stops',
    },
    {
      category: 'Attractions & Fort Tickets',
      amount: Math.round(totalBudget * 0.08),
      percentage: 8,
      icon: Ticket,
      color: 'bg-purple-500 text-purple-500',
      barColor: 'bg-purple-500',
      description: 'Heritage fort entries, boat rides & national park permits',
    },
    {
      category: 'Shopping & Handicrafts',
      amount: Math.round(totalBudget * 0.05),
      percentage: 5,
      icon: ShoppingBag,
      color: 'bg-emerald-500 text-emerald-500',
      barColor: 'bg-emerald-500',
      description: 'Dry fruits, handwoven souvenirs & local crafts',
    },
    {
      category: 'Emergency Buffer',
      amount: Math.round(totalBudget * 0.05),
      percentage: 5,
      icon: ShieldAlert,
      color: 'bg-rose-500 text-rose-500',
      barColor: 'bg-rose-500',
      description: 'Unforeseen road delays or emergency buffer',
    },
  ];

  const iconsList = [Hotel, Car, Utensils, Ticket, ShoppingBag, ShieldAlert];
  const colorList = [
    { color: 'bg-sky-500 text-sky-500', barColor: 'bg-sky-500' },
    { color: 'bg-blue-600 text-blue-600', barColor: 'bg-blue-600' },
    { color: 'bg-amber-500 text-amber-500', barColor: 'bg-amber-500' },
    { color: 'bg-purple-500 text-purple-500', barColor: 'bg-purple-500' },
    { color: 'bg-emerald-500 text-emerald-500', barColor: 'bg-emerald-500' },
    { color: 'bg-rose-500 text-rose-500', barColor: 'bg-rose-500' },
  ];

  const items = customItems && customItems.length > 0
    ? customItems.map((ci, idx) => ({
        category: ci.category,
        amount: ci.amount,
        percentage: ci.percentage,
        description: ci.description,
        icon: iconsList[idx % iconsList.length],
        ...colorList[idx % colorList.length],
      }))
    : defaultItems;

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Wallet className="w-5 h-5 text-sky-500" />
            <h2 className="text-2xl font-black text-[#111827] dark:text-white tracking-tight">
              Estimated Budget Breakdown
            </h2>
          </div>
          <p className="text-xs text-[#4b5563] dark:text-[#cbd5e1] font-medium mt-0.5">
            Estimated costs in PKR. Confirm current prices with providers.
          </p>
        </div>

        {/* Total Price Card */}
        <div className="px-5 py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/20 flex items-center gap-3">
          <PieChart className="w-6 h-6 text-sky-200" />
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-sky-200 block">
              Total Estimated Trip Cost
            </span>
            <span className="text-xl font-black text-white">
              PKR {totalBudget.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Visual Multi-Segment Budget Distribution Bar */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#0b1120] border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between text-xs font-black text-slate-700 dark:text-slate-300">
          <span className="flex items-center gap-1.5">
            <PieChart className="w-4 h-4 text-sky-500" />
            <span>Budget Allocation Share</span>
          </span>
          <span className="text-slate-400 font-bold">100% Total Share</span>
        </div>

        {/* Stacked Multi-Color Progress Bar */}
        <div className="w-full h-4 rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden flex">
          {items.map((item, i) => (
            <motion.div
              key={item.category}
              initial={{ width: 0 }}
              animate={{ width: `${item.percentage}%` }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className={`h-full ${item.barColor} transition-all hover:opacity-80`}
              title={`${item.category}: PKR ${item.amount.toLocaleString()} (${item.percentage}%)`}
            />
          ))}
        </div>

        {/* Legend Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {items.map((item) => (
            <div
              key={item.category}
              className="px-2.5 py-1 rounded-full bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5"
            >
              <div className={`w-2.5 h-2.5 rounded-full ${item.barColor}`} />
              <span>{item.category}: <span className="font-black text-slate-900 dark:text-white">PKR {item.amount.toLocaleString()}</span></span>
            </div>
          ))}
        </div>
      </div>

      {/* Grid of Category Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.category}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: idx * 0.04 }}
              className="p-5 rounded-3xl bg-white dark:bg-[#0b1120] border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0`}>
                    <Icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-[#111827] dark:text-white">
                      {item.category}
                    </h3>
                    <span className="text-[11px] font-bold text-slate-400">
                      {item.percentage}% of total
                    </span>
                  </div>
                </div>

                <span className="text-base font-black text-[#111827] dark:text-white">
                  PKR {item.amount.toLocaleString()}
                </span>
              </div>

              <p className="text-xs text-[#4b5563] dark:text-[#cbd5e1] font-normal leading-relaxed">
                {item.description}
              </p>

              {/* Progress Bar */}
              <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.percentage}%` }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className={`h-full rounded-full ${item.barColor}`}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
