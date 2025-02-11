import React from 'react';
import { Line } from 'react-chartjs-2';
import { format } from 'date-fns';
import { ExerciseHistory } from '../types';
import { useThemeStore } from '../store/themeStore';

interface ExerciseProgressProps {
  exerciseName: string;
  history: ExerciseHistory[];
}

export const ExerciseProgress: React.FC<ExerciseProgressProps> = ({
  exerciseName,
  history,
}) => {
  const isDark = useThemeStore((state) => state.isDark);

  const chartData = {
    labels: history.map(record => format(new Date(record.date), 'MMM d')),
    datasets: [
      {
        label: 'Weight (kg)',
        data: history.map(record => record.weight || 0),
        borderColor: '#FF4B26',
        backgroundColor: 'rgba(255, 75, 38, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: isDark ? '#fff' : '#000',
        },
      },
      title: {
        display: true,
        text: `Progress for ${exerciseName}`,
        color: isDark ? '#fff' : '#000',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: isDark ? '#fff' : '#000',
        },
      },
      x: {
        grid: {
          color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: isDark ? '#fff' : '#000',
        },
      },
    },
  };

  const calculateProgress = () => {
    if (history.length < 2) return null;
    
    const latest = history[0].weight || 0;
    const oldest = history[history.length - 1].weight || 0;
    const improvement = latest - oldest;
    const percentageChange = (improvement / oldest) * 100;
    
    return {
      improvement,
      percentageChange,
    };
  };

  const progress = calculateProgress();

  return (
    <div className={`p-6 rounded-lg ${isDark ? 'bg-dark-card' : 'bg-white'} shadow-md`}>
      <div className="mb-6">
        <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {exerciseName}
        </h3>
        {progress && (
          <div className="grid grid-cols-2 gap-4">
            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Total Improvement
              </p>
              <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {progress.improvement > 0 ? '+' : ''}{progress.improvement.toFixed(1)} kg
              </p>
            </div>
            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Percentage Change
              </p>
              <p className={`text-2xl font-bold ${
                progress.percentageChange > 0 
                  ? 'text-green-500' 
                  : progress.percentageChange < 0 
                    ? 'text-red-500' 
                    : isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {progress.percentageChange > 0 ? '+' : ''}
                {progress.percentageChange.toFixed(1)}%
              </p>
            </div>
          </div>
        )}
      </div>
      
      <div className="h-64">
        <Line data={chartData} options={options} />
      </div>
      
      <div className="mt-6">
        <h4 className={`font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
          Recent History
        </h4>
        <div className="space-y-2">
          {history.slice(0, 5).map((record, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}
            >
              <div className="flex justify-between items-center">
                <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                  {format(new Date(record.date), 'MMM d, yyyy')}
                </span>
                <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {record.sets} × {record.reps} @ {record.weight}kg
                  {record.rpe && ` (RPE: ${record.rpe})`}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};