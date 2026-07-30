import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { createFoodLog } from "@/lib/nutrition";
import { foodLogSchema } from "@/lib/validations/nutrition";

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const body: unknown = await request.json().catch(() => null);
  const result = foodLogSchema.safeParse(body);
  if (!result.success) return NextResponse.json({ error: "Invalid food details.", fields: result.error.flatten().fieldErrors }, { status: 400 });

  try {
    const foodLog = await createFoodLog(user.id, result.data);
    return NextResponse.json({ foodLog }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unable to save food log." }, { status: 500 });
  }
}
