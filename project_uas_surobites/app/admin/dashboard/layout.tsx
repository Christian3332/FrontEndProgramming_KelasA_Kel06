import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getAdminUsername } from "@/lib/admin-auth";
import AdminShell from "@/components/admin/AdminShell";

export const metadata: Metadata = {
  title: {
    template: "%s | Admin SuroBites",
    default: "Dashboard | Admin SuroBites",
  },
  robots: { index: false, follow: false },
};

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const username = await getAdminUsername();
  if (!username) {
    redirect("/admin/login?pesan=login");
  }

  return <AdminShell username={username}>{children}</AdminShell>;
}
