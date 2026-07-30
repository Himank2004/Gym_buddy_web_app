import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/validations/auth";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const result = registerSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: "Invalid registration details.", fields: result.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: result.data.email },
    select: { id: true },
  });

  if (existingUser) {
    return NextResponse.json({ error: "An account already exists for this email." }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(result.data.password, 12);

  try {
    const user = await prisma.user.create({
      data: { name: result.data.name, email: result.data.email, passwordHash },
      select: { id: true, name: true, email: true },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "code" in error && error.code === "P2002") {
      return NextResponse.json({ error: "An account already exists for this email." }, { status: 409 });
    }

    return NextResponse.json({ error: "Unable to create account." }, { status: 500 });
  }
}
