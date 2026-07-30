import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const deleteAccountSchema = z.object({
  confirmation: z.string().refine((value) => value === "DELETE", {
    message: 'Type "DELETE" to confirm account deletion.',
  }),
});

export async function DELETE(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const body: unknown = await request.json().catch(() => null);
  const validation = deleteAccountSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.issues[0]?.message ?? "Invalid deletion confirmation." },
      { status: 400 },
    );
  }

  try {
    await prisma.user.delete({ where: { id: user.id } });
    return new NextResponse(null, { status: 204 });
  } catch {
    return NextResponse.json({ error: "Unable to delete account." }, { status: 500 });
  }
}
