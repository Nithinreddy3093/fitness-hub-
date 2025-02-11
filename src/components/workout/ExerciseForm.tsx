import React from 'react';
import { X } from 'lucide-react';
import { Exercise } from '../../types';
import { useThemeStore } from '../../store/themeStore';

interface ExerciseFormProps {
  exercise: Omit<Exercise, 'id' | 'completed'>;
  index: number;
  onUpdate: (index: number, exercise: Omit<Exercise, 'id' | 'completed'>) => void;
  onRemove: (index: number) => void;
}

export const ExerciseForm: React.FC<ExerciseFormProps> = ({
  exercise,
  index,
  onUpdate,
  onRemove,
}) => {
  const isDark = useThemeStore((state) => state.isDark);

  return (
    <div className={`space-y-2 p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Exercise name"
          value={exercise.name}
          onChange={(e) => onUpdate(index, { ...exercise, name: e.target.value })}
          className={`flex-1 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
            isDark 
              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
              : 'border-gray-300 text-gray-900 placeholder-gray-500'
          }`}
        />
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="text-red-500 hover:text-red-700"
        >
          <X size={20} />
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label className={`block text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
            Sets
          </label>
          <input
            type="number"
            min="1"
            value={exercise.sets || ''}
            onChange={(e) => onUpdate(index, { 
              ...exercise, 
              sets: e.target.value === '' ? 0 : parseInt(e.target.value) 
            })}
            className={`mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
              isDark 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'border-gray-300 text-gray-900'
            }`}
          />
        </div>
        <div>
          <label className={`block text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
            Reps
          </label>
          <input
            type="number"
            min="1"
            value={exercise.reps || ''}
            onChange={(e) => onUpdate(index, { 
              ...exercise, 
              reps: e.target.value === '' ? 0 : parseInt(e.target.value) 
            })}
            className={`mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
              isDark 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'border-gray-300 text-gray-900'
            }`}
          />
        </div>
        <div>
          <label className={`block text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
            Weight (kg)
          </label>
          <input
            type="number"
            min="0"
            step="0.5"
            value={exercise.weight || ''}
            onChange={(e) => onUpdate(index, { 
              ...exercise, 
              weight: e.target.value === '' ? 0 : parseFloat(e.target.value) 
            })}
            className={`mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
              isDark 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'border-gray-300 text-gray-900'
            }`}
          />
        </div>
        <div>
          <label className={`block text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
            RPE
          </label>
          <input
            type="number"
            min="1"
            max="10"
            value={exercise.rpe || ''}
            onChange={(e) => onUpdate(index, { 
              ...exercise, 
              rpe: e.target.value === '' ? 0 : parseInt(e.target.value) 
            })}
            className={`mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
              isDark 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'border-gray-300 text-gray-900'
            }`}
          />
        </div>
      </div>
    </div>
  );
};