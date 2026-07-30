import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { createWorkoutLog } from "@/lib/workouts";
import { workoutLogSchema } from "@/lib/validations/workout";

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const result = workoutLogSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ error: "Invalid workout details.", fields: result.error.flatten().fieldErrors }, { status: 400 });
  }

  try {
    const workoutLog = await createWorkoutLog(user.id, result.data);
    return NextResponse.json({ workoutLog }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unable to save workout log." }, { status: 500 });
  }
}
