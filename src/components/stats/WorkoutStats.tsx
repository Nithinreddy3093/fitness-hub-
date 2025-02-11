import React from 'react';
import { WorkoutStats as WorkoutStatsType } from '../../types';
import { useThemeStore } from '../../store/themeStore';

interface WorkoutStatsProps {
  stats: WorkoutStatsType;
}

export const WorkoutStats: React.FC<WorkoutStatsProps> = ({ stats }) => {
  const isDark = useThemeStore((state) => state.isDark);

  return (
    <div className={`${isDark ? 'bg-dark-card' : 'bg-white'} rounded-lg shadow-md p-6`}>
      <h2 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        Workout Statistics
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className={`text-center p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <p className="text-2xl font-bold text-primary">{stats.totalWorkouts}</p>
          <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Total Workouts</p>
        </div>
        <div className={`text-center p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <p className="text-2xl font-bold text-primary">{stats.totalExercises}</p>
          <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Total Exercises</p>
        </div>
        <div className={`text-center p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <p className="text-2xl font-bold text-primary">
            {Math.round(stats.totalVolume / 1000)}k
          </p>
          <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Total Volume (kg)</p>
        </div>
        <div className={`text-center p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <p className="text-2xl font-bold text-primary">
            {Object.keys(stats.personalBests).length}
          </p>
          <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Personal Bests</p>
        </div>
      </div>
    </div>
  );
};