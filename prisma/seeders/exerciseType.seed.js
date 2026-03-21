export async function seedExerciseType(prisma) {
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
   };
   console.log("✅ ExerciseType seeded");
   };