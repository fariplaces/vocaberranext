import { prisma } from "@/lib/prisma";

export const skillDbServices = {
  // --- SKILLS ---

  getPaginatedSkills: async ({ page = 1, limit = 10 }) => {
    const sanitizedPage = Math.max(1, Number(page) || 1);
    const sanitizedLimit = Math.max(1, Number(limit) || 10);
    const skip = (sanitizedPage - 1) * sanitizedLimit;

    // 1. Optional: Add filtering logic here if needed (e.g., by name, category, etc.)
    const where = {};

    // 2. Parallel execution for database optimization
    const [skills, totalCount] = await Promise.all([
      prisma.skill.findMany({
        where,
        skip,
        take: sanitizedLimit,
        orderBy: { order: "asc" },
        include: {
          categories: {
            where: { parentId: null },
            orderBy: { order: "asc" },
            include: {
              children: {
                orderBy: { order: "asc" },
                include: {
                  orderBy: { order: "asc" },
                  include: { topics: { orderBy: { order: "asc" } } },
                },
              },
              topics: {
                orderBy: { order: "asc" },
              },
            },
          },
        },
      }),
      prisma.skill.count({ where }),
    ]);

    const lastPage = Math.ceil(totalCount / sanitizedLimit);

    // 3. Return structured pagination response
    return {
      data: skills,
      current_page: sanitizedPage,
      last_page: lastPage,
      per_page: sanitizedLimit,
      has_next_page: sanitizedPage < lastPage,
      total: totalCount,
    };
  },

  // --- CATEGORIES ---

  getPaginatedCategories: async ({ page = 1, limit = 10 }) => {
    const sanitizedPage = Math.max(1, Number(page) || 1);
    const sanitizedLimit = Math.max(1, Number(limit) || 10);
    const skip = (sanitizedPage - 1) * sanitizedLimit;

    // 1. Optional: Add filtering logic here if needed (e.g., by name, skillId, etc.)
    const where = {};

    // 2. Parallel execution for database optimization
    const [categories, totalCount] = await Promise.all([
      prisma.category.findMany({
        where,
        skip,
        take: sanitizedLimit,
        orderBy: [{ skillId: "asc" }],
        include: {
          skill: true,
          parent: {
            include: {
              skill: true,
            },
          },
          topics: {
            orderBy: { order: "asc" },
          },
          children: {
            orderBy: { order: "asc" },
          },
        },
      }),
      prisma.category.count({ where }),
    ]);

    const lastPage = Math.ceil(totalCount / sanitizedLimit);

    return {
      data: categories,
      current_page: sanitizedPage,
      last_page: lastPage,
      per_page: sanitizedLimit,
      has_next_page: sanitizedPage < lastPage,
      total: totalCount,
    };
  },
  // --- TOPICS ---
  // --- REVISIONS ---
};
