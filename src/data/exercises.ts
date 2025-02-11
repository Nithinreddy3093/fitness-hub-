interface ExerciseTemplate {
  name: string;
  equipment: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  muscles: string[];
  description: string;
  defaultSets: number;
  defaultReps: number;
  instructions?: string[];
  duration?: number; // For timed exercises like planks (in seconds)
  restBetweenSets?: number; // Rest time in seconds
}

export const exercises: ExerciseTemplate[] = [
  {
    name: "Push-ups",
    equipment: ["bodyweight"],
    difficulty: "Beginner",
    muscles: ["chest", "shoulders", "triceps"],
    description: "A classic bodyweight exercise that targets the chest, shoulders, and triceps",
    defaultSets: 3,
    defaultReps: 12,
    instructions: [
      "Start in a plank position with hands shoulder-width apart",
      "Lower your body until chest nearly touches the ground",
      "Push back up to starting position",
      "Keep your core tight and body straight throughout"
    ],
    restBetweenSets: 60
  },
  {
    name: "Pull-ups",
    equipment: ["pull-up bar"],
    difficulty: "Intermediate",
    muscles: ["back", "biceps"],
    description: "An upper body exercise that primarily targets the back and biceps",
    defaultSets: 3,
    defaultReps: 8,
    instructions: [
      "Hang from the bar with hands slightly wider than shoulders",
      "Pull yourself up until chin passes the bar",
      "Lower back down with control",
      "Keep your core engaged throughout"
    ],
    restBetweenSets: 90
  },
  {
    name: "Squats",
    equipment: ["bodyweight"],
    difficulty: "Beginner",
    muscles: ["quadriceps", "hamstrings", "glutes"],
    description: "A fundamental lower body exercise that works multiple muscle groups",
    defaultSets: 3,
    defaultReps: 15,
    instructions: [
      "Stand with feet shoulder-width apart",
      "Lower your body as if sitting back into a chair",
      "Keep chest up and knees tracking over toes",
      "Push through heels to return to standing"
    ],
    restBetweenSets: 60
  },
  {
    name: "Deadlift",
    equipment: ["barbell"],
    difficulty: "Intermediate",
    muscles: ["back", "glutes", "hamstrings"],
    description: "A compound exercise that targets multiple muscle groups in the posterior chain",
    defaultSets: 3,
    defaultReps: 8,
    instructions: [
      "Stand with feet hip-width apart, barbell over midfoot",
      "Hinge at hips and grip the bar",
      "Keep back straight and chest up",
      "Stand up straight, driving through heels"
    ],
    restBetweenSets: 120
  },
  {
    name: "Plank",
    equipment: ["bodyweight"],
    difficulty: "Beginner",
    muscles: ["core", "shoulders"],
    description: "An isometric core exercise that also engages the shoulders",
    defaultSets: 3,
    defaultReps: 1,
    duration: 30,
    instructions: [
      "Start in forearm plank position",
      "Keep body in straight line from head to heels",
      "Engage core and glutes",
      "Hold position for prescribed duration"
    ],
    restBetweenSets: 45
  },
  {
    name: "Dumbbell Rows",
    equipment: ["dumbbell"],
    difficulty: "Beginner",
    muscles: ["back", "biceps"],
    description: "A unilateral back exercise that helps improve posture and strength",
    defaultSets: 3,
    defaultReps: 12,
    instructions: [
      "Place one knee and hand on bench",
      "Hold dumbbell with free hand",
      "Pull dumbbell to hip level",
      "Lower with control"
    ],
    restBetweenSets: 60
  },
  {
    name: "Bench Press",
    equipment: ["barbell"],
    difficulty: "Intermediate",
    muscles: ["chest", "shoulders", "triceps"],
    description: "A compound exercise that primarily targets the chest muscles",
    defaultSets: 4,
    defaultReps: 8,
    instructions: [
      "Lie on bench with feet flat on ground",
      "Grip barbell slightly wider than shoulder width",
      "Lower bar to chest with control",
      "Press bar up until arms are fully extended"
    ],
    restBetweenSets: 90
  },
  {
    name: "Overhead Press",
    equipment: ["barbell"],
    difficulty: "Intermediate",
    muscles: ["shoulders", "triceps"],
    description: "A compound movement for building shoulder strength",
    defaultSets: 4,
    defaultReps: 8,
    instructions: [
      "Stand with feet shoulder-width apart",
      "Hold barbell at shoulder height",
      "Press bar overhead until arms lock out",
      "Lower bar back to shoulders with control"
    ],
    restBetweenSets: 90
  },
  {
    name: "Bicep Curls",
    equipment: ["dumbbell"],
    difficulty: "Beginner",
    muscles: ["biceps"],
    description: "An isolation exercise for the biceps",
    defaultSets: 3,
    defaultReps: 12,
    instructions: [
      "Stand with dumbbells at sides",
      "Curl weights up toward shoulders",
      "Keep elbows close to body",
      "Lower with control"
    ],
    restBetweenSets: 60
  },
  {
    name: "Tricep Dips",
    equipment: ["bodyweight"],
    difficulty: "Intermediate",
    muscles: ["triceps", "chest", "shoulders"],
    description: "A bodyweight exercise targeting the triceps",
    defaultSets: 3,
    defaultReps: 12,
    instructions: [
      "Support body on parallel bars or bench",
      "Lower body by bending elbows",
      "Keep chest up and elbows close",
      "Push back up to starting position"
    ],
    restBetweenSets: 60
  },
  {
    name: "Lunges",
    equipment: ["bodyweight"],
    difficulty: "Beginner",
    muscles: ["quadriceps", "glutes", "hamstrings"],
    description: "A unilateral leg exercise for balance and strength",
    defaultSets: 3,
    defaultReps: 12,
    instructions: [
      "Stand with feet hip-width apart",
      "Step forward with one leg",
      "Lower back knee toward ground",
      "Push back to starting position"
    ],
    restBetweenSets: 60
  },
  {
    name: "Lateral Raises",
    equipment: ["dumbbell"],
    difficulty: "Beginner",
    muscles: ["shoulders"],
    description: "An isolation exercise for the lateral deltoids",
    defaultSets: 3,
    defaultReps: 15,
    instructions: [
      "Stand with dumbbells at sides",
      "Raise arms out to sides until parallel with ground",
      "Keep slight bend in elbows",
      "Lower with control"
    ],
    restBetweenSets: 45
  }
];

