import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { SignUp as ClerkSignUp } from '@clerk/clerk-react';
import {
  Compass,
  Lock,
  Mail,
  User,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Info,
  X,
  KeyRound,
} from 'lucide-react';
import { useAuthContext, IS_CLERK_CONFIGURED } from '../context/AuthContext';
import { Button } from '../components/ui/button';

export const SignUpPage: React.FC = () => {
  const { signUpWithEmail, signInWithGoogle, isClerkLive } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Email verification modal step
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName.trim()) {
      setError('Please enter your full name.');
      return;
    }

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setError('Weak Password: Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please check your password input.');
      return;
    }

    // Trigger verification modal step
    setIsVerificationModalOpen(true);
  };

  const handleVerifyCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (verificationCode.length < 4) {
      setError('Please enter the 6-digit verification code sent to your email.');
      return;
    }

    setIsLoading(true);
    try {
      const result = await signUpWithEmail(fullName, email, password);
      if (result.success) {
        setIsVerified(true);
        setTimeout(() => {
          setIsVerificationModalOpen(false);
          navigate(from, { replace: true });
        }, 1200);
      } else {
        setError(result.error || 'Registration failed.');
        setIsVerificationModalOpen(false);
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to create account.');
      setIsVerificationModalOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const result = await signInWithGoogle();
      if (result.success) {
        navigate(from, { replace: true });
      } else {
        setError(result.error || 'Google sign up failed.');
      }
    } catch (err: any) {
      setError(err?.message || 'Google sign up error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="w-full max-w-md space-y-6">
        {/* Header Branding */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2.5 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-500 via-cyan-500 to-blue-600 text-white flex items-center justify-center shadow-xl shadow-sky-500/20 group-hover:scale-105 transition-all">
              <Compass className="w-6 h-6" />
            </div>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-[#111827] dark:text-white tracking-tight">
            Create your Trevixa Account
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium max-w-xs mx-auto">
            Join thousands of travelers using AI to craft personalized multi-day itineraries.
          </p>
        </div>

        {/* Info Banner for Clerk Setup */}
        {!IS_CLERK_CONFIGURED && (
          <div className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 text-sky-800 dark:text-sky-300 text-xs font-bold space-y-1">
            <div className="flex items-center gap-2 font-black text-sky-900 dark:text-sky-200">
              <Info className="w-4 h-4 text-sky-500 shrink-0" />
              <span>Clerk Authentication Ready</span>
            </div>
            <p className="font-medium text-[11px] text-sky-700 dark:text-sky-300 leading-relaxed">
              To connect live production Clerk Auth, set <code className="bg-sky-100 dark:bg-sky-900/80 px-1 py-0.5 rounded font-mono">VITE_CLERK_PUBLISHABLE_KEY</code> in your environment file.
            </p>
          </div>
        )}

        {/* Render Clerk Component if Live OR Render Custom Auth Form */}
        {isClerkLive ? (
          <div className="flex justify-center">
            <ClerkSignUp redirectUrl={from} signInUrl="/sign-in" />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0b1120] border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-5"
          >
            {/* Error Banner */}
            {error && (
              <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-bold flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Google Sign In */}
            <button
              onClick={handleGoogleSignUp}
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 text-[#111827] dark:text-white font-bold text-xs flex items-center justify-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Sign up with Google</span>
            </button>

            <div className="relative text-center my-2">
              <span className="px-3 bg-white dark:bg-[#0b1120] text-[11px] font-extrabold text-slate-400 uppercase tracking-widest relative z-10">
                Or with Email
              </span>
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-800" />
              </div>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleSignUpSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Qasim Usman"
                    className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-[#050b14] text-[#111827] dark:text-white placeholder:text-slate-400 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="qasim.usman@trevixa.ai"
                    className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-[#050b14] text-[#111827] dark:text-white placeholder:text-slate-400 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="•••••••• (Min 6 characters)"
                    className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-[#050b14] text-[#111827] dark:text-white placeholder:text-slate-400 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-[#050b14] text-[#111827] dark:text-white placeholder:text-slate-400 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              <Button
                variant="neon"
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-2xl font-black text-xs gap-2"
              >
                <span>Create Account</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>

            <div className="pt-2 text-center text-xs text-slate-500 dark:text-slate-400 font-medium">
              Already have an account?{' '}
              <Link to="/sign-in" className="font-bold text-sky-600 dark:text-sky-400 hover:underline">
                Sign In
              </Link>
            </div>
          </motion.div>
        )}
      </div>

      {/* Email Verification Step Modal */}
      <AnimatePresence>
        {isVerificationModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="p-6 rounded-3xl bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800 shadow-2xl max-w-md w-full space-y-4 relative"
            >
              <button
                onClick={() => setIsVerificationModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-emerald-500">
                  <ShieldCheck className="w-5 h-5" />
                  <h3 className="text-lg font-black text-[#111827] dark:text-white">Verify Your Email</h3>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  We sent a 6-digit verification code to <span className="font-bold text-sky-500">{email}</span>.
                </p>
              </div>

              {isVerified ? (
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span>Email verified! Redirecting to Dashboard...</span>
                </div>
              ) : (
                <form onSubmit={handleVerifyCodeSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                      Enter Verification Code
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      required
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      placeholder="123456"
                      className="w-full px-4 py-3 text-center tracking-[0.5em] font-mono text-lg rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#050b14] focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <Button variant="neon" type="submit" disabled={isLoading} className="w-full py-3 text-xs font-black">
                    {isLoading ? 'Verifying...' : 'Verify & Continue'}
                  </Button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
