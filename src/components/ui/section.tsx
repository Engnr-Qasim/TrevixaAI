import * as React from 'react';
import { cn } from '../../lib/utils';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  containerClassName?: string;
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, containerClassName, children, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn('py-12 md:py-16 lg:py-20', className)}
        {...props}
      >
        <div
          className={cn(
            'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8',
            containerClassName
          )}
        >
          {children}
        </div>
      </section>
    );
  }
);
Section.displayName = 'Section';

const SectionHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('mb-8 max-w-3xl space-y-3 md:mb-12', className)}
    {...props}
  />
));
SectionHeader.displayName = 'SectionHeader';

const SectionTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      'text-2xl font-bold tracking-tight text-[#111827] sm:text-3xl md:text-4xl dark:text-white',
      className
    )}
    {...props}
  />
));
SectionTitle.displayName = 'SectionTitle';

const SectionDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      'text-base text-[#374151] sm:text-lg dark:text-[#cbd5e1] leading-relaxed font-normal',
      className
    )}
    {...props}
  />
));
SectionDescription.displayName = 'SectionDescription';

export { Section, SectionHeader, SectionTitle, SectionDescription };
