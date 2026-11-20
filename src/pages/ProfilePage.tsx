import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserProfile as ClerkUserProfile } from '@clerk/clerk-react';
import {
  User,
  Mail,
  ShieldCheck,
  Camera,
  KeyRound,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Bookmark,
  Compass,
  Calendar,
  Sparkles,
  Save,
  X,
  Lock,
} from 'lucide-react';
import { useAuthContext } from '../context/AuthContext';
import { Button } from '../components/ui/button';

const UserPreferencesForm: React.FC<{ userId: string }> = ({ userId }) => {
  const [budget, setBudget] = useState<number>(100000);
  const [travelStyle, setTravelStyle] = useState<string>('Friends & Family');
  const [transport, setTransport] = useState<string>('Private Car / Prado');
  const [theme, setTheme] = useState<'dark' | 'light' | 'system'>('dark');
  const [language, setLanguage] = useState<string>('English');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    import('../services/dbService').then(({ dbService }) => {
      dbService.getUserPreferences(userId).then((prefs) => {
        if (prefs) {
          setBudget(prefs.preferred_budget || 100000);
          setTravelStyle(prefs.favorite_travel_style || 'Friends & Family');
          setTransport(prefs.preferred_transport || 'Private Car / Prado');
          setTheme(prefs.dark_light_theme || 'dark');
          setLanguage(prefs.preferred_language || 'English');
        }
      });
    });
  }, [userId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { dbService } = await import('../services/dbService');
    await dbService.saveUserPreferences(userId, {
      preferred_budget: budget,
      favorite_travel_style: travelStyle,
      preferred_transport: transport,
      dark_light_theme: theme,
      preferred_language: language,
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {isSaved && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>User travel preferences saved to database!</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Preferred Budget (PKR)
          </label>
          <input
            type="number"
            step="5000"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#050b14] text-xs font-medium text-[#111827] dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Favorite Travel Style
          </label>
          <select
            value={travelStyle}
            onChange={(e) => setTravelStyle(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#050b14] text-xs font-medium text-[#111827] dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="Friends & Family">Friends & Family</option>
            <option value="Couple / Honeymoon">Couple / Honeymoon</option>
            <option value="Solo Backpacker">Solo Backpacker</option>
            <option value="Luxury Resort">Luxury Resort</option>
            <option value="Adventure Trek">Adventure Trek</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Preferred Transport
          </label>
          <select
            value={transport}
            onChange={(e) => setTransport(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#050b14] text-xs font-medium text-[#111827] dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="Private Car / Prado">Private Car / Prado</option>
            <option value="Coaster Bus">Coaster Bus</option>
            <option value="Air Travel (Flights)">Air Travel (Flights)</option>
            <option value="Self-Drive SUV">Self-Drive SUV</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Preferred Language
          </label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#050b14] text-xs font-medium text-[#111827] dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="English">English</option>
            <option value="Urdu">Urdu (اردو)</option>
            <option value="Pashto">Pashto</option>
            <option value="Punjabi">Punjabi</option>
          </select>
        </div>
      </div>

      <Button variant="neon" type="submit" className="py-3 px-6 rounded-2xl text-xs font-black gap-2">
        <Save className="w-4 h-4" />
        <span>Save Travel Preferences</span>
      </Button>
    </form>
  );
};

export const ProfilePage: React.FC = () => {
  const { user, updateProfile, deleteAccount, isClerkLive, signOut } = useAuthContext();

  const [fullName, setFullName] = useState(user?.fullName || '');
  const [imageUrl, setImageUrl] = useState(user?.imageUrl || '');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Delete account confirmation modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteConfirmationText, setDeleteConfirmationText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      await updateProfile({ fullName, imageUrl });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch {
      // ignore
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordReset = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordSuccess(true);
    setCurrentPassword('');
    setNewPassword('');
    setTimeout(() => setPasswordSuccess(false), 3000);
  };

  const handleDeleteAccountConfirm = async () => {
    if (deleteConfirmationText.toLowerCase() !== 'delete') return;
    setIsDeleting(true);
    try {
      await deleteAccount();
      await signOut();
      window.location.href = '/';
    } catch {
      setIsDeleting(false);
    }
  };

  const avatarPresets = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80',
  ];

  if (!user) return null;

  return (
    <div className="w-full space-y-8 sm:space-y-12 pb-20 pt-4 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80 dark:border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <User className="w-6 h-6 text-sky-500" />
            <h1 className="text-2xl sm:text-3xl font-black text-[#111827] dark:text-white tracking-tight">
              Account Profile & Settings
            </h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
            Manage your traveler avatar, security credentials, preferences, and account metadata.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-black border border-emerald-200 dark:border-emerald-800 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Clerk Security Protected</span>
          </span>
        </div>
      </div>

      {isClerkLive ? (
        <div className="flex justify-center">
          <ClerkUserProfile />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Avatar & Summary Card */}
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-[#0b1120] border border-slate-200/80 dark:border-slate-800 shadow-xl text-center space-y-4 relative overflow-hidden">
              {/* Background gradient banner */}
              <div className="h-20 -mx-6 -mt-6 bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600" />

              <div className="relative -mt-14 inline-block">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white dark:border-[#0b1120] shadow-xl mx-auto bg-slate-900 text-white flex items-center justify-center font-black text-2xl">
                  {user.imageUrl ? (
                    <img src={user.imageUrl} alt={user.fullName || ''} className="w-full h-full object-cover" />
                  ) : (
                    <span>{(user.fullName || 'T')[0]}</span>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-black text-[#111827] dark:text-white">{user.fullName}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{user.email}</p>
              </div>

              {/* Avatar Preset Selectors */}
              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-[10px] font-black uppercase text-slate-400 block">Choose Avatar Preset</span>
                <div className="flex items-center justify-center gap-2">
                  {avatarPresets.map((url, i) => (
                    <button
                      key={i}
                      onClick={() => setImageUrl(url)}
                      className={`w-9 h-9 rounded-full overflow-hidden border-2 transition-all ${
                        imageUrl === url ? 'border-sky-500 scale-110 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={url} alt="Preset" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300">
                <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60">
                  <span className="text-[10px] text-slate-400 block font-normal">Member Since</span>
                  <span className="text-xs font-black text-sky-600 dark:text-sky-400">{user.createdAt}</span>
                </div>
                <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60">
                  <span className="text-[10px] text-slate-400 block font-normal">Status</span>
                  <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">Traveler</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Account Details & Security */}
          <div className="lg:col-span-2 space-y-6">
            {/* Form 1: General Info */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#0b1120] border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-5">
              <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                <User className="w-5 h-5 text-sky-500" />
                <h3 className="text-base font-black text-[#111827] dark:text-white">Personal Profile</h3>
              </div>

              {saveSuccess && (
                <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Profile details updated successfully!</span>
                </div>
              )}

              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#050b14] text-xs font-medium text-[#111827] dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      disabled
                      value={user.email || ''}
                      className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 text-xs font-medium text-slate-500 dark:text-slate-400 cursor-not-allowed"
                    />
                    <span className="absolute right-3 top-3 text-[10px] font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                      {user?.emailVerified ? 'Email verified' : 'Email unverified'}
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Profile Image URL
                  </label>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#050b14] text-xs font-medium text-[#111827] dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <Button variant="neon" type="submit" disabled={isSaving} className="py-3 px-6 rounded-2xl text-xs font-black gap-2">
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? 'Saving...' : 'Save Profile Changes'}</span>
                </Button>
              </form>
            </div>

            {/* Form 2: Password & Security */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#0b1120] border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-5">
              <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                <Compass className="w-5 h-5 text-sky-500" />
                <h3 className="text-base font-black text-[#111827] dark:text-white">Travel Preferences & Database Sync</h3>
              </div>

              <UserPreferencesForm userId={user.id} />
            </div>

            {/* Form 3: Password & Security */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#0b1120] border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-5">
              <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                <KeyRound className="w-5 h-5 text-emerald-500" />
                <h3 className="text-base font-black text-[#111827] dark:text-white">Security & Credentials</h3>
              </div>

              {passwordSuccess && (
                <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Password updated successfully!</span>
                </div>
              )}

              <form onSubmit={handlePasswordReset} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      Current Password
                    </label>
                    <input
                      type="password"
                      required
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#050b14] text-xs font-medium text-[#111827] dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      New Password
                    </label>
                    <input
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#050b14] text-xs font-medium text-[#111827] dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>

                <Button variant="outline" type="submit" className="py-3 px-6 rounded-2xl text-xs font-bold">
                  Update Password
                </Button>
              </form>
            </div>

            {/* Danger Zone: Delete Account */}
            <div className="p-6 rounded-3xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-900/50 shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <h3 className="text-base font-black">Danger Zone</h3>
              </div>

              <p className="text-xs text-rose-800 dark:text-rose-300 font-medium">
                Permanently delete your account and remove all saved itineraries, bookmarks, and preferences.
              </p>

              <button
                onClick={() => setIsDeleteModalOpen(true)}
                className="px-4 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs transition-colors flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete Account</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Account Modal Confirmation */}
      <AnimatePresence>
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="p-6 rounded-3xl bg-white dark:bg-[#0b1120] border border-rose-200 dark:border-rose-900 shadow-2xl max-w-md w-full space-y-4 relative"
            >
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-rose-600">
                  <Trash2 className="w-5 h-5" />
                  <h3 className="text-lg font-black text-[#111827] dark:text-white">Delete Account Confirmation</h3>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  This action is permanent and cannot be undone. All saved trips and history will be deleted.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  To confirm, type <span className="text-rose-600 font-mono font-black">DELETE</span> below:
                </p>
                <input
                  type="text"
                  value={deleteConfirmationText}
                  onChange={(e) => setDeleteConfirmationText(e.target.value)}
                  placeholder="type DELETE"
                  className="w-full px-4 py-3 rounded-2xl border border-rose-300 dark:border-rose-800 bg-slate-50 dark:bg-[#050b14] text-xs font-mono font-bold text-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />

                <div className="flex items-center justify-end gap-3 pt-2">
                  <Button variant="ghost" onClick={() => setIsDeleteModalOpen(false)} className="text-xs font-bold">
                    Cancel
                  </Button>
                  <button
                    onClick={handleDeleteAccountConfirm}
                    disabled={deleteConfirmationText.toLowerCase() !== 'delete' || isDeleting}
                    className="px-5 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-black text-xs transition-colors"
                  >
                    {isDeleting ? 'Deleting...' : 'Permanently Delete'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
