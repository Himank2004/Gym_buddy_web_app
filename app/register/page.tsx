import Link from "next/link";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { RegisterForm } from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthLayout title="Forge your next level" description="Create your FitForge account and start tracking with purpose." footer={<><span>Already have an account? </span><Link href="/login" className="font-semibold text-lime-300 transition hover:text-lime-200">Login</Link></>}>
      <RegisterForm />
    </AuthLayout>
  );
}
