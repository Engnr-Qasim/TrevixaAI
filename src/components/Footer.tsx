import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ExternalLink } from 'lucide-react';
import { APP_CONFIG, FOOTER_LINKS } from '../constants/app';
import { Badge } from './ui/badge';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200/80 bg-white/80 dark:border-slate-800/80 dark:bg-slate-950/80 backdrop-blur-xl transition-colors">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Brand Column */}
          <div className="space-y-4 lg:col-span-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 via-blue-500 to-sky-400 rounded-xl flex items-center justify-center text-white shadow-md shadow-blue-500/20 border border-blue-400/30">
                <Compass className="h-4 w-4" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                {APP_CONFIG.name}
              </span>
              <Badge variant="neon" className="text-[10px] font-bold">
                {APP_CONFIG.brandOwner}
              </Badge>
            </div>

            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              {APP_CONFIG.description}
            </p>

            <div className="flex items-center gap-2 pt-1">
              <div className="flex -space-x-2">
                <div className="w-7 h-7 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-600 dark:text-slate-300">SK</div>
                <div className="w-7 h-7 rounded-full border-2 border-white dark:border-slate-900 bg-blue-100 dark:bg-blue-900/80 flex items-center justify-center text-[10px] font-bold text-blue-700 dark:text-blue-300">HN</div>
                <div className="w-7 h-7 rounded-full border-2 border-white dark:border-slate-900 bg-sky-100 dark:bg-sky-900/80 flex items-center justify-center text-[10px] font-bold text-sky-700 dark:text-sky-300">SW</div>
              </div>
              <span className="text-xs font-bold text-slate-600 dark:text-slate-400 tracking-tight">
                Explore travel planning tools
              </span>
            </div>
          </div>

          {/* Nav Links */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                Platform
              </h3>
              <ul className="mt-4 space-y-2.5">
                {FOOTER_LINKS.platform.map((item) => (
                  <li key={item.title}>
                    <Link
                      to={item.href}
                      className="text-sm font-semibold text-[#4b5563] hover:text-sky-600 dark:text-[#cbd5e1] dark:hover:text-blue-400 transition-colors"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#6b7280] dark:text-slate-500">
                Explore
              </h3>
              <ul className="mt-4 space-y-2.5">
                {FOOTER_LINKS.explore.map((item) => (
                  <li key={item.title}>
                    <Link
                      to={item.href}
                      className="text-sm font-semibold text-[#4b5563] hover:text-sky-600 dark:text-[#cbd5e1] dark:hover:text-blue-400 transition-colors"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#6b7280] dark:text-slate-500">
                Ecosystem
              </h3>
              <ul className="mt-4 space-y-2.5">
                {FOOTER_LINKS.company.map((item) => (
                  <li key={item.title}>
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-semibold text-[#4b5563] hover:text-sky-600 dark:text-[#cbd5e1] dark:hover:text-blue-400 transition-colors"
                      >
                        <span>{item.title}</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : (
                      <Link
                        to={item.href}
                        className="text-sm font-semibold text-[#4b5563] hover:text-sky-600 dark:text-[#cbd5e1] dark:hover:text-blue-400 transition-colors"
                      >
                        {item.title}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-slate-100 dark:border-slate-800/80 pt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-sky-600 dark:text-blue-400 uppercase tracking-widest">
                Module Status
              </span>
              <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                Foundations v1.0.4 Active
              </span>
            </div>
            <div className="w-px h-6 bg-slate-200 dark:bg-slate-800"></div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              © {new Date().getFullYear()} {APP_CONFIG.name}. Built with ❤️ by {APP_CONFIG.parentCompany}.
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold text-slate-400">
            <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Technical Support</a>
            <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">API Docs</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
