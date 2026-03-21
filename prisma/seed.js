import { seedExerciseType } from "./seeders/exerciseType.seed.js";
import { seedLesson } from "./seeders/lesson.seed.js";
import { seedDuration } from "./seeders/duration.seed.js";
import { seedExercise } from "./seeders/exercise.seed.js";



import { prisma } from "../lib/prisma.js"; 


async function main() {
   console.log("🌱 Seeding started...");

   // --- Static first ---
   await seedExerciseType(prisma);
   await seedLesson(prisma);
   await seedDuration(prisma);

   // --- Dependent after ---
   await seedExercise(prisma);

   console.log("🎉 All seeding completed!");
}

main()
   .catch((e) => {
      console.error(e);
      process.exit(1);
   })
   .finally(async () => {
      await prisma.$disconnect();
   });



