import { seedExerciseType } from "./seeders/exerciseType.seed.js";
import { seedLesson } from "./seeders/lesson.seed.js";
import { seedDuration } from "./seeders/duration.seed.js";
import { seedExercise } from "./seeders/exercise.seed.js";

import { prisma } from "../lib/prisma.js";
import { seedSkill } from "./seeders/skill.seed.js";
import { seedCategory } from "./seeders/category.seed.js";
import { seedTopic } from "./seeders/topic.seed.js";

async function main() {
  console.log("🌱 Seeding started...");

  // --- Static first ---
  // await seedExerciseType(prisma);
  // await seedLesson(prisma);
  // await seedDuration(prisma);
  //   await seedSkill(prisma);

  // --- Dependent after ---
  // await seedExercise(prisma);
  // await seedCategory(prisma);
  // await seedTopic(prisma);


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
