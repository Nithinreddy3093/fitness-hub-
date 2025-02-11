import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { WorkoutCalendar } from './components/Calendar';
import { WorkoutForm } from './components/WorkoutForm';
import { WorkoutList } from './components/WorkoutList';
import { StreakDashboard } from './components/StreakDashboard';
import { Activity, Search, User } from 'lucide-react';
import { AuthForm } from './components/auth/AuthForm';
import { supabase, fetchUserWorkouts, signOut } from './lib/supabase';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { ThemeToggle } from './components/ThemeToggle';
import { WorkoutTimer } from './components/WorkoutTimer';
import { useThemeStore } from './store/themeStore';
import { useWorkoutStore } from './store/workoutStore';
import toast from 'react-hot-toast';

function App() {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const isDark = useThemeStore((state) => state.isDark);
  const setWorkouts = useWorkoutStore((state) => state.setWorkouts);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadUserWorkouts();
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadUserWorkouts();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const loadUserWorkouts = async () => {
    try {
      const workouts = await fetchUserWorkouts();
      setWorkouts(workouts);
    } catch (error) {
      console.error('Error loading workouts:', error);
      toast.error('Failed to load workouts');
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setWorkouts([]);
      toast.success('Signed out successfully');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Failed to sign out');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-dark-bg">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <AuthForm />;
  }

  return (
    <div className={`min-h-screen bg-gray-100 dark:bg-dark-bg transition-colors`}>
      <Toaster position="top-right" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Activity className="w-8 h-8 text-primary" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Fitness Hub</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search activities..."
                  className="pl-10 pr-4 py-2 bg-white dark:bg-dark-card border-none rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>
              
              <ThemeToggle />
              
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-dark-card rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <User className="h-5 w-5 text-gray-400" />
                <span className="text-gray-900 dark:text-white">Sign Out</span>
              </button>
            </div>
          </div>
        </header>

        <main className="py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <StreakDashboard />
              <WorkoutTimer />
              <WorkoutCalendar />
              <WorkoutForm />
            </div>
            <div className="space-y-8">
              <WorkoutList />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;