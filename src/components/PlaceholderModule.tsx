import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Sparkles, Layers, ShieldCheck } from 'lucide-react';
import { Section, SectionHeader, SectionTitle, SectionDescription } from './ui/section';
import { Card, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

export interface ModuleFeature {
  title: string;
  description: string;
}

export interface PlaceholderModuleProps {
  badge: string;
  title: string;
  subtitle: string;
  routePath: string;
  features: ModuleFeature[];
  primaryCtaText?: string;
  primaryCtaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  icon?: React.ReactNode;
}

export const PlaceholderModule: React.FC<PlaceholderModuleProps> = ({
  badge,
  title,
  subtitle,
  routePath,
  features,
  primaryCtaText = 'Explore Architecture',
  primaryCtaLink = '/plan-trip',
  secondaryCtaText = 'View All Destinations',
  secondaryCtaLink = '/destinations',
  icon,
}) => {
  return (
    <div className="w-full">
      {/* Hero Header Section */}
      <Section className="py-12 sm:py-16">
        <div className="flex flex-col items-start gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="neon" className="gap-1 px-3 py-1 text-[11px] font-bold">
              <Sparkles className="h-3.5 w-3.5" />
              {badge}
            </Badge>
            <Badge variant="outline" className="font-mono text-xs text-slate-500 dark:text-slate-400">
              {routePath}
            </Badge>
            <Badge variant="secondary" className="gap-1 text-xs">
              <ShieldCheck className="h-3.5 w-3.5 text-sky-500 dark:text-blue-400" />
              Architecture Ready
            </Badge>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-3 max-w-3xl"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#111827] dark:text-white flex items-center gap-3">
              {icon && <span className="p-2.5 rounded-2xl bg-sky-50 dark:bg-blue-950/80 text-sky-600 dark:text-blue-400 border border-sky-100 dark:border-blue-800/60 shadow-md shadow-sky-500/10">{icon}</span>}
              <span>{title}</span>
            </h1>
            <p className="text-lg sm:text-xl text-[#374151] dark:text-[#f3f4f6] leading-relaxed font-normal">
              {subtitle}
            </p>
          </motion.div>

          <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <Link to={primaryCtaLink} className="w-full sm:w-auto">
              <Button variant="neon" size="lg" className="w-full sm:w-auto h-12 py-3.5 px-6 text-sm font-extrabold rounded-2xl gap-2 active:scale-95 transition-transform shadow-lg shadow-sky-500/20">
                <span>{primaryCtaText}</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to={secondaryCtaLink} className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto h-12 py-3.5 px-6 text-sm font-extrabold rounded-2xl active:scale-95 transition-transform">
                {secondaryCtaText}
              </Button>
            </Link>
          </div>
        </div>
      </Section>

      {/* Module Overview & Feature Scope Cards */}
      <Section className="pt-0">
        <SectionHeader>
          <div className="flex items-center gap-2 text-sky-600 dark:text-blue-400 font-bold text-xs uppercase tracking-widest">
            <Layers className="h-4 w-4" />
            <span>Planned Module Capabilities</span>
          </div>
          <SectionTitle>Engineered for Scalability</SectionTitle>
          <SectionDescription>
            This module foundation is fully initialized with clean component architecture, responsive grid layout, and state hooks prepared for full logic implementation.
          </SectionDescription>
        </SectionHeader>

        {/* Mobile Swipe Hint Badge */}
        <div className="flex items-center justify-between md:hidden mb-3 px-1 text-xs font-extrabold text-sky-600 dark:text-blue-400">
          <span>Module Highlights</span>
          <span className="text-[11px] text-slate-400 flex items-center gap-1">
            <span>Swipe features</span>
            <ArrowRight className="w-3 h-3" />
          </span>
        </div>

        {/* Swipeable on Mobile/Tablet, Grid on Desktop */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 no-scrollbar md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 md:overflow-visible md:pb-0">
          {features.map((feat, idx) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: idx * 0.05 }}
              className="w-[84vw] max-w-[320px] shrink-0 snap-center md:w-auto md:shrink-1"
            >
              <Card className="h-full border-slate-200/80 dark:border-slate-800/80 hover:border-sky-500/50 dark:hover:border-blue-500/50 hover:shadow-sky-500/10 dark:hover:shadow-blue-500/10 transition-all rounded-[2rem] p-1">
                <CardHeader>
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-8 h-8 rounded-xl bg-sky-50 dark:bg-blue-950 text-sky-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-base font-extrabold">{feat.title}</CardTitle>
                  </div>
                  <CardDescription className="text-xs sm:text-sm leading-relaxed">{feat.description}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>
    </div>
  );
};
