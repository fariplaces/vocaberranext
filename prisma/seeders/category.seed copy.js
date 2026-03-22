export async function seedCategory(prisma) {
  console.log("Seeding categories...");

  // 1. Fetch all skills to map titles to IDs
  const allSkills = await prisma.skill.findMany();
  const skillMap = Object.fromEntries(
    allSkills.map((s) => [s.title.toLowerCase(), s.id])
  );

  // 2. Define the category data (Flattened hierarchy)
  const categoryData = [


    // JavaScript Categories
    { title: "StringMethods", order: 1, parent: "String", skill: "JavaScript" },
    { title: "NumberMethods", order: 1, parent: "Number", skill: "JavaScript" },
    { title: "BooleanMethods", order: 1, parent: "Boolean", skill: "JavaScript" },
    { title: "ArrayMethods", order: 1, parent: "Arrays", skill: "JavaScript" },
    { title: "ObjectMethods", order: 1, parent: "Objects", skill: "JavaScript" },


  ];

  // 3. Process the data
  // We use a Map to keep track of created IDs by title to link parents/children
  const createdCategories = new Map();

  for (const item of categoryData) {
    const skillId = skillMap[item.skill.toLowerCase()];
    if (!skillId) continue;

    const parentId = item.parent ? createdCategories.get(item.parent) : null;

    const created = await prisma.category.create({
      data: {
        title: item.title,
        order: item.order,
        skillId: skillId,
        parentId: parentId,
      },
    });

    // Store the ID so subsequent items can use it as a parent
    createdCategories.set(item.title, created.id);
  }

  console.log("Categories seeded successfully.");
}
