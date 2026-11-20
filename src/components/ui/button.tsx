import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] cursor-pointer',
  {
    variants: {
      variant: {
        default:
          'bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 shadow-md shadow-slate-200/50 dark:shadow-none',
        neon:
          'bg-sky-500 text-white hover:bg-sky-600 dark:bg-blue-600 dark:hover:bg-blue-500 dark:text-white shadow-lg shadow-sky-500/20 dark:shadow-blue-500/25 border border-sky-400/30 dark:border-blue-400/30',
        emerald:
          'bg-sky-500 text-white hover:bg-sky-600 dark:bg-blue-600 dark:hover:bg-blue-500 dark:text-white shadow-lg shadow-sky-500/20 dark:shadow-blue-500/25 border border-sky-400/30 dark:border-blue-400/30',
        blue:
          'bg-gradient-to-r from-sky-500 via-cyan-500 to-sky-600 dark:from-blue-600 dark:via-blue-500 dark:to-sky-500 text-white hover:opacity-95 shadow-lg shadow-sky-500/25 dark:shadow-blue-500/30 border border-sky-400/30 dark:border-blue-400/30',
        secondary:
          'bg-slate-100 text-slate-800 hover:bg-slate-200/80 dark:bg-slate-800/80 dark:text-slate-100 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60',
        outline:
          'border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-[#0b1120]/80 hover:bg-slate-50 dark:hover:bg-slate-800/80 text-slate-800 dark:text-slate-100 shadow-sm backdrop-blur-md',
        ghost:
          'hover:bg-sky-50 text-slate-700 hover:text-sky-600 dark:hover:bg-blue-950/50 dark:text-slate-300 dark:hover:text-blue-400',
        link: 'text-sky-600 underline-offset-4 hover:underline dark:text-blue-400 p-0 h-auto font-bold',
      },
      size: {
        default: 'h-10 px-5 py-2.5',
        sm: 'h-8 px-3.5 text-xs',
        lg: 'h-12 px-8 text-base',
        icon: 'h-10 w-10 p-0 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
