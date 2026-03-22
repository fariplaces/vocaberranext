export async function seedCategory(prisma) {
  console.log("Seeding categories...");

  // 1. Fetch all skills to map titles to IDs
  const allSkills = await prisma.skill.findMany();
  const skillMap = Object.fromEntries(
    allSkills.map((s) => [s.title.toLowerCase(), s.id])
  );

  // 2. Define the category data (Flattened hierarchy)
  const categoryData = [
    // OS Categories
    { title: "Firewall", order: 1, skill: "Operating System" },
    { title: "ShortCuts", order: 2, skill: "Operating System" },
    { title: "Operating System", order: 3, skill: "Operating System" },
    {
      title: "Windows",
      order: 4,
      parent: "Operating System",
      skill: "Operating System",
    },

    // HTML Categories
    { title: "Basic", order: 1, skill: "HTML" },
    { title: "Headings and Paragraph", order: 2, skill: "HTML" },
    { title: "Formatting", order: 3, skill: "HTML" },
    { title: "Anchor & Link", order: 4, skill: "HTML" },
    { title: "Media", order: 5, skill: "HTML" },
    { title: "Table", order: 6, skill: "HTML" },
    { title: "Lists & Dropdowns", order: 7, skill: "HTML" },
    { title: "Forms and Inputs", order: 8, skill: "HTML" },
    { title: "Misc", order: 9, skill: "HTML" },

    // CSS Categories
    { title: "SyntaxAndStructure", order: 1, skill: "CSS" },
    { title: "Selectors", order: 2, skill: "CSS" },
    { title: "Background", order: 3, skill: "CSS" },
    { title: "BordersAndOutline", order: 4, skill: "CSS" },
    { title: "BoxModel", order: 5, skill: "CSS" },
    { title: "MeasurementUnits", order: 6, skill: "CSS" },
    { title: "ShadowAndGradient", order: 7, skill: "CSS" },

    // JavaScript Categories
    { title: "Basics JS", order: 1, skill: "JavaScript" },
    { title: "Alerts", order: 2, skill: "JavaScript" },
    { title: "Console", order: 3, skill: "JavaScript" },
    { title: "Variables", order: 4, skill: "JavaScript" },
    { title: "Data Types", order: 5, skill: "JavaScript" },
    { title: "Operators", order: 6, skill: "JavaScript" },
    { title: "ControlStructures", order: 7, skill: "JavaScript" },
    { title: "Functions JS", order: 8, skill: "JavaScript" },
    { title: "Loops JS", order: 9, skill: "JavaScript" },
    { title: "Date Methods", order: 10, skill: "JavaScript" },
    { title: "Events", order: 11, skill: "JavaScript" },
    { title: "DOM", order: 12, skill: "JavaScript" },
    { title: "BOM", order: 14, skill: "JavaScript" },
    { title: "String", order: 1, parent: "Data Types", skill: "JavaScript" },
    { title: "Number", order: 2, skill: "JavaScript" },
    { title: "Boolean", order: 3, skill: "JavaScript" },
    { title: "NullUndefined", order: 4, skill: "JavaScript" },
    { title: "Arrays", order: 5, skill: "JavaScript" },
    { title: "Objects", order: 6, skill: "JavaScript" },
    {
      title: "Arithematic Operators",
      order: 1,
      parent: "Operators",
      skill: "JavaScript",
    },
    { title: "Assignment Operators", order: 2, skill: "JavaScript" },
    { title: "Comparison Operators", order: 3, skill: "JavaScript" },
    { title: "Logical Operators", order: 4, skill: "JavaScript" },
    {
      title: "Conditionals",
      order: 1,
      parent: "ControlStructures",
      skill: "JavaScript",
    },
    { title: "SwitchStatements", order: 2, skill: "JavaScript" },
    { title: "BasicEvents", order: 1, parent: "Events", skill: "JavaScript" },
    { title: "FormEvents", order: 2, skill: "JavaScript" },
    { title: "Interval", order: 3, skill: "JavaScript" },
    { title: "TimeOut", order: 4, skill: "JavaScript" },
    { title: "Keys", order: 5, skill: "JavaScript" },
    { title: "ClipBoard", order: 6, skill: "JavaScript" },
    { title: "Internet", order: 7, skill: "JavaScript" },
    {
      title: "BasicDocumentCommands",
      order: 1,
      parent: "DOM",
      skill: "JavaScript",
    },
    { title: "ElementSelectors", order: 2, skill: "JavaScript" },
    { title: "QuerySelectors", order: 3, skill: "JavaScript" },
    { title: "InnerTextAndHTML", order: 4, skill: "JavaScript" },
    { title: "Attributes", order: 5, skill: "JavaScript" },
    { title: "Styling", order: 6, skill: "JavaScript" },
    { title: "ClassList", order: 7, skill: "JavaScript" },
    { title: "TraversingMethods", order: 8, skill: "JavaScript" },
    { title: "CreateMethods", order: 9, skill: "JavaScript" },
    { title: "AppendMethods", order: 10, skill: "JavaScript" },
    { title: "InsertAdjacentMethods", order: 11, skill: "JavaScript" },
    { title: "ChildMethod", order: 12, skill: "JavaScript" },
    { title: "HasMethods", order: 13, skill: "JavaScript" },
    { title: "MiscMethods", order: 14, skill: "JavaScript" },
    { title: "WindowDimentions", order: 1, skill: "JavaScript" },
    { title: "WindowControls", order: 2, skill: "JavaScript" },
    { title: "WindowMove", order: 3, skill: "JavaScript" },
    { title: "WindowResize", order: 4, skill: "JavaScript" },
    { title: "WindowScroll", order: 5, skill: "JavaScript" },
    { title: "LocationAndHistory", order: 6, skill: "JavaScript" },
    { title: "CursorCoordinates", order: 7, skill: "JavaScript" },
    { title: "ScrollAmounts", order: 8, parent: "BOM", skill: "JavaScript" },

    // PHP Procedural Categories
    { title: "Basics", order: 1, skill: "PHP Procedural" },
    { title: "DataTypes", order: 2, skill: "PHP Procedural" },
    {
      title: "ScalarTypes",
      order: 1,
      parent: "DataTypes",
      skill: "PHP Procedural",
    },
    {
      title: "StringTypes",
      order: 1,
      parent: "ScalarTypes",
      skill: "PHP Procedural",
    },
    {
      title: "IntegerTypes&Methods",
      order: 2,
      parent: "ScalarTypes",
      skill: "PHP Procedural",
    },
    {
      title: "FloatTypes&Methods",
      order: 3,
      parent: "ScalarTypes",
      skill: "PHP Procedural",
    },
    {
      title: "BooleanTypes&Methods",
      order: 4,
      parent: "ScalarTypes",
      skill: "PHP Procedural",
    },
    {
      title: "Compound",
      order: 2,
      parent: "DataTypes",
      skill: "PHP Procedural",
    },
    {
      title: "ArrayTypes&Methods",
      order: 1,
      parent: "ScalarTypes",
      skill: "PHP Procedural",
    },
    {
      title: "Special",
      order: 3,
      parent: "DataTypes",
      skill: "PHP Procedural",
    },
    { title: "Null", order: 1, parent: "ScalarTypes", skill: "PHP Procedural" },
    {
      title: "Resource",
      order: 2,
      parent: "ScalarTypes",
      skill: "PHP Procedural",
    },
    { title: "Variable&Scopes", order: 3, skill: "PHP Procedural" },
    { title: "Operators", order: 4, skill: "PHP Procedural" },
    {
      title: "ArithematicOperators",
      order: 1,
      parent: "Operators",
      skill: "PHP Procedural",
    },
    {
      title: "AssignmentOperators",
      order: 2,
      parent: "Operators",
      skill: "PHP Procedural",
    },
    {
      title: "StringOperators",
      order: 3,
      parent: "Operators",
      skill: "PHP Procedural",
    },
    {
      title: "ComparisonOperators",
      order: 4,
      parent: "Operators",
      skill: "PHP Procedural",
    },
    {
      title: "TurnaryOperator",
      order: 5,
      parent: "Operators",
      skill: "PHP Procedural",
    },
    {
      title: "NullCoalescingOperator",
      order: 6,
      parent: "Operators",
      skill: "PHP Procedural",
    },
    {
      title: "ErrorControlOperator",
      order: 7,
      parent: "Operators",
      skill: "PHP Procedural",
    },
    {
      title: "IncrementDecrementOperator",
      order: 8,
      parent: "Operators",
      skill: "PHP Procedural",
    },
    {
      title: "LogicalOperator",
      order: 9,
      parent: "Operators",
      skill: "PHP Procedural",
    },
    {
      title: "ShortCircuitOperator",
      order: 10,
      parent: "Operators",
      skill: "PHP Procedural",
    },
    {
      title: "BitWiseOperator",
      order: 11,
      parent: "Operators",
      skill: "PHP Procedural",
    },
    {
      title: "ArrayOperators",
      order: 12,
      parent: "Operators",
      skill: "PHP Procedural",
    },
    {
      title: "ExecutionOperator",
      order: 13,
      parent: "Operators",
      skill: "PHP Procedural",
    },
    {
      title: "TypeOperator",
      order: 14,
      parent: "Operators",
      skill: "PHP Procedural",
    },
    {
      title: "NullSafeOperator",
      order: 15,
      parent: "Operators",
      skill: "PHP Procedural",
    },
    {
      title: "SpaceshipOperator",
      order: 16,
      parent: "Operators",
      skill: "PHP Procedural",
    },
    {
      title: "Presidence&Associativity",
      order: 17,
      parent: "Operators",
      skill: "PHP Procedural",
    },
    { title: "ControlStructure", order: 5, skill: "PHP Procedural" },
    { title: "Functions", order: 6, skill: "PHP Procedural" },
    { title: "Date", order: 7, skill: "PHP Procedural" },
    { title: "Loops", order: 8, skill: "PHP Procedural" },
    { title: "Declare", order: 9, skill: "PHP Procedural" },
    { title: "Return&Yield", order: 10, skill: "PHP Procedural" },
    { title: "Include&Require", order: 11, skill: "PHP Procedural" },
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
