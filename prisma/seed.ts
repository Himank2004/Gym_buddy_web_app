import { PrismaClient, type Prisma } from "@prisma/client";

const prisma = new PrismaClient();

type ExerciseSeed = Omit<Prisma.ExerciseCreateManyInput, "imageUrl" | "instructions" | "tips">;
type ExerciseRow = [string, string, string, string, string[], string, string];
type FoodRow = [string, string, number, number, number, number];

const exerciseImage = (name: string) =>
  `https://placehold.co/800x600/18181b/a3e635?text=${encodeURIComponent(name)}`;

const exerciseRows: ExerciseRow[] = [
  ["Barbell Bench Press", "barbell-bench-press", "Strength", "Chest", ["Triceps", "Shoulders"], "Barbell", "Intermediate"],
  ["Incline Dumbbell Press", "incline-dumbbell-press", "Strength", "Chest", ["Triceps", "Shoulders"], "Dumbbells", "Intermediate"],
  ["Push Up", "push-up", "Strength", "Chest", ["Triceps", "Core"], "Bodyweight", "Beginner"],
  ["Chest Fly", "chest-fly", "Strength", "Chest", ["Shoulders"], "Dumbbells", "Beginner"],
  ["Cable Crossover", "cable-crossover", "Strength", "Chest", ["Shoulders"], "Cable Machine", "Intermediate"],
  ["Dips", "dips", "Strength", "Chest", ["Triceps", "Shoulders"], "Bodyweight", "Intermediate"],
  ["Decline Bench Press", "decline-bench-press", "Strength", "Chest", ["Triceps"], "Barbell", "Intermediate"],
  ["Machine Chest Press", "machine-chest-press", "Strength", "Chest", ["Triceps"], "Machine", "Beginner"],
  ["Pull Up", "pull-up", "Strength", "Back", ["Biceps", "Core"], "Bodyweight", "Intermediate"],
  ["Lat Pulldown", "lat-pulldown", "Strength", "Back", ["Biceps"], "Cable Machine", "Beginner"],
  ["Barbell Row", "barbell-row", "Strength", "Back", ["Biceps", "Core"], "Barbell", "Intermediate"],
  ["Seated Cable Row", "seated-cable-row", "Strength", "Back", ["Biceps"], "Cable Machine", "Beginner"],
  ["Deadlift", "deadlift", "Strength", "Back", ["Glutes", "Legs"], "Barbell", "Advanced"],
  ["Romanian Deadlift", "romanian-deadlift", "Strength", "Back", ["Glutes", "Legs"], "Barbell", "Intermediate"],
  ["Single Arm Dumbbell Row", "single-arm-dumbbell-row", "Strength", "Back", ["Biceps"], "Dumbbell", "Beginner"],
  ["Face Pull", "face-pull", "Strength", "Back", ["Shoulders"], "Cable Machine", "Beginner"],
  ["T-Bar Row", "t-bar-row", "Strength", "Back", ["Biceps"], "Machine", "Intermediate"],
  ["Straight Arm Pulldown", "straight-arm-pulldown", "Strength", "Back", ["Core"], "Cable Machine", "Beginner"],
  ["Shoulder Press", "shoulder-press", "Strength", "Shoulders", ["Triceps"], "Dumbbells", "Intermediate"],
  ["Lateral Raise", "lateral-raise", "Strength", "Shoulders", ["Traps"], "Dumbbells", "Beginner"],
  ["Front Raise", "front-raise", "Strength", "Shoulders", ["Chest"], "Dumbbells", "Beginner"],
  ["Arnold Press", "arnold-press", "Strength", "Shoulders", ["Triceps"], "Dumbbells", "Intermediate"],
  ["Rear Delt Fly", "rear-delt-fly", "Strength", "Shoulders", ["Back"], "Dumbbells", "Beginner"],
  ["Upright Row", "upright-row", "Strength", "Shoulders", ["Traps"], "Barbell", "Intermediate"],
  ["Landmine Press", "landmine-press", "Strength", "Shoulders", ["Core", "Triceps"], "Barbell", "Intermediate"],
  ["Barbell Curl", "barbell-curl", "Strength", "Biceps", ["Forearms"], "Barbell", "Beginner"],
  ["Hammer Curl", "hammer-curl", "Strength", "Biceps", ["Forearms"], "Dumbbells", "Beginner"],
  ["Incline Dumbbell Curl", "incline-dumbbell-curl", "Strength", "Biceps", ["Forearms"], "Dumbbells", "Intermediate"],
  ["Concentration Curl", "concentration-curl", "Strength", "Biceps", ["Forearms"], "Dumbbell", "Beginner"],
  ["Preacher Curl", "preacher-curl", "Strength", "Biceps", ["Forearms"], "EZ Bar", "Intermediate"],
  ["Cable Curl", "cable-curl", "Strength", "Biceps", ["Forearms"], "Cable Machine", "Beginner"],
  ["Tricep Pushdown", "tricep-pushdown", "Strength", "Triceps", ["Shoulders"], "Cable Machine", "Beginner"],
  ["Skull Crusher", "skull-crusher", "Strength", "Triceps", ["Shoulders"], "EZ Bar", "Intermediate"],
  ["Overhead Tricep Extension", "overhead-tricep-extension", "Strength", "Triceps", ["Shoulders"], "Dumbbell", "Beginner"],
  ["Close Grip Bench Press", "close-grip-bench-press", "Strength", "Triceps", ["Chest"], "Barbell", "Intermediate"],
  ["Bench Dip", "bench-dip", "Strength", "Triceps", ["Chest"], "Bodyweight", "Beginner"],
  ["Rope Tricep Extension", "rope-tricep-extension", "Strength", "Triceps", ["Shoulders"], "Cable Machine", "Beginner"],
  ["Squat", "squat", "Strength", "Legs", ["Glutes", "Core"], "Barbell", "Intermediate"],
  ["Leg Press", "leg-press", "Strength", "Legs", ["Glutes"], "Machine", "Beginner"],
  ["Lunges", "lunges", "Strength", "Legs", ["Glutes", "Core"], "Bodyweight", "Beginner"],
  ["Leg Extension", "leg-extension", "Strength", "Legs", ["Core"], "Machine", "Beginner"],
  ["Leg Curl", "leg-curl", "Strength", "Legs", ["Glutes"], "Machine", "Beginner"],
  ["Standing Calf Raise", "standing-calf-raise", "Strength", "Legs", ["Balance"], "Machine", "Beginner"],
  ["Front Squat", "front-squat", "Strength", "Legs", ["Core", "Glutes"], "Barbell", "Advanced"],
  ["Goblet Squat", "goblet-squat", "Strength", "Legs", ["Glutes", "Core"], "Dumbbell", "Beginner"],
  ["Bulgarian Split Squat", "bulgarian-split-squat", "Strength", "Legs", ["Glutes", "Core"], "Dumbbells", "Intermediate"],
  ["Walking Lunge", "walking-lunge", "Strength", "Legs", ["Glutes", "Core"], "Dumbbells", "Intermediate"],
  ["Barbell Hip Thrust", "barbell-hip-thrust", "Strength", "Glutes", ["Legs", "Core"], "Barbell", "Intermediate"],
  ["Glute Bridge", "glute-bridge", "Strength", "Glutes", ["Core"], "Bodyweight", "Beginner"],
  ["Cable Kickback", "cable-kickback", "Strength", "Glutes", ["Legs"], "Cable Machine", "Beginner"],
  ["Sumo Deadlift", "sumo-deadlift", "Strength", "Glutes", ["Legs", "Back"], "Barbell", "Advanced"],
  ["Step Up", "step-up", "Strength", "Glutes", ["Legs", "Core"], "Dumbbells", "Beginner"],
  ["Plank", "plank", "Strength", "Core", ["Shoulders", "Glutes"], "Bodyweight", "Beginner"],
  ["Crunches", "crunches", "Strength", "Core", ["Hip Flexors"], "Bodyweight", "Beginner"],
  ["Russian Twist", "russian-twist", "Strength", "Core", ["Obliques"], "Bodyweight", "Beginner"],
  ["Hanging Leg Raise", "hanging-leg-raise", "Strength", "Core", ["Hip Flexors"], "Pull-up Bar", "Intermediate"],
  ["Bicycle Crunch", "bicycle-crunch", "Strength", "Core", ["Obliques"], "Bodyweight", "Beginner"],
  ["Dead Bug", "dead-bug", "Strength", "Core", ["Hip Flexors"], "Bodyweight", "Beginner"],
  ["Cable Crunch", "cable-crunch", "Strength", "Core", ["Hip Flexors"], "Cable Machine", "Intermediate"],
  ["Ab Wheel Rollout", "ab-wheel-rollout", "Strength", "Core", ["Shoulders"], "Ab Wheel", "Advanced"],
  ["Running", "running", "Cardio", "Cardio", ["Legs", "Core"], "Treadmill", "Beginner"],
  ["Cycling", "cycling", "Cardio", "Cardio", ["Legs"], "Stationary Bike", "Beginner"],
  ["Burpees", "burpees", "Cardio", "Cardio", ["Chest", "Legs", "Core"], "Bodyweight", "Intermediate"],
  ["Mountain Climbers", "mountain-climbers", "Cardio", "Cardio", ["Core", "Shoulders"], "Bodyweight", "Beginner"],
  ["Rowing Machine", "rowing-machine", "Cardio", "Cardio", ["Back", "Legs"], "Rowing Machine", "Beginner"],
  ["Jump Rope", "jump-rope", "Cardio", "Cardio", ["Legs", "Core"], "Jump Rope", "Beginner"],
  ["Incline Walk", "incline-walk", "Cardio", "Cardio", ["Legs", "Glutes"], "Treadmill", "Beginner"],
  ["Kettlebell Swing", "kettlebell-swing", "Conditioning", "Full Body", ["Glutes", "Core", "Back"], "Kettlebell", "Intermediate"],
  ["Farmer's Walk", "farmers-walk", "Conditioning", "Full Body", ["Core", "Forearms"], "Dumbbells", "Intermediate"],
  ["Clean and Press", "clean-and-press", "Strength", "Full Body", ["Shoulders", "Legs", "Core"], "Barbell", "Advanced"],
  ["Thruster", "thruster", "Conditioning", "Full Body", ["Legs", "Shoulders", "Core"], "Barbell", "Advanced"],
  ["Battle Ropes", "battle-ropes", "Conditioning", "Full Body", ["Shoulders", "Core"], "Battle Ropes", "Intermediate"],
  ["Box Jump", "box-jump", "Conditioning", "Full Body", ["Legs", "Glutes"], "Plyo Box", "Intermediate"],
  ["Turkish Get Up", "turkish-get-up", "Strength", "Full Body", ["Shoulders", "Core", "Glutes"], "Kettlebell", "Advanced"],
  ["Sled Push", "sled-push", "Conditioning", "Full Body", ["Legs", "Core"], "Sled", "Intermediate"],
  ["Bear Crawl", "bear-crawl", "Conditioning", "Full Body", ["Core", "Shoulders"], "Bodyweight", "Intermediate"],
];

