import React from 'react';
import { Activity, Flame, Trophy } from 'lucide-react';
import { useWorkoutStore } from '../store/workoutStore';

export const StreakDashboard = () => {
  const { currentStreak, longestStreak } = useWorkoutStore();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="card">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-blue-500/10 rounded-lg">
            <Activity className="w-6 h-6 text-[#4361ee]" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Today's Progress</p>
            <h3 className="text-2xl font-bold text-white">{currentStreak > 0 ? 'Active' : 'Rest Day'}</h3>
          </div>
        </div>
      </div>
      
      <div className="card">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-orange-500/10 rounded-lg">
            <Flame className="w-6 h-6 text-orange-500" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Current Streak</p>
            <h3 className="text-2xl font-bold text-white">{currentStreak} days</h3>
          </div>
        </div>
      </div>
      
      <div className="card">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-yellow-500/10 rounded-lg">
            <Trophy className="w-6 h-6 text-yellow-500" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Best Streak</p>
            <h3 className="text-2xl font-bold text-white">{longestStreak} days</h3>
          </div>
        </div>
      </div>
    </div>
  );
};