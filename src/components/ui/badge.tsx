import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.15em] transition-all focus:outline-none focus:ring-2 focus:ring-sky-500 dark:focus-visible:ring-blue-500',
  {
    variants: {
      variant: {
        default:
          'border border-sky-200 bg-sky-50/90 text-sky-800 shadow-sm dark:bg-[#0b1120] dark:text-sky-300 dark:border-blue-900/80',
        neon:
          'border border-sky-300/80 bg-sky-100/90 text-sky-900 shadow-sm dark:bg-blue-950/90 dark:text-blue-200 dark:border-blue-800/80',
        emerald:
          'border border-sky-200 bg-sky-50/90 text-sky-800 shadow-sm dark:bg-[#0b1120] dark:text-sky-300 dark:border-blue-900/80',
        sky:
          'border border-sky-200 bg-sky-50/90 text-sky-800 shadow-sm dark:bg-[#0b1120] dark:text-sky-300 dark:border-blue-900/80',
        secondary:
          'border border-slate-200 bg-slate-100/90 text-slate-700 dark:bg-slate-800/80 dark:text-slate-300 dark:border-slate-700',
        outline:
          'text-slate-700 dark:text-slate-300 border border-slate-300/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md',
        purple:
          'border border-indigo-200 bg-indigo-50 text-indigo-700 shadow-sm dark:bg-indigo-950/80 dark:text-indigo-300 dark:border-indigo-800/60',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  children?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant,
  children,
  ...props
}) => {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {children}
    </div>
  );
};

export { badgeVariants };
