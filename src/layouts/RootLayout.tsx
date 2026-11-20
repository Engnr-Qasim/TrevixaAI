import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { MobileBottomNav } from '../components/MobileBottomNav';

export const RootLayout: React.FC = () => {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-white text-[#111827] antialiased dark:bg-[#050b14] dark:text-white transition-colors duration-300 relative overflow-x-hidden">
      {/* Background Radial Grid Overlay with low opacity (3-5%) */}
      <div className="absolute inset-0 bg-radial-grid opacity-[0.04] pointer-events-none z-0"></div>

      {/* Floating Ambient Mesh Gradients */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-sky-400/10 dark:bg-blue-600/15 rounded-full blur-[120px] pointer-events-none z-0 animate-pulse"></div>
      <div className="absolute top-1/3 -right-40 w-[30rem] h-[30rem] bg-cyan-400/10 dark:bg-blue-500/10 rounded-full blur-[140px] pointer-events-none z-0"></div>
      <div className="absolute -bottom-40 left-1/3 w-[28rem] h-[28rem] bg-sky-500/10 dark:bg-blue-600/10 rounded-full blur-[130px] pointer-events-none z-0"></div>

      <Navbar />
      <main className="flex-1 w-full relative z-10 pb-20 lg:pb-0">
        <Outlet />
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
};

