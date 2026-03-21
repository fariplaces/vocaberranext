
export async function seedExercise(prisma) {
   const types = await prisma.exerciseType.findMany();
   const lessons = await prisma.lesson.findMany();

   const typeMap = {};
   types.forEach(t => typeMap[t.type.toLowerCase()] = t.id);

   const lessonMap = {};
   lessons.forEach(l => lessonMap[l.lesson.toLowerCase()] = l.id);

   const data = [
     // Lesson 1
  { title: "Key", no: "1.2", type: "exercise", lesson: "Lesson 1" },
  { title: "Key", no: "1.4", type: "exercise", lesson: "Lesson 1" },
  { title: "Word", no: "1.6", type: "exercise", lesson: "Lesson 1" },
  { title: "Para", no: "1.7", type: "exercise", lesson: "Lesson 1" },

  // Lesson 2
  { title: "Key", no: "2.1", type: "exercise", lesson: "Lesson 2" },
  { title: "Word", no: "2.3", type: "exercise", lesson: "Lesson 2" },
  { title: "Sentence", no: "2.4", type: "exercise", lesson: "Lesson 2" },
  { title: "Para", no: "2.6", type: "exercise", lesson: "Lesson 2" },

  // Lesson 3
  { title: "Key", no: "3.1", type: "exercise", lesson: "Lesson 3" },
  { title: "Word", no: "3.2", type: "exercise", lesson: "Lesson 3" },
  { title: "Sentence", no: "3.4", type: "exercise", lesson: "Lesson 3" },
  { title: "Para", no: "3.5", type: "exercise", lesson: "Lesson 3" },
  { title: "Text", no: "3.7", type: "exercise", lesson: "Lesson 3" },

  // Lesson 4
  { title: "Key", no: "4.1", type: "exercise", lesson: "Lesson 4" },
  { title: "Word", no: "4.2", type: "exercise", lesson: "Lesson 4" },
  { title: "Sentence", no: "4.3", type: "exercise", lesson: "Lesson 4" },
  { title: "Para", no: "4.5", type: "exercise", lesson: "Lesson 4" },
  { title: "Text", no: "4.6", type: "exercise", lesson: "Lesson 4" },

  // Lesson 5
  { title: "Key", no: "5.1", type: "exercise", lesson: "Lesson 5" },
  { title: "Word", no: "5.2", type: "exercise", lesson: "Lesson 5" },
  { title: "Sentence", no: "5.4", type: "exercise", lesson: "Lesson 5" },
  { title: "Para", no: "5.6", type: "exercise", lesson: "Lesson 5" },
  { title: "Text", no: "5.7", type: "exercise", lesson: "Lesson 5" },

  // Lesson 6
  { title: "Key", no: "6.1", type: "exercise", lesson: "Lesson 6" },
  { title: "Word", no: "6.2", type: "exercise", lesson: "Lesson 6" },
  { title: "Sentence", no: "6.3", type: "exercise", lesson: "Lesson 6" },
  { title: "Para", no: "6.4", type: "exercise", lesson: "Lesson 6" },
  { title: "Text", no: "6.6", type: "exercise", lesson: "Lesson 6" },

  // Lesson 7
  { title: "Key", no: "7.1", type: "exercise", lesson: "Lesson 7" },
  { title: "Word", no: "7.3", type: "exercise", lesson: "Lesson 7" },
  { title: "Sentence", no: "7.4", type: "exercise", lesson: "Lesson 7" },
  { title: "Para", no: "7.6", type: "exercise", lesson: "Lesson 7" },
  { title: "Text", no: "7.7", type: "exercise", lesson: "Lesson 7" },

  // Lesson 8
  { title: "Key", no: "8.1", type: "exercise", lesson: "Lesson 8" },
  { title: "Word", no: "8.3", type: "exercise", lesson: "Lesson 8" },
  { title: "Sentence", no: "8.4", type: "exercise", lesson: "Lesson 8" },
  { title: "Para", no: "8.5", type: "exercise", lesson: "Lesson 8" },
  { title: "Text", no: "8.6", type: "exercise", lesson: "Lesson 8" },

  // Lesson 9
  { title: "Key", no: "9.1", type: "exercise", lesson: "Lesson 9" },
  { title: "Word", no: "9.2", type: "exercise", lesson: "Lesson 9" },
  { title: "Sentence", no: "9.3", type: "exercise", lesson: "Lesson 9" },
  { title: "Para", no: "9.4", type: "exercise", lesson: "Lesson 9" },
  { title: "Text", no: "9.5", type: "exercise", lesson: "Lesson 9" },

  // Lesson 10
  { title: "Key", no: "10.1", type: "exercise", lesson: "Lesson 10" },
  { title: "Word", no: "10.2", type: "exercise", lesson: "Lesson 10" },
  { title: "Sentence", no: "10.3", type: "exercise", lesson: "Lesson 10" },
  { title: "Para", no: "10.4", type: "exercise", lesson: "Lesson 10" },
  { title: "Text", no: "10.5", type: "exercise", lesson: "Lesson 10" },

  // Lesson 11
  { title: "Key", no: "11.1", type: "exercise", lesson: "Lesson 11" },
  { title: "Word", no: "11.2", type: "exercise", lesson: "Lesson 11" },
  { title: "Sentence", no: "11.3", type: "exercise", lesson: "Lesson 11" },
  { title: "Para", no: "11.4", type: "exercise", lesson: "Lesson 11" },
  { title: "Text", no: "11.5", type: "exercise", lesson: "Lesson 11" },

  // Lesson 12
  { title: "Key", no: "12.1", type: "exercise", lesson: "Lesson 12" },
  { title: "Word", no: "12.2", type: "exercise", lesson: "Lesson 12" },
  { title: "Sentence", no: "12.3", type: "exercise", lesson: "Lesson 12" },
  { title: "Para", no: "12.4", type: "exercise", lesson: "Lesson 12" },
  { title: "Text", no: "12.6", type: "exercise", lesson: "Lesson 12" },

  // TEST DATA
  { title: "Aesop", no: 111, type: "test", lesson: "TEST" },
  { title: "Astronauts", no: 112, type: "test", lesson: "TEST" },
  { title: "BehindTheScene", no: 113, type: "test", lesson: "TEST" },
  { title: "DNA", no: 114, type: "test", lesson: "TEST" },
  { title: "Does WPM", no: 115, type: "test", lesson: "TEST" },
  { title: "History of Photography", no: 116, type: "test", lesson: "TEST" },
  { title: "Hubble Space", no: 117, type: "test", lesson: "TEST" },
  { title: "Legends of Abraham", no: 118, type: "test", lesson: "TEST" },
  { title: "Netiquette", no: 119, type: "test", lesson: "TEST" },
  { title: "Observations", no: 120, type: "test", lesson: "TEST" },
  { title: "Rules of Base Ball", no: 121, type: "test", lesson: "TEST" },
  { title: "Speeding Up", no: 122, type: "test", lesson: "TEST" },
  { title: "Stinging Insects", no: 123, type: "test", lesson: "TEST" },
  { title: "Benefits of Typing", no: 124, type: "test", lesson: "TEST" },
  { title: "Eight Tools", no: 125, type: "test", lesson: "TEST" },
  { title: "Life of Calamity", no: 126, type: "test", lesson: "TEST" },
  { title: "Little Match Girl", no: 127, type: "test", lesson: "TEST" },
  { title: "Peter Rabbit", no: 128, type: "test", lesson: "TEST" },
  { title: "Benjamin Franklin", no: 129, type: "test", lesson: "TEST" },
  { title: "What is Cast", no: 130, type: "test", lesson: "TEST" },
  { title: "Yosemite National Park", no: 131, type: "test", lesson: "TEST" }
   ];

   for (const item of data) {
      const typeId = typeMap[item.type.toLowerCase()];
      const lessonId = lessonMap[item.lesson.toLowerCase()];

      if (!typeId || !lessonId) {
         console.warn("⚠️ Skipping (Missing Type/Lesson):", item.title, item.lesson);
         continue;
      }

      // 1. Prepare the exercise number string (e.g., "1.2" or "test")
      const exNoString = item.no ? String(item.no) : "test";

      // 2. Manual check instead of upsert (since fields aren't unique)
      const existing = await prisma.exercise.findFirst({
         where: {
            exerciseNo: exNoString,
            lessonId: lessonId,
            title: item.title
         }
      });

      if (!existing) {
         await prisma.exercise.create({
            data: {
               title: item.title,
               exerciseNo: exNoString,
               typeId,
               lessonId,
            },
         });
         console.log(`✅ Created: ${item.lesson} - ${item.title} (${exNoString})`);
      } else {
         console.log(`ℹ️ Skipped: ${item.lesson} - ${item.title} already exists.`);
      }
   }

   console.log("✅ Exercise seeding complete");
}




