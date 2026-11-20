import React from 'react';
import { Info, Sparkles, Compass, Shield } from 'lucide-react';
import { Section, SectionHeader, SectionTitle, SectionDescription } from '../components/ui/section';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { APP_CONFIG } from '../constants/app';

export const AboutPage: React.FC = () => {
  return (
    <div className="w-full">
      <Section className="bg-gradient-to-b from-blue-500/5 via-transparent to-transparent dark:from-blue-500/10">
        <div className="max-w-3xl space-y-4">
          <Badge variant="neon" className="gap-1 px-3 py-1 text-xs">
            <Sparkles className="h-3.5 w-3.5" />
            About Trevixa
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#111827] dark:text-white">
            Plan Smart. Travel Better.
          </h1>
          <p className="text-lg text-[#374151] dark:text-[#f3f4f6] leading-relaxed">
            {APP_CONFIG.name} is a next-generation AI travel assistant designed specifically for travelers exploring the rich landscapes, heritage, and culture of Pakistan.
          </p>
          <div className="pt-2">
            <Badge variant="secondary" className="text-xs">
              {APP_CONFIG.brandOwner}
            </Badge>
          </div>
        </div>
      </Section>

      <Section className="pt-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="h-full">
            <CardHeader>
              <Compass className="h-8 w-8 text-sky-500 dark:text-blue-400 mb-2" />
              <CardTitle>Vision & Mission</CardTitle>
              <CardDescription>
                To make travel across Pakistan accessible, organized, transparent, and enjoyable for both local and international travelers.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="h-full">
            <CardHeader>
              <Sparkles className="h-8 w-8 text-sky-500 dark:text-blue-400 mb-2" />
              <CardTitle>AI Engineering</CardTitle>
              <CardDescription>
                Combining domain-specific travel data, seasonal accessibility insights, and intelligent budgeting engines to generate optimized itineraries.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="h-full">
            <CardHeader>
              <Shield className="h-8 w-8 text-indigo-500 mb-2" />
              <CardTitle>Nexora Product Standard</CardTitle>
              <CardDescription>
                Built to enterprise SaaS standards with clean modular code, dark mode support, mobile-first responsiveness, and intuitive design.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </Section>
    </div>
  );
};
