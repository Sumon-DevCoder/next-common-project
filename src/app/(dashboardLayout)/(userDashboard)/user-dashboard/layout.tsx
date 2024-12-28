import SidebarLayout from "@/app/components/SidebarLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Animal Bazaar",
  description: "Discover Your Perfect Pet!",
};

export default function UserDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen">
      <div className="bg-gray-800">
        <SidebarLayout />
      </div>
      <div className="flex-grow">{children}</div>
    </div>
  );
}
