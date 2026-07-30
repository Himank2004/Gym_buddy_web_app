import { NextResponse } from "next/server";
import { z } from "zod";
import { generateDietBotResponse, getDietBotContext, saveChatMessage } from "@/lib/chatbot";
import { getCurrentUser } from "@/lib/auth";

const chatRequestSchema = z.object({ message: z.string().trim().min(1, "Message is required.").max(2000) });

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const body: unknown = await request.json().catch(() => null);
  const validation = chatRequestSchema.safeParse(body);
  if (!validation.success) return NextResponse.json({ error: "Invalid message.", fields: validation.error.flatten().fieldErrors }, { status: 400 });

  try {
    await saveChatMessage(user.id, "user", validation.data.message);
    const context = await getDietBotContext(user.id);
    const response = await generateDietBotResponse(validation.data.message, context);
    const assistantMessage = await saveChatMessage(user.id, "assistant", response);
    return NextResponse.json({ message: assistantMessage });
  } catch {
    return NextResponse.json({ error: "Unable to process your message." }, { status: 500 });
  }
}
