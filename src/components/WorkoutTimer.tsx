import React, { useState, useEffect } from 'react';
import { Play, Pause, StopCircle } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';

export const WorkoutTimer = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const isDark = useThemeStore((state) => state.isDark);

  useEffect(() => {
    let interval: number;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const progress = time * (283 / 1800); // 283 is circumference, showing progress relative to 30 min

  const handleStop = () => {
    setIsRunning(false);
    // Don't reset the time, just stop the timer
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  return (
    <div className={`${isDark ? 'bg-dark-bg' : 'bg-gray-100'} p-6 rounded-lg transition-colors`}>
      <div className="max-w-md mx-auto">
        <div className="relative flex items-center justify-center">
          <svg className="w-64 h-64 -rotate-90 transform">
            {/* Background circle */}
            <circle
              cx="128"
              cy="128"
              r="120"
              stroke={isDark ? '#1A1A1A' : '#E5E7EB'}
              strokeWidth="8"
              fill="none"
            />
            {/* Progress circle */}
            <circle
              cx="128"
              cy="128"
              r="120"
              stroke="#FF4B26"
              strokeWidth="8"
              fill="none"
              strokeDasharray="283"
              strokeDashoffset={283 - progress}
              className="transition-all duration-300"
            />
          </svg>
          
          <div className="absolute text-center">
            <div className={`text-5xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {formatTime(time)}
            </div>
          </div>
        </div>

        <div className="space-y-3 mt-8">
          <button 
            onClick={() => setIsRunning(!isRunning)}
            className={`flex items-center justify-center w-full py-4 rounded-lg transition-colors ${
              isDark 
                ? 'bg-[#151515] text-white hover:bg-[#1A1A1A]' 
                : 'bg-white text-gray-900 hover:bg-gray-50'
            } border ${isDark ? 'border-gray-800' : 'border-gray-200'}`}
          >
            {isRunning ? (
              <>
                <Pause className="w-5 h-5 mr-2" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-5 h-5 mr-2" />
                Start
              </>
            )}
          </button>
          
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={handleStop}
              className={`flex items-center justify-center py-4 rounded-lg transition-colors ${
                isDark 
                  ? 'bg-[#151515] text-white hover:bg-[#1A1A1A]' 
                  : 'bg-white text-gray-900 hover:bg-gray-50'
              } border ${isDark ? 'border-gray-800' : 'border-gray-200'}`}
            >
              <StopCircle className="w-5 h-5 mr-2" />
              Stop
            </button>
            
            <button 
              onClick={handleReset}
              className={`flex items-center justify-center py-4 rounded-lg transition-colors ${
                isDark 
                  ? 'bg-[#151515] text-white hover:bg-[#1A1A1A]' 
                  : 'bg-white text-gray-900 hover:bg-gray-50'
              } border ${isDark ? 'border-gray-800' : 'border-gray-200'}`}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};