interface WorkoutTemplate {
  name: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  exercises: {
    name: string;
    sets: number;
    reps: number;
    duration?: number;
  }[];
  estimatedDuration: number; // in minutes
  focusAreas: string[];
}

export const workoutTemplates: WorkoutTemplate[] = [
  {
    name: "Full Body Basics",
    description: "A beginner-friendly full body workout using minimal equipment",
    difficulty: "Beginner",
    exercises: [
      { name: "Push-ups", sets: 3, reps: 10 },
      { name: "Squats", sets: 3, reps: 15 },
      { name: "Plank", sets: 3, reps: 1, duration: 30 }
    ],
    estimatedDuration: 30,
    focusAreas: ["Full Body", "Strength", "Core"]
  },
  {
    name: "Upper Body Power",
    description: "Focus on building upper body strength with compound movements",
    difficulty: "Intermediate",
    exercises: [
      { name: "Push-ups", sets: 4, reps: 12 },
      { name: "Pull-ups", sets: 3, reps: 8 },
      { name: "Dumbbell Rows", sets: 3, reps: 12 }
    ],
    estimatedDuration: 45,
    focusAreas: ["Upper Body", "Strength", "Power"]
  },
  {
    name: "5-Day Split: Chest",
    description: "Day 1 of the 5-day muscle building split focusing on chest",
    difficulty: "Intermediate",
    exercises: [
      { name: "Bench Press", sets: 4, reps: 8 },
      { name: "Push-ups", sets: 3, reps: 12 },
      { name: "Dumbbell Rows", sets: 3, reps: 12 }
    ],
    estimatedDuration: 45,
    focusAreas: ["Chest", "Strength", "Hypertrophy"]
  },
  {
    name: "5-Day Split: Back",
    description: "Day 2 of the 5-day muscle building split focusing on back",
    difficulty: "Intermediate",
    exercises: [
      { name: "Deadlift", sets: 4, reps: 8 },
      { name: "Pull-ups", sets: 3, reps: 8 },
      { name: "Dumbbell Rows", sets: 3, reps: 12 }
    ],
    estimatedDuration: 45,
    focusAreas: ["Back", "Strength", "Hypertrophy"]
  },
  {
    name: "5-Day Split: Shoulders",
    description: "Day 3 of the 5-day muscle building split focusing on shoulders",
    difficulty: "Intermediate",
    exercises: [
      { name: "Overhead Press", sets: 4, reps: 8 },
      { name: "Lateral Raises", sets: 3, reps: 15 }
    ],
    estimatedDuration: 40,
    focusAreas: ["Shoulders", "Strength", "Hypertrophy"]
  },
  {
    name: "5-Day Split: Legs",
    description: "Day 4 of the 5-day muscle building split focusing on legs",
    difficulty: "Intermediate",
    exercises: [
      { name: "Squats", sets: 4, reps: 8 },
      { name: "Lunges", sets: 3, reps: 12 }
    ],
    estimatedDuration: 40,
    focusAreas: ["Legs", "Strength", "Hypertrophy"]
  },
  {
    name: "5-Day Split: Arms",
    description: "Day 5 of the 5-day muscle building split focusing on arms",
    difficulty: "Intermediate",
    exercises: [
      { name: "Bicep Curls", sets: 3, reps: 12 },
      { name: "Tricep Dips", sets: 3, reps: 12 }
    ],
    estimatedDuration: 35,
    focusAreas: ["Arms", "Hypertrophy"]
  },
  {
    name: "Push Day",
    description: "Part of the Push/Pull/Legs split focusing on pushing movements",
    difficulty: "Intermediate",
    exercises: [
      { name: "Bench Press", sets: 4, reps: 8 },
      { name: "Overhead Press", sets: 3, reps: 8 },
      { name: "Tricep Dips", sets: 3, reps: 12 }
    ],
    estimatedDuration: 50,
    focusAreas: ["Chest", "Shoulders", "Triceps"]
  },
  {
    name: "Pull Day",
    description: "Part of the Push/Pull/Legs split focusing on pulling movements",
    difficulty: "Intermediate",
    exercises: [
      { name: "Pull-ups", sets: 4, reps: 8 },
      { name: "Dumbbell Rows", sets: 3, reps: 12 },
      { name: "Bicep Curls", sets: 3, reps: 12 }
    ],
    estimatedDuration: 50,
    focusAreas: ["Back", "Biceps"]
  },
  {
    name: "Legs Day",
    description: "Part of the Push/Pull/Legs split focusing on lower body",
    difficulty: "Intermediate",
    exercises: [
      { name: "Squats", sets: 4, reps: 8 },
      { name: "Deadlift", sets: 3, reps: 8 },
      { name: "Lunges", sets: 3, reps: 12 }
    ],
    estimatedDuration: 50,
    focusAreas: ["Legs", "Glutes", "Core"]
  },
  {
    name: "Beginner Full Body",
    description: "A full body workout perfect for beginners",
    difficulty: "Beginner",
    exercises: [
      { name: "Push-ups", sets: 3, reps: 10 },
      { name: "Squats", sets: 3, reps: 12 },
      { name: "Dumbbell Rows", sets: 3, reps: 12 },
      { name: "Plank", sets: 3, reps: 1, duration: 30 }
    ],
    estimatedDuration: 45,
    focusAreas: ["Full Body", "Strength", "Core"]
  }
];

export const muscleGroups = [
  "chest",
  "back",
  "shoulders",
  "biceps",
  "triceps",
  "core",
  "quadriceps",
  "hamstrings",
  "glutes",
  "calves",
  "forearms",
  "traps"
] as const;

export const equipmentTypes = [
  "bodyweight",
  "dumbbell",
  "barbell",
  "pull-up bar",
  "resistance bands",
  "kettlebell",
  "cable machine",
  "smith machine"
] as const;

export type MuscleGroup = typeof muscleGroups[number];
export type Equipment = typeof equipmentTypes[number];