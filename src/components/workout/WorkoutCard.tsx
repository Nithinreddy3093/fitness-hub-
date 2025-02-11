import React from 'react';
import { format } from 'date-fns';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { WorkoutPlan } from '../../types';
import { ExerciseList } from './ExerciseList';
import { useThemeStore } from '../../store/themeStore';

interface WorkoutCardProps {
  workout: WorkoutPlan;
  expanded: boolean;
  onToggle: () => void;
  onComplete: () => void;
  onExerciseComplete: (exerciseId: string) => void;
  onStartTimer: (exerciseId: string, duration: number) => void;
  activeTimer: { exerciseId: string; timeLeft: number } | null;
}

export const WorkoutCard: React.FC<WorkoutCardProps> = ({
  workout,
  expanded,
  onToggle,
  onComplete,
  onExerciseComplete,
  onStartTimer,
  activeTimer,
}) => {
  const isDark = useThemeStore((state) => state.isDark);

  return (
    <div className={`${isDark ? 'bg-dark-card' : 'bg-white'} rounded-lg shadow-md p-6`}>
      <div 
        className="flex justify-between items-center mb-4 cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-center space-x-2">
          <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Workout for {format(new Date(workout.date), 'MMMM d, yyyy')}
          </h3>
          {expanded ? (
            <ChevronUp className={isDark ? 'text-gray-400' : 'text-gray-500'} />
          ) : (
            <ChevronDown className={isDark ? 'text-gray-400' : 'text-gray-500'} />
          )}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onComplete();
          }}
          disabled={workout.completed}
          className={`px-4 py-2 rounded-md ${
            workout.completed
              ? 'bg-green-100 text-green-800'
              : 'bg-green-600 text-white hover:bg-green-700'
          }`}
        >
          {workout.completed ? 'Completed' : 'Mark Complete'}
        </button>
      </div>

      {expanded && (
        <>
          <ExerciseList
            exercises={workout.exercises}
            restTimer={workout.restTimer}
            onComplete={onExerciseComplete}
            onStartTimer={onStartTimer}
            activeTimer={activeTimer}
          />

          {workout.notes && (
            <div className={`mt-4 p-4 rounded-md ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <h4 className={`font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>Notes</h4>
              <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>{workout.notes}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};