const exercises: ExerciseSeed[] = exerciseRows.map(([name, slug, category, muscleGroup, secondaryMuscles, equipment, difficulty]) => ({
  name, slug, category, muscleGroup, secondaryMuscles, equipment, difficulty,
}));

const foodRows: FoodRow[] = [
  ["Rice", "1 cup cooked", 205, 4.3, 44.5, 0.4], ["Roti", "1 medium", 120, 3.5, 20, 3], ["Bread", "2 slices", 160, 6, 30, 2], ["Oats", "50 g", 190, 6.5, 33, 3.5], ["Banana", "1 medium", 105, 1.3, 27, 0.4], ["Apple", "1 medium", 95, 0.5, 25, 0.3], ["Milk", "250 ml", 150, 8, 12, 8], ["Curd", "200 g", 122, 7, 9, 6], ["Paneer", "100 g", 265, 18, 6, 20], ["Eggs", "2 large", 144, 12.6, 0.8, 9.6], ["Chicken Breast", "100 g cooked", 165, 31, 0, 3.6], ["Fish", "100 g cooked", 140, 25, 0, 5], ["Dal", "1 cup cooked", 230, 18, 40, 1], ["Rajma", "1 cup cooked", 225, 15, 40, 1], ["Chana", "1 cup cooked", 269, 14.5, 45, 4.2], ["Potato", "1 medium", 161, 4.3, 37, 0.2], ["Sweet Potato", "1 medium", 112, 2, 26, 0.1], ["Peanut Butter", "2 tbsp", 190, 8, 7, 16], ["Whey Protein", "1 scoop", 120, 24, 3, 2], ["Almonds", "28 g", 164, 6, 6, 14], ["Peanuts", "28 g", 161, 7, 5, 14], ["Tofu", "100 g", 144, 17, 3, 9], ["Soy Chunks", "50 g dry", 172, 26, 16, 0.5], ["Brown Rice", "1 cup cooked", 216, 5, 45, 1.8], ["Pasta", "1 cup cooked", 221, 8, 43, 1.3], ["Poha", "1 cup", 250, 5, 48, 5], ["Upma", "1 cup", 250, 6, 42, 7], ["Idli", "2 pieces", 130, 4, 28, 0.6], ["Dosa", "1 medium", 168, 4, 31, 3.7], ["Sprouts", "1 cup", 120, 9, 22, 1], ["Salad", "1 bowl", 60, 2, 12, 0.5], ["Broccoli", "1 cup", 55, 3.7, 11, 0.6], ["Spinach", "1 cup cooked", 41, 5.3, 6.8, 0.5], ["Cheese", "30 g", 120, 7, 1, 10], ["Greek Yogurt", "170 g", 100, 17, 6, 0.7], ["Tea", "1 cup", 30, 1, 5, 1], ["Coffee", "1 cup", 5, 0.3, 0, 0], ["Orange", "1 medium", 62, 1.2, 15.4, 0.2], ["Chapati", "1 medium", 104, 3.1, 18, 2.1], ["Muesli", "50 g", 190, 5, 33, 4],
];

const foods: Prisma.FoodItemCreateManyInput[] = foodRows.map(([name, servingSize, calories, proteinG, carbsG, fatsG]) => ({ name, servingSize, calories, proteinG, carbsG, fatsG }));

async function main() {
  for (const exercise of exercises) {
    await prisma.exercise.upsert({
      where: { slug: exercise.slug },
      update: { ...exercise, imageUrl: exerciseImage(exercise.name), instructions: `Perform ${exercise.name} with controlled form.`, tips: "Start light and prioritize a full, comfortable range of motion." },
      create: { ...exercise, imageUrl: exerciseImage(exercise.name), instructions: `Perform ${exercise.name} with controlled form.`, tips: "Start light and prioritize a full, comfortable range of motion." },
    });
  }

  await prisma.foodItem.deleteMany();
  await prisma.foodItem.createMany({ data: foods });
  console.log(`Seeded ${exercises.length} exercises and ${foods.length} food items.`);
}

main().catch((error: unknown) => { console.error(error); process.exitCode = 1; }).finally(async () => { await prisma.$disconnect(); });
