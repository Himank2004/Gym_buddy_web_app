import { redirect } from "next/navigation";
import { ChatExperience } from "@/components/chatbot/ChatExperience";
import { ErrorState } from "@/components/ui/ErrorState";
import { getCurrentUser } from "@/lib/auth";
import { getChatHistory } from "@/lib/chatbot";

export default async function ChatbotPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  try {
    const history = await getChatHistory(user.id);
    const initialMessages = history.map(({ id, role, content }) => ({ id, role: role as "user" | "assistant", content }));
    return <div className="mx-auto max-w-4xl space-y-6"><section><p className="text-xs font-bold uppercase tracking-[0.2em] text-lime-300">Nutrition guidance</p><h1 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">Chat with your diet coach</h1><p className="mt-2 text-zinc-400">Use your food, workout, and goal context to make the next choice easier.</p></section><ChatExperience initialMessages={initialMessages} /><p className="rounded-xl border border-amber-300/15 bg-amber-300/5 px-4 py-3 text-xs leading-5 text-amber-100/80">This app provides general fitness and nutrition guidance only. It is not medical advice.</p></div>;
  } catch {
    return <ErrorState title="Unable to load chat history" description="Check your database connection and try again." />;
  }
}
