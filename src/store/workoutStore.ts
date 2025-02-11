import { create } from 'zustand';
import { Exercise, WorkoutPlan, WorkoutStats } from '../types';
import { saveWorkout, updateWorkoutCompletion, updateExerciseCompletion } from '../lib/supabase';
import toast from 'react-hot-toast';

interface WorkoutStore {
  workouts: WorkoutPlan[];
  currentStreak: number;
  longestStreak: number;
  stats: WorkoutStats;
  setWorkouts: (workouts: WorkoutPlan[]) => void;
  addWorkout: (workout: WorkoutPlan) => Promise<void>;
  completeExercise: (workoutId: string, exerciseId: string) => Promise<void>;
  completeWorkout: (workoutId: string) => Promise<void>;
  updateExercise: (workoutId: string, exerciseId: string, exercise: Partial<Exercise>) => void;
  calculateOneRepMax: (weight: number, reps: number) => number;
  getPersonalBests: () => { [exerciseName: string]: { weight: number; date: string } };
  updateStats: () => void;
}

export const useWorkoutStore = create<WorkoutStore>((set, get) => ({
  workouts: [],
  currentStreak: 0,
  longestStreak: 0,
  stats: {
    totalWorkouts: 0,
    totalExercises: 0,
    totalVolume: 0,
    personalBests: {},
  },

  setWorkouts: (workouts) => set({ workouts }),
  
  addWorkout: async (workout) => {
    try {
      await saveWorkout(workout);
      set((state) => {
        const newWorkouts = [...state.workouts, workout];
        return {
          workouts: newWorkouts,
          stats: calculateStats(newWorkouts),
        };
      });
      toast.success('Workout saved successfully!');
    } catch (error) {
      console.error('Error saving workout:', error);
      toast.error('Failed to save workout');
    }
  },
    
  completeExercise: async (workoutId, exerciseId) => {
    try {
      await updateExerciseCompletion(exerciseId, true);
      set((state) => {
        const newWorkouts = state.workouts.map((workout) =>
          workout.id === workoutId
            ? {
                ...workout,
                exercises: workout.exercises.map((exercise) =>
                  exercise.id === exerciseId
                    ? { ...exercise, completed: true }
                    : exercise
                ),
              }
            : workout
        );
        return {
          workouts: newWorkouts,
          stats: calculateStats(newWorkouts),
        };
      });
    } catch (error) {
      console.error('Error completing exercise:', error);
      toast.error('Failed to update exercise');
    }
  },
    
  completeWorkout: async (workoutId) => {
    try {
      await updateWorkoutCompletion(workoutId, true);
      set((state) => {
        const updatedWorkouts = state.workouts.map((workout) =>
          workout.id === workoutId
            ? { ...workout, completed: true }
            : workout
        );
        
        const sortedWorkouts = [...updatedWorkouts].sort((a, b) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        
        let streak = 0;
        for (const workout of sortedWorkouts) {
          if (workout.completed) streak++;
          else break;
        }
        
        return {
          workouts: updatedWorkouts,
          currentStreak: streak,
          longestStreak: Math.max(state.longestStreak, streak),
          stats: calculateStats(updatedWorkouts),
        };
      });
      toast.success('Workout completed! 🎉');
    } catch (error) {
      console.error('Error completing workout:', error);
      toast.error('Failed to complete workout');
    }
  },

  updateExercise: (workoutId, exerciseId, exerciseUpdate) =>
    set((state) => {
      const newWorkouts = state.workouts.map((workout) =>
        workout.id === workoutId
          ? {
              ...workout,
              exercises: workout.exercises.map((exercise) =>
                exercise.id === exerciseId
                  ? { ...exercise, ...exerciseUpdate }
                  : exercise
              ),
            }
          : workout
      );
      return {
        workouts: newWorkouts,
        stats: calculateStats(newWorkouts),
      };
    }),

  calculateOneRepMax: (weight: number, reps: number) => {
    // Brzycki Formula
    return Math.round(weight / (1.0278 - 0.0278 * reps));
  },

  getPersonalBests: () => {
    const { workouts } = get();
    const pbs: { [key: string]: { weight: number; date: string } } = {};
    
    workouts.forEach((workout) => {
      workout.exercises.forEach((exercise) => {
        if (exercise.weight) {
          const currentPB = pbs[exercise.name];
          if (!currentPB || exercise.weight > currentPB.weight) {
            pbs[exercise.name] = {
              weight: exercise.weight,
              date: workout.date,
            };
          }
        }
      });
    });
    
    return pbs;
  },

  updateStats: () => {
    const { workouts } = get();
    set({ stats: calculateStats(workouts) });
  },
}));

function calculateStats(workouts: WorkoutPlan[]): WorkoutStats {
  const stats: WorkoutStats = {
    totalWorkouts: workouts.filter(w => w.completed).length,
    totalExercises: 0,
    totalVolume: 0,
    personalBests: {},
  };

  workouts.forEach((workout) => {
    workout.exercises.forEach((exercise) => {
      if (exercise.completed) {
        stats.totalExercises++;
        if (exercise.weight) {
          const volume = exercise.weight * exercise.sets * exercise.reps;
          stats.totalVolume += volume;

          // Update personal bests
          const currentPB = stats.personalBests[exercise.name];
          if (!currentPB || exercise.weight > currentPB.weight) {
            stats.personalBests[exercise.name] = {
              weight: exercise.weight,
              date: workout.date,
            };
          }
        }
      }
    });
  });

  return stats;
}