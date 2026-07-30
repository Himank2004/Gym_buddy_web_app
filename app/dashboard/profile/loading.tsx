import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export default function ProfileLoading() {
  return <div className="flex min-h-[60vh] items-center justify-center"><LoadingSpinner label="Loading profile progress" /></div>;
}
