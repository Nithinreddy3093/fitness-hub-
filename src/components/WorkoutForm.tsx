import React, { useState } from 'react';
import { Plus, Timer } from 'lucide-react';
import { useWorkoutStore } from '../store/workoutStore';
import { useThemeStore } from '../store/themeStore';
import { Exercise, WorkoutPlan } from '../types';
import { ExerciseSuggestions } from './ExerciseSuggestions';
import { ExerciseForm } from './workout/ExerciseForm';

export const WorkoutForm = () => {
  const [exercises, setExercises] = useState<Omit<Exercise, 'id' | 'completed'>[]>([]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [restTimer, setRestTimer] = useState(60);
  const [notes, setNotes] = useState('');
  const addWorkout = useWorkoutStore((state) => state.addWorkout);
  const calculateOneRepMax = useWorkoutStore((state) => state.calculateOneRepMax);
  const isDark = useThemeStore((state) => state.isDark);

  const handleAddExercise = () => {
    setExercises([...exercises, { 
      name: '', 
      sets: 3, 
      reps: 12,
      weight: 0,
      rpe: 7
    }]);
  };

  const handleUpdateExercise = (index: number, exercise: Omit<Exercise, 'id' | 'completed'>) => {
    const newExercises = [...exercises];
    newExercises[index] = exercise;
    setExercises(newExercises);
  };

  const handleRemoveExercise = (index: number) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const workout: WorkoutPlan = {
      id: crypto.randomUUID(),
      date,
      exercises: exercises.map(exercise => ({
        ...exercise,
        id: crypto.randomUUID(),
        completed: false,
        oneRepMax: exercise.weight && exercise.weight > 0 ? calculateOneRepMax(exercise.weight, exercise.reps) : undefined
      })),
      completed: false,
      streak: 0,
      notes,
      restTimer
    };
    
    addWorkout(workout);
    setExercises([]);
    setNotes('');
  };

  const handleSuggestedExercise = (exercise: { name: string; sets: number; reps: number; duration?: number }) => {
    setExercises([...exercises, { ...exercise, weight: 0, rpe: 7 }]);
  };

  const handleWorkoutTemplate = (templateExercises: { name: string; sets: number; reps: number; duration?: number }[]) => {
    setExercises(templateExercises.map(exercise => ({ ...exercise, weight: 0, rpe: 7 })));
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className={`space-y-4 p-4 ${isDark ? 'bg-dark-card' : 'bg-white'} rounded-lg shadow-md`}>
        <div>
          <label className={`block text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={`mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
              isDark 
                ? 'bg-gray-800 border-gray-700 text-white' 
                : 'border-gray-300 text-gray-900'
            }`}
          />
        </div>

        <div className="space-y-4">
          {exercises.map((exercise, index) => (
            <ExerciseForm
              key={index}
              exercise={exercise}
              index={index}
              onUpdate={handleUpdateExercise}
              onRemove={handleRemoveExercise}
            />
          ))}
        </div>

        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
              Rest Timer (seconds)
            </label>
            <div className="flex items-center space-x-2">
              <Timer className={isDark ? 'text-gray-400' : 'text-gray-500'} size={20} />
              <input
                type="number"
                min="0"
                value={restTimer || ''}
                onChange={(e) => {
                  const value = e.target.value === '' ? 0 : parseInt(e.target.value);
                  setRestTimer(value);
                }}
                className={`mt-1 block w-32 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                  isDark 
                    ? 'bg-gray-800 border-gray-700 text-white' 
                    : 'border-gray-300 text-gray-900'
                }`}
              />
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
              Workout Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className={`mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                isDark 
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' 
                  : 'border-gray-300 text-gray-900 placeholder-gray-400'
              }`}
              placeholder="How was your workout? Any PRs or things to remember?"
            />
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            type="button"
            onClick={handleAddExercise}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus size={20} className="mr-2" /> Add Exercise
          </button>
          <button
            type="submit"
            disabled={exercises.length === 0}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save Workout
          </button>
        </div>
      </form>

      <ExerciseSuggestions 
        onSelectExercise={handleSuggestedExercise}
        onSelectTemplate={handleWorkoutTemplate}
      />
    </div>
  );
};