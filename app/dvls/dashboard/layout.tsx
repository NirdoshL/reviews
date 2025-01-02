import { AuthProvider } from "@/providers/auth.provider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Reviews Dashboard",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthProvider>{children}</AuthProvider>;
}