// export async function seedExercise(prisma) {
//    // --- Fetch dependencies ---
//    const types = await prisma.exerciseType.findMany();
//    const lessons = await prisma.lesson.findMany();

//    // --- Create lookup maps ---
//    const typeMap = {};
//    types.forEach(t => {
//       typeMap[t.type.toLowerCase()] = t.id;
//    });

//    const lessonMap = {};
//    lessons.forEach(l => {
//       lessonMap[l.lesson.toLowerCase()] = l.id;
//    });

//    // --- Your Data ---
//   const data = [
//   // Lesson 1
//   { title: "Key", no: "1.2", type: "exercise", lesson: "Lesson 1" },
//   { title: "Key", no: "1.4", type: "exercise", lesson: "Lesson 1" },
//   { title: "Word", no: "1.6", type: "exercise", lesson: "Lesson 1" },
//   { title: "Para", no: "1.7", type: "exercise", lesson: "Lesson 1" },

//   // Lesson 2
//   { title: "Key", no: "2.1", type: "exercise", lesson: "Lesson 2" },
//   { title: "Word", no: "2.3", type: "exercise", lesson: "Lesson 2" },
//   { title: "Sentence", no: "2.4", type: "exercise", lesson: "Lesson 2" },
//   { title: "Para", no: "2.6", type: "exercise", lesson: "Lesson 2" },

