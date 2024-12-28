import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Animal Bazaar",
  description: "Discover Your Perfect Pet!",
};

export default function dashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
