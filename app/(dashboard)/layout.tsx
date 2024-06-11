import Header from "@/components/header";
import React from "react";

type Props = {
  children: React.ReactNode;
};
//why main instead of div, why fragment instead of div
export default function DashboardLayout({ children }: Props) {
  return (
    <>
      <Header />
      <main className="h-full">{children}</main>
    </>
  );
}
