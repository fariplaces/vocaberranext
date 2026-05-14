// @/services/server/typingDbServices.js
import { prisma } from "@/lib/prisma";

export const typingDbServices = {
  /**
   * --- EXERCISE SERVICES ---
   */

  // Fetch all
  // Fetch pagenation (optional filtering)
  /**
   * Fetches exercises with pagination and "Type" filtering (Exercises vs Tests)
   */
  getPaginatedExercises: async ({ page = 1, limit = 10, type }) => {
    const skip = (page - 1) * limit;

    // 1. Build Filter based on your business logic
    let where = {};
    if (type === "exercises") {
      where = { lesson: { lesson: { not: "TEST" } } };
    } else if (type === "tests") {
      where = { lesson: { lesson: "TEST" } };
    }

    // 2. Execute count and data fetch in parallel for performance
    const [exercises, totalCount] = await Promise.all([
      prisma.exercise.findMany({
        where,
        skip,
        take: limit,
        include: {
          lesson: true,
          type: true,
        },
        orderBy: { exerciseNo: "asc" }, // Usually helpful for typing apps
      }),
      prisma.exercise.count({ where }),
    ]);

    // 3. Return structured pagination object
    return {
      data: exercises,
      current_page: page,
      last_page: Math.ceil(totalCount / limit),
      total: totalCount,
    };
  },

  // Fetch optional Filtering

  // Fetch all exercises with optional filtering
  getAllExercises: async (params = {}) => {
    return await prisma.exercise.findMany({
      where: params,
      include: {
        type: true,
        lesson: true,
      },
      orderBy: { exerciseNo: "asc" },
    });
  },

  // Create a new exercise
  createExercise: async (data) => {
    return await prisma.exercise.create({
      data: {
        title: data.title,
        exerciseNo: data.exerciseNo,
        typeId: data.typeId,
        lessonId: data.lessonId,
      },
      include: {
        type: true,
        lesson: true,
      },
    });
  },

  /**
   * Updates an existing exercise and returns it with relations
   */
  updateExercise: async (id, data) => {
    return await prisma.exercise.update({
      where: { id: id },
      data: {
        title: data.title,
        exerciseNo: data.exerciseNo,
        typeId: data.typeId,
        lessonId: data.lessonId,
      },
      include: {
        type: true,
        lesson: true,
      },
    });
  },

  // Delete exercise
  deleteExercise: async (id) => {
    return await prisma.exercise.delete({
      where: { id },
    });
  },

  /**
   * --- TYPING RESULT SERVICES ---
   */

  /**
   * Fetches paginated typing results with relations
   * Optionally filtered by userId
   */
  getPaginatedTypings: async ({ page = 1, limit = 10, userId = null }) => {
    const skip = (page - 1) * limit;
    const where = userId ? { userId } : {};

    const [typings, totalCount] = await Promise.all([
      prisma.typing.findMany({
        where,
        skip,
        take: limit,
        include: {
          exercise: {
            select: { title: true, exerciseNo: true, type: true, lesson: true },
          },
          duration: {
            select: { duration: true },
          },
          user: {
            select: { name: true },
          },
        },
        orderBy: {
          createdAt: "desc", // Most recent attempts first
        },
      }),
      prisma.typing.count({ where }),
    ]);

    return {
      data: typings,
      current_page: page,
      last_page: Math.ceil(totalCount / limit),
      total: totalCount,
    };
  },

  // Log a new typing session result
  createTyping: async (data) => {
    return await prisma.typing.create({
      // Must return the result!
      data: {
        userId: data.userId,
        exerciseId: data.exerciseId,
        durationId: data.durationId,
        accuracy: parseFloat(data.accuracy) || 0,
        gross: parseInt(data.gross) || 0,
        net: parseInt(data.net) || 0,
      },
      include: {
        exercise: {
          select: { title: true, exerciseNo: true, lesson: true },
        },
        duration: true,
      },
    });
  },

  // Fetch typing history for a specific user
  getUserTypings: async (userId, limit = 10) => {
    return await prisma.typing.findMany({
      where: { userId },
      take: limit,
      orderBy: { createdAt: "desc" },
      include: { exercise: true },
    });
  },

  /**
   * Updates an existing typing result record
   */
  updateTyping: async (id, data) => {
    return await prisma.typing.update({
      where: { id: id },
      data: {
        userId: data.userId,
        exerciseId: data.exerciseId,
        durationId: data.durationId,
        accuracy: parseFloat(data.accuracy),
        gross: parseInt(data.gross),
        net: parseInt(data.net),
      },
      include: {
        exercise: {
          select: { title: true, exerciseNo: true, lesson: true },
        },
        duration: true,
      },
    });
  },

  // Delete typing
  deleteTyping: async (id) => {
    return await prisma.typing.delete({
      where: { id },
    });
  },

  /**
   * --- METADATA SERVICES (Lessons, Types, Durations) ---
   */

  getLessons: async () => {
    return await prisma.lesson.findMany({
      include: {
        exercises: {
          include: {
            type: true, // Also include the 'type' (exercise vs test)
          },
          orderBy: {
            exerciseNo: "asc", // Optional: Keep them in order (1.2, 1.4, etc)
          },
        },
      },
      orderBy: {
        order: "asc", // Keeps Lesson 1, Lesson 2, etc. in order
      },
    });
  },

  getExerciseTypes: async () => {
    return await prisma.exerciseType.findMany({
      include: {
        exercises: {
          include: {
            lesson: true, // include lesson info (optional but useful)
          },
          orderBy: {
            exerciseNo: "asc", // keep exercises ordered
          },
        },
      },
      orderBy: {
        type: "asc", // sort types alphabetically
      },
    });
  },

  getDurations: async () => {
    // If durations are stored in DB
    return await prisma.duration.findMany();
  },
};
