"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { type RegisterInput, registerSchema } from "@/lib/validations/auth";

type RegisterError = { error?: string; fields?: Partial<Record<keyof RegisterInput, string[]>> };

export function RegisterForm() {
  const router = useRouter();
  const [formError, setFormError] = useState<string>();
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = async (data: RegisterInput) => {
    setFormError(undefined);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const payload = await response.json().catch(() => ({})) as RegisterError;

      if (!response.ok) {
        Object.entries(payload.fields ?? {}).forEach(([field, messages]) => {
          if (messages?.[0] && field in data) setError(field as keyof RegisterInput, { message: messages[0] });
        });
        setFormError(payload.error ?? "Unable to create account. Please try again.");
        return;
      }

      const loginResult = await signIn("credentials", { email: data.email, password: data.password, redirect: false });
      if (loginResult?.error) {
        setFormError("Your account was created. Please log in to continue.");
        return;
      }

      router.replace("/dashboard");
      router.refresh();
    } catch {
      setFormError("Unable to reach FitForge. Check your connection and try again.");
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
      {formError && <p className="rounded-xl border border-rose-400/20 bg-rose-400/10 px-3 py-2 text-sm text-rose-200" role="alert">{formError}</p>}
      <Input label="Name" autoComplete="name" placeholder="Your name" error={errors.name?.message} {...register("name")} />
      <Input label="Email" type="email" autoComplete="email" placeholder="you@example.com" error={errors.email?.message} {...register("email")} />
      <Input label="Password" type="password" autoComplete="new-password" placeholder="At least 8 characters" helperText="Use 8 to 72 characters." error={errors.password?.message} {...register("password")} />
      <Input label="Confirm password" type="password" autoComplete="new-password" placeholder="Repeat your password" error={errors.confirmPassword?.message} {...register("confirmPassword")} />
      <Button type="submit" className="w-full" disabled={isSubmitting}>{isSubmitting ? "Creating account…" : "Create account"}</Button>
    </form>
  );
}
