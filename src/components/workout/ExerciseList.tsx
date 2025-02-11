import React from 'react';
import { CheckCircle, Circle, Timer } from 'lucide-react';
import { Exercise } from '../../types';
import { useThemeStore } from '../../store/themeStore';

interface ExerciseListProps {
  exercises: Exercise[];
  restTimer?: number;
  onComplete: (exerciseId: string) => void;
  onStartTimer: (exerciseId: string, duration: number) => void;
  activeTimer: { exerciseId: string; timeLeft: number } | null;
}

export const ExerciseList: React.FC<ExerciseListProps> = ({
  exercises,
  restTimer,
  onComplete,
  onStartTimer,
  activeTimer,
}) => {
  const isDark = useThemeStore((state) => state.isDark);

  return (
    <div className="space-y-4">
      {exercises.map((exercise) => (
        <div
          key={exercise.id}
          className={`flex items-center justify-between p-4 rounded-md ${
            isDark ? 'bg-gray-800' : 'bg-gray-50'
          }`}
        >
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onComplete(exercise.id)}
              disabled={exercise.completed}
            >
              {exercise.completed ? (
                <CheckCircle className="text-green-500 w-6 h-6" />
              ) : (
                <Circle className={`w-6 h-6 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
              )}
            </button>
            <div>
              <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {exercise.name}
              </p>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {exercise.sets} sets × {exercise.reps} reps
                {exercise.weight && ` @ ${exercise.weight}kg`}
                {exercise.duration && ` for ${exercise.duration}s`}
                {exercise.rpe && ` RPE: ${exercise.rpe}`}
              </p>
              {exercise.oneRepMax && (
                <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                  Estimated 1RM: {exercise.oneRepMax}kg
                </p>
              )}
            </div>
          </div>

          {restTimer && !exercise.completed && (
            <button
              onClick={() => onStartTimer(exercise.id, restTimer)}
              className={`flex items-center space-x-2 px-3 py-2 text-sm rounded-md ${
                isDark 
                  ? 'text-gray-300 hover:bg-gray-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Timer size={16} />
              <span>
                {activeTimer?.exerciseId === exercise.id
                  ? `${activeTimer.timeLeft}s`
                  : `Rest ${restTimer}s`
                }
              </span>
            </button>
          )}
        </div>
      ))}
    </div>
  );
};