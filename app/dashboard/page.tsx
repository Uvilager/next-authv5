import { auth } from "@/auth";
import React from "react";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        No user
      </div>
    );
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      DashboardPage
    </div>
  );
}
