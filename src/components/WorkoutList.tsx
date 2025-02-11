import React, { useState } from 'react';
import { useWorkoutStore } from '../store/workoutStore';
import toast from 'react-hot-toast';
import { WorkoutCard } from './workout/WorkoutCard';
import { WorkoutStats } from './stats/WorkoutStats';

export const WorkoutList = () => {
  const { workouts, completeExercise, completeWorkout, stats } = useWorkoutStore();
  const [expandedWorkout, setExpandedWorkout] = useState<string | null>(null);
  const [activeTimer, setActiveTimer] = useState<{
    workoutId: string;
    exerciseId: string;
    timeLeft: number;
  } | null>(null);

  const handleCompleteExercise = (workoutId: string, exerciseId: string) => {
    completeExercise(workoutId, exerciseId);
  };

  const handleCompleteWorkout = (workoutId: string) => {
    completeWorkout(workoutId);
    toast.success('Workout completed! 🎉', {
      icon: '💪',
      duration: 3000,
    });
  };

  const startRestTimer = (workoutId: string, exerciseId: string, duration: number) => {
    setActiveTimer({ workoutId, exerciseId, timeLeft: duration });
    
    const timer = setInterval(() => {
      setActiveTimer((current) => {
        if (!current || current.timeLeft <= 0) {
          clearInterval(timer);
          toast.success('Rest time complete! 🔔');
          return null;
        }
        return { ...current, timeLeft: current.timeLeft - 1 };
      });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <WorkoutStats stats={stats} />

      {workouts.map((workout) => (
        <WorkoutCard
          key={workout.id}
          workout={workout}
          expanded={expandedWorkout === workout.id}
          onToggle={() => setExpandedWorkout(
            expandedWorkout === workout.id ? null : workout.id
          )}
          onComplete={() => handleCompleteWorkout(workout.id)}
          onExerciseComplete={(exerciseId) => handleCompleteExercise(workout.id, exerciseId)}
          onStartTimer={(exerciseId, duration) => startRestTimer(workout.id, exerciseId, duration)}
          activeTimer={activeTimer && activeTimer.workoutId === workout.id ? {
            exerciseId: activeTimer.exerciseId,
            timeLeft: activeTimer.timeLeft
          } : null}
        />
      ))}
    </div>
  );
};