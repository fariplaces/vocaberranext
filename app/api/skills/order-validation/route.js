import { skillDbServices } from "@/services/server/skillDbServices";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    // 1. Extract query parameters from the incoming URL request stream
    const { searchParams } = new URL(req.url);
    const orderString = searchParams.get("order");
    const excludeId = searchParams.get("excludeId");

    // 2. Structural Guard: Ensure an order parameter was actually supplied
    if (
      orderString === null ||
      orderString === undefined ||
      orderString === ""
    ) {
      return NextResponse.json(
        { error: "Query parameter 'order' is required for validation" },
        { status: 400 },
      );
    }

    // 3. Delegate lookup directly down to your database service layers
    const exists = await skillDbServices.checkOrderUniqueness({
      order: orderString,
      excludeId: excludeId || null,
    });

    // 4. Return standard boolean mapping payload parsed cleanly by your hook
    return NextResponse.json({ exists }, { status: 200 });
  } catch (error) {
    // Intercept operational database throws
    if (error.status) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status },
      );
    }

    console.error("Validate Skill Order Route Error:", error);
    return NextResponse.json(
      { error: "Failed to process unique order parameter validation" },
      { status: 500 },
    );
  }
}
