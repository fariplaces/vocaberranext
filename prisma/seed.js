import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
   // --- 1. Seed ExerciseType ---
   const exerciseTypes = [
      { type: "Exercise" },
      { type: "Test" },
   ];

   const createdTypes = [];
   for (const et of exerciseTypes) {
      const type = await prisma.exerciseType.upsert({
         where: { type: et.type },
         update: {},
         create: et,
      });
      createdTypes.push(type);
   }
   console.log("✅ ExerciseType seeded");

   // --- 2. Seed Lesson ---
   const lessons = [
      { lesson: "Lesson 1" },
      { lesson: "Lesson 2" },
      { lesson: "Lesson 3" },
      { lesson: "Lesson 4" },
      { lesson: "Lesson 5" },
      { lesson: "Lesson 6" },
      { lesson: "Lesson 7" },
      { lesson: "Lesson 8" },
      { lesson: "Lesson 9" },
      { lesson: "Lesson 10" },
      { lesson: "Lesson 11" },
      { lesson: "Lesson 12" },
   ];

   const createdLessons = [];
   for (const l of lessons) {
      const lesson = await prisma.lesson.upsert({
         where: { lesson: l.lesson },
         update: {},
         create: l,
      });
      createdLessons.push(lesson);
   }
   console.log("✅ Lesson seeded");

   // --- 3. Seed Duration ---
   const durations = [
      { duration: "2M" },
      { duration: "5M" },
      { duration: "10M" },
      { duration: "15M" },
      { duration: "20M" },
      { duration: "25M" },
      { duration: "30M" },
   ];

   const createdDurations = [];
   for (const d of durations) {
      const duration = await prisma.duration.upsert({
         where: { duration: d.duration },
         update: {},
         create: d,
      });
      createdDurations.push(duration);
   }
   console.log("✅ Duration seeded");

   // --- 4. Seed Exercise table depending on Type and Lesson ---
   // Example: 2 exercises per lesson
   const exercisesData = [];

   for (const lesson of createdLessons) {
      for (const type of createdTypes) {
         exercisesData.push({
            title: `${type.type} Exercise for ${lesson.lesson}`,
            exerciseNo: 1, // you can adjust numbering logic as needed
            typeId: type.id,
            lessonId: lesson.id,
         });
         exercisesData.push({
            title: `${type.type} Exercise 2 for ${lesson.lesson}`,
            exerciseNo: 2,
            typeId: type.id,
            lessonId: lesson.id,
         });
      }
   }

   for (const ex of exercisesData) {
      await prisma.exercise.upsert({
         where: { title: ex.title },
         update: {},
         create: ex,
      });
   }

   console.log("✅ Exercise seeded based on Type & Lesson");
}

main()
   .catch((e) => {
      console.error(e);
      process.exit(1);
   })
   .finally(async () => {
      await prisma.$disconnect();
   });



