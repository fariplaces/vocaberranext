export async function seedLesson(prisma) {
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
      { lesson: "TEST" },
   ];

   // const createdLessons = [];
   for (const l of lessons) {
      const existing = await prisma.lesson.findUnique({
         where: { lesson: l.lesson },
      });
      if(!existing){
         await prisma.lesson.create({ data: l });
      }
      // const lesson = await prisma.lesson.upsert({
      //    where: { lesson: l.lesson },
      //    update: {},
      //    create: l,
      // });
      // createdLessons.push(lesson);
   }
   console.log("✅ Lesson seeded");
   }