import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, ArrowLeft } from 'lucide-react';
import { Section } from '../components/ui/section';
import { Button } from '../components/ui/button';

export const NotFoundPage: React.FC = () => {
  return (
    <Section className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center space-y-6 max-w-md mx-auto">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400">
          <Compass className="h-8 w-8 animate-spin-slow" />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            404 - Page Not Found
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            The travel route or destination page you are looking for does not exist or has moved.
          </p>
        </div>
        <div className="flex justify-center gap-3 pt-2">
          <Link to="/">
            <Button className="gap-2">
              <Home className="h-4 w-4" />
              <span>Return Home</span>
            </Button>
          </Link>
          <Button variant="outline" onClick={() => window.history.back()} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Go Back</span>
          </Button>
        </div>
      </div>
    </Section>
  );
};
