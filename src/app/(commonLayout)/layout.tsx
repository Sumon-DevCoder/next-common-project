import type { Metadata } from "next";
import Navbar from "./components/page/shared/Navbar";
import Footer from "./components/page/shared/Footer";

export const metadata: Metadata = {
  title: "Animal Bazaar",
  description: "Discover Your Perfect Pet!",
};

export default async function dashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
