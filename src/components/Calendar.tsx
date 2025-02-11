import React from 'react';
import Calendar from 'react-calendar';
import { format } from 'date-fns';
import { useWorkoutStore } from '../store/workoutStore';
import { useThemeStore } from '../store/themeStore';
import 'react-calendar/dist/Calendar.css';

export const WorkoutCalendar = () => {
  const workouts = useWorkoutStore((state) => state.workouts);
  const isDark = useThemeStore((state) => state.isDark);

  const getTileClassName = ({ date }: { date: Date }) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    const workout = workouts.find((w) => w.date === formattedDate);
    
    if (!workout) return '';
    return workout.completed
      ? 'bg-green-500 text-white rounded-full'
      : 'bg-red-500 text-white rounded-full';
  };

  return (
    <div className={`p-4 ${isDark ? 'dark-calendar' : ''}`}>
      <style>
        {`
          .dark-calendar .react-calendar {
            background-color: #151515;
            border-color: #374151;
            color: white;
          }
          
          .dark-calendar .react-calendar__tile {
            color: white;
          }
          
          .dark-calendar .react-calendar__month-view__days__day--weekend {
            color: #FF4B26;
          }
          
          .dark-calendar .react-calendar__month-view__days__day--neighboringMonth {
            color: #4B5563;
          }
          
          .dark-calendar .react-calendar__navigation button {
            color: white;
          }
          
          .dark-calendar .react-calendar__navigation button:enabled:hover,
          .dark-calendar .react-calendar__navigation button:enabled:focus,
          .dark-calendar .react-calendar__tile:enabled:hover,
          .dark-calendar .react-calendar__tile:enabled:focus {
            background-color: #1F2937;
          }
          
          .dark-calendar .react-calendar__tile--now {
            background-color: #374151;
          }
          
          .dark-calendar .react-calendar__tile--active {
            background-color: #FF4B26;
            color: white;
          }
        `}
      </style>
      <Calendar
        className="rounded-lg border shadow-lg p-4"
        tileClassName={getTileClassName}
      />
    </div>
  );
};