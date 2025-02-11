import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';
import { Exercise, WorkoutPlan, ExerciseHistory } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Workout related functions
export async function saveWorkout(workout: WorkoutPlan) {
  try {
    const { data: workoutData, error: workoutError } = await supabase
      .from('workouts')
      .insert({
        id: workout.id,
        user_id: (await supabase.auth.getUser()).data.user?.id,
        date: workout.date,
        completed: workout.completed,
        notes: workout.notes,
        rest_timer: workout.restTimer,
      })
      .select()
      .single();

    if (workoutError) throw workoutError;

    const exercisesData = workout.exercises.map(exercise => ({
      workout_id: workoutData.id,
      name: exercise.name,
      sets: exercise.sets,
      reps: exercise.reps,
      weight: exercise.weight,
      completed: exercise.completed,
      rpe: exercise.rpe,
      duration: exercise.duration,
    }));

    const { error: exercisesError } = await supabase
      .from('exercises')
      .insert(exercisesData);

    if (exercisesError) throw exercisesError;

    return workoutData;
  } catch (error) {
    console.error('Error in saveWorkout:', error);
    throw error;
  }
}

export async function fetchUserWorkouts(searchTerm?: string) {
  try {
    let query = supabase
      .from('workouts')
      .select(`
        *,
        exercises (*)
      `)
      .order('date', { ascending: false });

    if (searchTerm) {
      query = query.or(`notes.ilike.%${searchTerm}%,exercises.name.ilike.%${searchTerm}%`);
    }

    const { data: workouts, error: workoutsError } = await query;

    if (workoutsError) throw workoutsError;

    return workouts.map(workout => ({
      id: workout.id,
      date: workout.date,
      completed: workout.completed,
      notes: workout.notes,
      restTimer: workout.rest_timer,
      exercises: workout.exercises.map((exercise: any) => ({
        id: exercise.id,
        name: exercise.name,
        sets: exercise.sets,
        reps: exercise.reps,
        weight: exercise.weight,
        completed: exercise.completed,
        rpe: exercise.rpe,
        duration: exercise.duration,
      })),
    }));
  } catch (error) {
    console.error('Error in fetchUserWorkouts:', error);
    throw error;
  }
}

export async function fetchExerciseHistory(exerciseName: string): Promise<ExerciseHistory[]> {
  try {
    const { data, error } = await supabase
      .from('exercises')
      .select(`
        *,
        workouts (date)
      `)
      .eq('name', exerciseName)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map((record: any) => ({
      date: record.workouts.date,
      sets: record.sets,
      reps: record.reps,
      weight: record.weight,
      rpe: record.rpe,
    }));
  } catch (error) {
    console.error('Error in fetchExerciseHistory:', error);
    throw error;
  }
}

export async function updateWorkoutCompletion(workoutId: string, completed: boolean) {
  try {
    const { error } = await supabase
      .from('workouts')
      .update({ completed })
      .eq('id', workoutId);

    if (error) throw error;
  } catch (error) {
    console.error('Error in updateWorkoutCompletion:', error);
    throw error;
  }
}

export async function updateExerciseCompletion(exerciseId: string, completed: boolean) {
  try {
    const { error } = await supabase
      .from('exercises')
      .update({ completed })
      .eq('id', exerciseId);

    if (error) throw error;
  } catch (error) {
    console.error('Error in updateExerciseCompletion:', error);
    throw error;
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    console.error('Error in signOut:', error);
    throw error;
  }
}