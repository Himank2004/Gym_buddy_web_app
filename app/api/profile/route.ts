import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { updateUserProfile, userProfileSchema } from "@/lib/profile";

export async function PUT(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const body: unknown = await request.json().catch(() => null);
  const validation = userProfileSchema.safeParse(body);
  if (!validation.success) return NextResponse.json({ error: "Invalid profile details.", fields: validation.error.flatten().fieldErrors }, { status: 400 });

  try {
    const result = await updateUserProfile(user.id, validation.data);
    if (!result.count) return NextResponse.json({ error: "Profile not found." }, { status: 404 });
    return NextResponse.json({ updated: true });
  } catch {
    return NextResponse.json({ error: "Unable to update profile." }, { status: 500 });
  }
}
