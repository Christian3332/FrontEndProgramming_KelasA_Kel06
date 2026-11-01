import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
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
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login?pesan=login");
  }

  return <AdminShell>{children}</AdminShell>;
}
