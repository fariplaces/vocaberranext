export async function seedSkill(prisma) {
  const skills = [
    { title: "OS", order: 1 },
    { title: "HTML", order: 2 },
    { title: "CSS", order: 3 },
    { title: "TailwindCSS", order: 4 },
    { title: "JS", order: 5 },
    { title: "PHP Procedural", order: 6 },
    { title: "PHP OOP", order: 7 },
    { title: "Terminal", order: 8 },
    { title: "WordPress", order: 9 },
    { title: "Git", order: 10 },
    { title: "Docker", order: 11 },
    { title: "Figma", order: 12 },
    { title: "Office", order: 13 },
    { title: "Laravel", order: 14 },
    { title: "React", order: 15 },
    { title: "ShadCN", order: 16 },
    { title: "MaterialUI", order: 17 },
    { title: "AntDesign", order: 18 },
    { title: "Tanstack", order: 19 },
  ];

  console.log("Seeding skills...");

  for (const skill of skills) {
    await prisma.skill.upsert({
      where: { id: "" }, // This assumes you're creating new records
      update: {},
      create: skill,
    });
  }
}

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