//   // Lesson 3
//   { title: "Key", no: "3.1", type: "exercise", lesson: "Lesson 3" },
//   { title: "Word", no: "3.2", type: "exercise", lesson: "Lesson 3" },
//   { title: "Sentence", no: "3.4", type: "exercise", lesson: "Lesson 3" },
//   { title: "Para", no: "3.5", type: "exercise", lesson: "Lesson 3" },
//   { title: "Text", no: "3.7", type: "exercise", lesson: "Lesson 3" },

//   // Lesson 4
//   { title: "Key", no: "4.1", type: "exercise", lesson: "Lesson 4" },
//   { title: "Word", no: "4.2", type: "exercise", lesson: "Lesson 4" },
//   { title: "Sentence", no: "4.3", type: "exercise", lesson: "Lesson 4" },
//   { title: "Para", no: "4.5", type: "exercise", lesson: "Lesson 4" },
//   { title: "Text", no: "4.6", type: "exercise", lesson: "Lesson 4" },

//   // Lesson 5
//   { title: "Key", no: "5.1", type: "exercise", lesson: "Lesson 5" },
//   { title: "Word", no: "5.2", type: "exercise", lesson: "Lesson 5" },
//   { title: "Sentence", no: "5.4", type: "exercise", lesson: "Lesson 5" },
//   { title: "Para", no: "5.6", type: "exercise", lesson: "Lesson 5" },
//   { title: "Text", no: "5.7", type: "exercise", lesson: "Lesson 5" },

//   // Lesson 6
//   { title: "Key", no: "6.1", type: "exercise", lesson: "Lesson 6" },
//   { title: "Word", no: "6.2", type: "exercise", lesson: "Lesson 6" },
//   { title: "Sentence", no: "6.3", type: "exercise", lesson: "Lesson 6" },
//   { title: "Para", no: "6.4", type: "exercise", lesson: "Lesson 6" },
//   { title: "Text", no: "6.6", type: "exercise", lesson: "Lesson 6" },

//   // Lesson 7
//   { title: "Key", no: "7.1", type: "exercise", lesson: "Lesson 7" },
//   { title: "Word", no: "7.3", type: "exercise", lesson: "Lesson 7" },
//   { title: "Sentence", no: "7.4", type: "exercise", lesson: "Lesson 7" },
//   { title: "Para", no: "7.6", type: "exercise", lesson: "Lesson 7" },
//   { title: "Text", no: "7.7", type: "exercise", lesson: "Lesson 7" },

//   // Lesson 8
//   { title: "Key", no: "8.1", type: "exercise", lesson: "Lesson 8" },
//   { title: "Word", no: "8.3", type: "exercise", lesson: "Lesson 8" },
//   { title: "Sentence", no: "8.4", type: "exercise", lesson: "Lesson 8" },
//   { title: "Para", no: "8.5", type: "exercise", lesson: "Lesson 8" },
//   { title: "Text", no: "8.6", type: "exercise", lesson: "Lesson 8" },

//   // Lesson 9
//   { title: "Key", no: "9.1", type: "exercise", lesson: "Lesson 9" },
//   { title: "Word", no: "9.2", type: "exercise", lesson: "Lesson 9" },
//   { title: "Sentence", no: "9.3", type: "exercise", lesson: "Lesson 9" },
//   { title: "Para", no: "9.4", type: "exercise", lesson: "Lesson 9" },
//   { title: "Text", no: "9.5", type: "exercise", lesson: "Lesson 9" },

