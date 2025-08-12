import { DashboardClient } from "@/components/dashboard/dashboard-client";
import { Suspense } from "react";

export default function DashboardPage() {
  // In a real app, user and tasks would be fetched from a database.
  // We pass them to the client component.
  return (
    <Suspense fallback={<div>Loading dashboard...</div>}>
      <DashboardClient />
    </Suspense>
  );
}
