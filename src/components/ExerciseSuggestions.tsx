import React, { useState } from 'react';
import { Filter, Dumbbell, Info, Clock } from 'lucide-react';
import { exercises, workoutTemplates, muscleGroups, equipmentTypes, type MuscleGroup, type Equipment } from '../data/exercises';
import { useThemeStore } from '../store/themeStore';

interface SuggestionsProps {
  onSelectExercise: (exercise: { name: string; sets: number; reps: number; duration?: number }) => void;
  onSelectTemplate: (exercises: { name: string; sets: number; reps: number; duration?: number }[]) => void;
}

export const ExerciseSuggestions: React.FC<SuggestionsProps> = ({ onSelectExercise, onSelectTemplate }) => {
  const isDark = useThemeStore((state) => state.isDark);
  const [selectedMuscles, setSelectedMuscles] = useState<MuscleGroup[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment[]>([]);
  const [showInstructions, setShowInstructions] = useState<string | null>(null);

  return (
    <div className={`rounded-xl p-6 ${isDark ? 'bg-[#151515]' : 'bg-white'} transition-colors`}>
      <h2 className="text-2xl font-bold mb-6">Quick Start Templates</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {workoutTemplates.map((template) => (
          <div
            key={template.name}
            onClick={() => onSelectTemplate(template.exercises)}
            className={`rounded-xl p-6 cursor-pointer transition-all transform hover:scale-[1.02] ${
              isDark 
                ? 'bg-[#1A1A1A] hover:bg-[#1F1F1F] border border-gray-800' 
                : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold mb-1">{template.name}</h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {template.description}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                template.difficulty === 'Beginner' 
                  ? 'bg-green-100 text-green-800' 
                  : template.difficulty === 'Intermediate'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {template.difficulty}
              </span>
            </div>

            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center">
                <Dumbbell className="w-4 h-4 mr-2 text-primary" />
                <span className="text-sm">{template.exercises.length} exercises</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-primary" />
                <span className="text-sm">{template.estimatedDuration} min</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {template.focusAreas.map((area) => (
                <span
                  key={area}
                  className={`px-3 py-1 rounded-full text-xs ${
                    isDark 
                      ? 'bg-[#252525] text-gray-300' 
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};