//   // Lesson 10
//   { title: "Key", no: "10.1", type: "exercise", lesson: "Lesson 10" },
//   { title: "Word", no: "10.2", type: "exercise", lesson: "Lesson 10" },
//   { title: "Sentence", no: "10.3", type: "exercise", lesson: "Lesson 10" },
//   { title: "Para", no: "10.4", type: "exercise", lesson: "Lesson 10" },
//   { title: "Text", no: "10.5", type: "exercise", lesson: "Lesson 10" },

//   // Lesson 11
//   { title: "Key", no: "11.1", type: "exercise", lesson: "Lesson 11" },
//   { title: "Word", no: "11.2", type: "exercise", lesson: "Lesson 11" },
//   { title: "Sentence", no: "11.3", type: "exercise", lesson: "Lesson 11" },
//   { title: "Para", no: "11.4", type: "exercise", lesson: "Lesson 11" },
//   { title: "Text", no: "11.5", type: "exercise", lesson: "Lesson 11" },

//   // Lesson 12
//   { title: "Key", no: "12.1", type: "exercise", lesson: "Lesson 12" },
//   { title: "Word", no: "12.2", type: "exercise", lesson: "Lesson 12" },
//   { title: "Sentence", no: "12.3", type: "exercise", lesson: "Lesson 12" },
//   { title: "Para", no: "12.4", type: "exercise", lesson: "Lesson 12" },
//   { title: "Text", no: "12.6", type: "exercise", lesson: "Lesson 12" },

//   // TEST DATA
//   { title: "Aesop", no: null, type: "test", lesson: "TEST" },
//   { title: "Astronauts", no: null, type: "test", lesson: "TEST" },
//   { title: "BehindTheScene", no: null, type: "test", lesson: "TEST" },
//   { title: "DNA", no: null, type: "test", lesson: "TEST" },
//   { title: "Does WPM", no: null, type: "test", lesson: "TEST" },
//   { title: "History of Photography", no: null, type: "test", lesson: "TEST" },
//   { title: "Hubble Space", no: null, type: "test", lesson: "TEST" },
//   { title: "Legends of Abraham", no: null, type: "test", lesson: "TEST" },
//   { title: "Netiquette", no: null, type: "test", lesson: "TEST" },
//   { title: "Observations", no: null, type: "test", lesson: "TEST" },
//   { title: "Rules of Base Ball", no: null, type: "test", lesson: "TEST" },
//   { title: "Speeding Up", no: null, type: "test", lesson: "TEST" },
//   { title: "Stinging Insects", no: null, type: "test", lesson: "TEST" },
//   { title: "Benefits of Typing", no: null, type: "test", lesson: "TEST" },
//   { title: "Eight Tools", no: null, type: "test", lesson: "TEST" },
//   { title: "Life of Calamity", no: null, type: "test", lesson: "TEST" },
//   { title: "Little Match Girl", no: null, type: "test", lesson: "TEST" },
//   { title: "Peter Rabbit", no: null, type: "test", lesson: "TEST" },
//   { title: "Benjamin Franklin", no: null, type: "test", lesson: "TEST" },
//   { title: "What is Cast", no: null, type: "test", lesson: "TEST" },
//   { title: "Yosemite National Park", no: null, type: "test", lesson: "TEST" }
// ];

//    for (const item of data) {
//       const typeKey = item.type.toLowerCase();
//       const lessonKey = item.lesson.toLowerCase();

//       const typeId = typeMap[typeKey];
//       const lessonId = lessonMap[lessonKey];

//       if (!typeId || !lessonId) {
//          console.warn("⚠️ Skipping:", item);
//          continue;
//       }

//       // Extract exercise number (after dot)
//       let exerciseNo = null;
//       // if (item.no) {
//       //    const parts = item.no.split(".");
//       //    exerciseNo = parseInt(parts[1]); // 1.2 → 2
//       // }

//       const uniqueTitle = `${item.title}-${item.no || "test"}-${item.lesson}`;

//       await prisma.exercise.upsert({
//          where: { title: uniqueTitle },
//          update: {},
//          create: {
//             title: item.title,
//             exerciseNo: exerciseNo || 0,
//             typeId,
//             lessonId,
//          },
//       });
//    }

//    console.log("✅ Exercise seeded from dataset");
// }