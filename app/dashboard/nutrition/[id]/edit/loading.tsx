import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export default function EditFoodLogLoading() {
  return <div className="flex min-h-[60vh] items-center justify-center"><LoadingSpinner label="Loading food log" /></div>;
}
