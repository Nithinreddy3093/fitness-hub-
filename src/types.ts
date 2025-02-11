export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight?: number;
  duration?: number;
  completed: boolean;
  rpe?: number;
  oneRepMax?: number;
  notes?: string;
  dropSets?: {
    weight: number;
    reps: number;
  }[];
}

export interface WorkoutPlan {
  id: string;
  date: string;
  exercises: Exercise[];
  completed: boolean;
  streak: number;
  notes?: string;
  duration?: number;
  restTimer?: number;
}

export interface WorkoutStats {
  totalWorkouts: number;
  totalExercises: number;
  totalVolume: number;
  personalBests: {
    [exerciseName: string]: {
      weight: number;
      date: string;
    };
  };
}

export interface ExerciseHistory {
  date: string;
  sets: number;
  reps: number;
  weight?: number;
  rpe?: number;
}

export interface ExerciseProgress {
  exercise: string;
  history: ExerciseHistory[];
  personalBest: number;
  recentMax: number;
  improvement: number;
}