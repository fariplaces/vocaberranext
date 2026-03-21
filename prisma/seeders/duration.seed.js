export async function seedDuration(prisma) {
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
}

// for (const d of durations) {
//    // Use findFirst instead of findUnique
//    const existing = await prisma.duration.findFirst({
//       where: { duration: d.duration }
//    });

//    if (!existing) {
//       await prisma.duration.create({ data: d });
//    }
// }