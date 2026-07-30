import Link from "next/link";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <AuthLayout title="Welcome back" description="Log in to keep building your strength." footer={<><span>New to FitForge? </span><Link href="/register" className="font-semibold text-lime-300 transition hover:text-lime-200">Create an account</Link></>}>
      <LoginForm />
    </AuthLayout>
  );
}
