// import { prisma } from "@/lib/prisma";
// import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     const exercises = await prisma.exercise.findMany({
//       include: {
//         lesson: true,
//         type: true,
//       },
//     });
//     return NextResponse.json(exercises);
//   } catch (error) {
//     return NextResponse.json({ error: "Failed to fetch exercises" }, { status: 500 });
//   }
// }

// const routedExercises = exercises.filter((item) =>
//   route === "exercises"
//     ? item.lesson.lesson !== "TEST"
//     : route === "tests"
//       ? item.lesson.lesson === "TEST"
//       : true
// );



export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const route = searchParams.get("type"); // 'exercises' or 'tests'

    // Build Filter based on your route logic
    let where = {};
    if (route === "exercises") {
      where = { lesson: { lesson: { not: "TEST" } } };
    } else if (route === "tests") {
      where = { lesson: { lesson: "TEST" } };
    }

    const skip = (page - 1) * limit;

    const [exercises, totalCount] = await Promise.all([
      prisma.exercise.findMany({
        where,
        skip,
        take: limit,
        include: { lesson: true, type: true },
      }),
      prisma.exercise.count({ where }),
    ]);

    return NextResponse.json({
      data: exercises,
      current_page: page,
      last_page: Math.ceil(totalCount / limit),
      total: totalCount,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}