import { prisma } from "@/lib/prisma";

export const skillDbServices = {
  //* ==========================================
  // --- SKILLS ---
  //* ==========================================

  //* Fetch Paginated Skills
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
                  topics: {
                    orderBy: { order: "asc" },
                  },
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

  //* Create Skill
  createSkill: async ({ title, order }) => {
    // 1. Basic Validation
    if (!title) {
      throw { status: 400, message: "Skill title is required" };
    }

    try {
      // 2. Create the new Skill
      return await prisma.skill.create({
        data: {
          title,
          order: order ? Number(order) : 0, // Fallback to 0 if no order or invalid value provided
        },
        include: {
          categories: true,
        },
      });
    } catch (prismaError) {
      // Handle Unique Constraint (e.g., if you have an active @unique on the title field)
      if (prismaError.code === "P2002") {
        throw {
          status: 400,
          message: "A skill with this title already exists",
        };
      }
      throw prismaError;
    }
  },

  //* Update Skill
  updateSkill: async (id, data) => {
    const { title, order } = data;
    // 1. Basic Validation
    if (!id) {
      throw {
        status: 400,
        message: "Skill ID is required in the request body",
      };
    }

    try {
      // 2. Perform partial update
      return await prisma.skill.update({
        where: { id },
        data: {
          ...(title !== undefined && { title }),
          ...(order !== undefined && {
            order: order !== null ? Number(order) : null,
          }),
        },
      });
    } catch (prismaError) {
      // Catch Prisma Record to Update Not Found error code
      if (prismaError.code === "P2025") {
        throw { status: 404, message: "Skill not found" };
      }
      throw prismaError;
    }
  },

  //* Delete Skill
  deleteSkill: async (id) => {
    // 1. Basic Validation
    if (!id) {
      throw { status: 400, message: "Skill ID is required" };
    }

    try {
      // 2. Attempt deletion from database
      return await prisma.skill.delete({
        where: { id },
      });
    } catch (prismaError) {
      // Catch Prisma Foreign Key restriction (linked children exist without cascade)
      if (prismaError.code === "P2003") {
        throw {
          status: 400,
          message:
            "Cannot delete skill. Please delete its categories and topics first, or enable Cascade Delete in your schema.",
        };
      }

      // Catch Prisma Record to Delete Not Found error code
      if (prismaError.code === "P2025") {
        throw { status: 404, message: "Skill not found" };
      }

      throw prismaError;
    }
  },

  //* Check Order Uniqueness
  checkOrderUniqueness: async ({ order, excludeId }) => {
    // 1. Sanitize & Parse the input value safely to an integer
    const targetOrder = Number(order);

    if (isNaN(targetOrder)) {
      throw {
        status: 400,
        message: "Skill Order must be a valid numeric index sequence",
      };
    }

    try {
      // 2. Build a dynamic clause checking for duplicates while ignoring active edit records
      const duplicateCount = await prisma.skill.count({
        where: {
          order: targetOrder,
          // 🛡️ Dynamic Exclusion: Only add "not equal" constraint if an active edit ID is present
          ...(excludeId ? { id: { not: excludeId } } : {}),
        },
      });

      // If count is greater than 0, a duplicate exists elsewhere in your table
      return duplicateCount > 0;
    } catch (prismaError) {
      console.error(
        "Prisma Count Unique Database Operation Exception:",
        prismaError,
      );
      throw prismaError;
    }
  },

  //* ==========================================
  // --- CATEGORIES ---
  //* ==========================================

  //* Fetch Paginated Categories
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

  //* Create Category
  createCategory: async ({ title, order, skillId, parentId }) => {
    if (!title) {
      throw { status: 400, message: "Category title is required" };
    }

    if (!skillId && !parentId) {
      throw {
        status: 400,
        message: "Category must be linked to a Skill or a Parent Category",
      };
    }

    return await prisma.category.create({
      data: {
        title,
        order: order ? Number(order) : 0,
        skillId: skillId || null,
        parentId: parentId || null,
      },
      include: {
        skill: true,
        parent: {
          include: {
            skill: true,
          },
        },
        children: true,
        topics: true,
      },
    });
  },

  //* Update Category
  updateCategory: async ({ id, title, order, parentId, skillId }) => {
    // 1. Basic Validation
    if (!id) {
      throw {
        status: 400,
        message: "Category ID is required to perform an update",
      };
    }

    try {
      // 2. Perform partial dynamic updates
      return await prisma.category.update({
        where: { id },
        data: {
          ...(title !== undefined && { title }),
          ...(order !== undefined && {
            order: order !== null ? Number(order) : null,
          }),
          ...(parentId !== undefined && { parentId: parentId || null }),
          ...(skillId !== undefined && { skillId: skillId || null }),
        },
        include: {
          skill: true,
          parent: {
            include: {
              skill: true,
            },
          },
          children: true,
          topics: true,
        },
      });
    } catch (prismaError) {
      // Catch Prisma Record to Update Not Found error code
      if (prismaError.code === "P2025") {
        throw { status: 404, message: "Category not found" };
      }
      throw prismaError;
    }
  },

  //* Delete Category
  deleteCategory: async (id) => {
    // 1. Basic Validation
    if (!id) {
      throw { status: 400, message: "Category ID is required" };
    }

    try {
      // 2. Attempt to delete from the database
      return await prisma.category.delete({
        where: { id },
      });
    } catch (prismaError) {
      // Catch Prisma Foreign Key constraint error (has children or topics linked)
      if (prismaError.code === "P2003") {
        throw {
          status: 400,
          message:
            "Cannot delete category. Please delete all sub-categories and topics first.",
        };
      }

      // Catch Prisma Record to Delete Not Found error code
      if (prismaError.code === "P2025") {
        throw { status: 404, message: "Category not found" };
      }

      throw prismaError;
    }
  },

  //* ==========================================
  // --- TOPICS ---
  //* ==========================================

  //* Fetch Paginated Topics
  getPaginatedTopics: async ({ page = 1, limit = 10 }) => {
    // Prevent zero or negative numbers from breaking database query bounds
    const sanitizedPage = Math.max(1, Number(page));
    const sanitizedLimit = Math.max(1, Number(limit));
    const skip = (sanitizedPage - 1) * sanitizedLimit;

    const where = {}; // Add global search/filters here if needed later

    // 1. Parallel execution: Fetch database records and count total simultaneously
    const [topics, totalCount] = await Promise.all([
      prisma.topic.findMany({
        where,
        skip,
        take: sanitizedLimit,
        include: {
          category: {
            include: {
              skill: true,
              parent: {
                include: { skill: true },
              },
            },
          },
        },
      }),
      prisma.topic.count({ where }),
    ]);

    // 2. Transform the data to map structural context attributes
    const formattedData = topics.map((topic) => {
      const cat = topic.category;

      // Logic: If cat.parent exists, take its skill. Otherwise, take cat.skill.
      const associatedSkill = cat?.parent ? cat.parent.skill : cat?.skill;

      return {
        ...topic,
        displayCategory: cat?.title || "No Category",
        displayParent: cat?.parent?.title || "Root",
        displaySkill: associatedSkill?.title || "No Skill Assigned",
      };
    });

    const lastPage = Math.ceil(totalCount / sanitizedLimit);

    // 3. Return structured data object matching your Redux pagination setup
    return {
      data: formattedData,
      current_page: sanitizedPage,
      last_page: lastPage,
      per_page: sanitizedLimit,
      has_next_page: sanitizedPage < lastPage,
      total: totalCount,
    };
  },

  //* Create Topic
  createTopic: async ({ title, order, categoryId }) => {
    // 1. Basic Validation
    if (!title) {
      throw { status: 400, message: "Topic title is required" };
    }

    if (!categoryId) {
      throw { status: 400, message: "Topic must be linked to a Category" };
    }

    try {
      // 2. Create the Topic with relation payloads
      return await prisma.topic.create({
        data: {
          title,
          order: order ? Number(order) : 0,
          categoryId,
        },
        include: {
          category: {
            include: {
              skill: true,
              parent: {
                include: {
                  skill: true,
                },
              },
            },
          },
          revisions: true,
        },
      });
    } catch (prismaError) {
      // Catch Prisma Foreign Key constraint error (Invalid Category ID link)
      if (prismaError.code === "P2003") {
        throw {
          status: 400,
          message: "The provided Category ID does not exist",
        };
      }
      throw prismaError;
    }
  },

  //* Update Topic
  updateTopic: async ({ id, title, order, categoryId }) => {
    // 1. Basic Validation
    if (!id) {
      throw {
        status: 400,
        message: "Topic ID is required in the request body",
      };
    }

    try {
      // 2. Perform partial dynamic updates
      return await prisma.topic.update({
        where: { id },
        data: {
          ...(title !== undefined && { title }),
          ...(order !== undefined && {
            order: order !== null ? Number(order) : null,
          }),
          ...(categoryId !== undefined && { categoryId }),
        },
        include: {
          category: {
            include: {
              skill: true,
              parent: {
                include: {
                  skill: true,
                },
              },
            },
          },
          revisions: true,
        },
      });
    } catch (prismaError) {
      // Catch Prisma Record to Update Not Found error code
      if (prismaError.code === "P2025") {
        throw { status: 404, message: "Topic not found" };
      }

      // Catch Prisma Foreign Key constraint error code (Invalid Category ID link)
      if (prismaError.code === "P2003") {
        throw { status: 400, message: "The provided Category ID is invalid" };
      }

      throw prismaError;
    }
  },

  //* Delete Topic
  deleteTopic: async (id) => {
    // 1. Basic Validation
    if (!id) {
      throw { status: 400, message: "Topic ID is required" };
    }

    try {
      // 2. Run the mutation query
      return await prisma.topic.delete({
        where: { id },
      });
    } catch (prismaError) {
      // Catch Prisma Record to Delete Not Found error code
      if (prismaError.code === "P2025") {
        throw { status: 404, message: "Topic not found" };
      }

      // Catch Prisma Foreign Key constraint error (e.g., linked revisions exist)
      if (prismaError.code === "P2003") {
        throw {
          status: 400,
          message: "Cannot delete topic. Please delete its revisions first.",
        };
      }

      throw prismaError;
    }
  },

  //* ==========================================
  // --- REVISIONS ---
  //* ==========================================

  //* Fetch Paginated Revisions
  getPaginatedRevisions: async ({ page = 1, limit = 10 }) => {
    // Prevent zero or negative numbers from breaking database query bounds
    const sanitizedPage = Math.max(1, Number(page));
    const sanitizedLimit = Math.max(1, Number(limit));
    const skip = (sanitizedPage - 1) * sanitizedLimit;

    const where = {}; // Add global search/filters here if needed later

    // 1. Parallel execution: Fetch database records and count total simultaneously
    const [revisions, totalCount] = await Promise.all([
      prisma.revision.findMany({
        where,
        skip,
        take: sanitizedLimit,
        orderBy: {
          scheduled: "asc", // Show soonest revisions first
        },
        include: {
          // 1. Get the Topic
          topic: {
            include: {
              // 2. Get the Category the topic belongs to
              category: {
                include: {
                  // 3. Get the Skill (if this is a root category)
                  skill: true,
                  // 4. Get the Parent Category
                  parent: {
                    include: {
                      // 5. Get the Skill of the Parent Category
                      skill: true,
                    },
                  },
                },
              },
            },
          },
        },
      }),
      prisma.revision.count({ where }),
    ]);

    // 2. Transform the fetched batch so the frontend has a flat "breadcrumb" string
    const formattedData = revisions.map((rev) => {
      const topic = rev.topic;
      const cat = topic?.category;
      const parent = cat?.parent;

      // Logic: If there's a parent, use its skill. Otherwise, use the category's skill.
      const activeSkill = parent ? parent.skill : cat?.skill;

      return {
        ...rev,
        breadcrumb: {
          skill: activeSkill?.title || "No Skill",
          parent: parent?.title || null,
          category: cat?.title || "No Category",
          topic: topic?.title || "No Topic",
        },
      };
    });

    const lastPage = Math.ceil(totalCount / sanitizedLimit);

    // 3. Return structured data object matching your Redux pagination setup
    return {
      data: formattedData,
      current_page: sanitizedPage,
      last_page: lastPage,
      per_page: sanitizedLimit,
      has_next_page: sanitizedPage < lastPage,
      total: totalCount,
    };
  },

  //* Create Revision Tracking Record
  createRevision: async ({
    topicId,
    userId,
    scheduled,
    practiced,
    revision1,
    revision1date,
    revision2,
    revision2date,
    revision3,
    revision3date,
    revision4,
    revision4date,
    revision5,
    revision5date,
  }) => {
    // 1. Basic Validation
    if (!topicId || !userId) {
      throw { status: 400, message: "Topic ID and User ID are required" };
    }

    try {
      // 2. Create the Revision with safe Date conversions and explicit deep structures
      return await prisma.revision.create({
        data: {
          topicId,
          userId,
          scheduled: scheduled ? new Date(scheduled) : new Date(),
          practiced: practiced ? new Date(practiced) : null,
          revision1date: revision1date ? new Date(revision1date) : new Date(),
          revision2date: revision2date ? new Date(revision2date) : new Date(),
          revision3date: revision3date ? new Date(revision3date) : new Date(),
          revision4date: revision4date ? new Date(revision4date) : new Date(),
          revision5date: revision5date ? new Date(revision5date) : new Date(),
          revision1: Boolean(revision1),
          revision2: Boolean(revision2),
          revision3: Boolean(revision3),
          revision4: Boolean(revision4),
          revision5: Boolean(revision5),
        },
        include: {
          topic: {
            include: {
              category: {
                include: {
                  skill: true,
                },
              },
            },
          },
        },
      });
    } catch (prismaError) {
      // Catch Prisma Foreign Key error code (Record not found in target relational table)
      if (prismaError.code === "P2003") {
        throw { status: 400, message: "Invalid Topic or User ID provided" };
      }
      throw prismaError;
    }
  },

  //* Update Revision Tracking Record
  updateRevision: async ({
    id,
    scheduled,
    practiced,
    revision1,
    revision1date,
    revision2,
    revision2date,
    revision3,
    revision3date,
    revision4,
    revision4date,
    revision5,
    revision5date,
  }) => {
    // 1. Basic Validation
    if (!id) {
      throw {
        status: 400,
        message: "Revision ID is required to perform an update",
      };
    }

    try {
      // 2. Perform the partial database update with explicit casts
      return await prisma.revision.update({
        where: { id },
        data: {
          // Dates: Parse strings to native Date instances conditionally
          ...(scheduled && { scheduled: new Date(scheduled) }),
          ...(practiced && { practiced: new Date(practiced) }),

          // Explicit Boolean conversions and date bindings
          ...(revision1 !== undefined && { revision1: Boolean(revision1) }),
          ...(revision1date && { revision1date: new Date(revision1date) }),

          ...(revision2 !== undefined && { revision2: Boolean(revision2) }),
          ...(revision2date && { revision2date: new Date(revision2date) }),

          ...(revision3 !== undefined && { revision3: Boolean(revision3) }),
          ...(revision3date && { revision3date: new Date(revision3date) }),

          ...(revision4 !== undefined && { revision4: Boolean(revision4) }),
          ...(revision4date && { revision4date: new Date(revision4date) }),

          ...(revision5 !== undefined && { revision5: Boolean(revision5) }),
          ...(revision5date && { revision5date: new Date(revision5date) }),
        },
        include: {
          topic: {
            include: {
              category: {
                include: {
                  skill: true,
                  parent: {
                    include: {
                      skill: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
    } catch (prismaError) {
      // Catch Prisma Missing Record error code
      if (prismaError.code === "P2025") {
        throw { status: 404, message: "Revision record not found" };
      }
      throw prismaError;
    }
  },

  //* Delete Revision Record
  deleteRevision: async (id) => {
    // 1. Basic Validation
    if (!id) {
      throw { status: 400, message: "Revision ID is required" };
    }

    try {
      // 2. Perform the deletion with topic payload included
      return await prisma.revision.delete({
        where: { id },
        include: {
          topic: true,
        },
      });
    } catch (prismaError) {
      // Catch Prisma Record to Delete Not Found error code
      if (prismaError.code === "P2025") {
        throw { status: 404, message: "Revision record not found" };
      }
      throw prismaError;
    }
  },
};
