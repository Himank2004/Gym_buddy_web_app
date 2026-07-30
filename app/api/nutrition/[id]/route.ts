import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUser } from "@/lib/auth";
import { deleteFoodLog, updateFoodLog } from "@/lib/nutrition";
import { foodLogSchema } from "@/lib/validations/nutrition";

const foodLogIdSchema = z.string().cuid();

async function getFoodLogId(params: Promise<{ id: string }>) {
  const { id } = await params;
  return foodLogIdSchema.safeParse(id);
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const body: unknown = await request.json().catch(() => null);
  const validation = foodLogSchema.safeParse(body);
  if (!validation.success) return NextResponse.json({ error: "Invalid food details.", fields: validation.error.flatten().fieldErrors }, { status: 400 });

  const idValidation = await getFoodLogId(params);
  if (!idValidation.success) return NextResponse.json({ error: "Invalid food log ID." }, { status: 400 });

  try {
    const result = await updateFoodLog(user.id, idValidation.data, validation.data);
    if (!result.count) return NextResponse.json({ error: "Food log not found." }, { status: 404 });
    return NextResponse.json({ updated: true });
  } catch {
    return NextResponse.json({ error: "Unable to update food log." }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const idValidation = await getFoodLogId(params);
  if (!idValidation.success) return NextResponse.json({ error: "Invalid food log ID." }, { status: 400 });

  try {
    const result = await deleteFoodLog(user.id, idValidation.data);
    if (!result.count) return NextResponse.json({ error: "Food log not found." }, { status: 404 });
    return new NextResponse(null, { status: 204 });
  } catch {
    return NextResponse.json({ error: "Unable to delete food log." }, { status: 500 });
  }
}
