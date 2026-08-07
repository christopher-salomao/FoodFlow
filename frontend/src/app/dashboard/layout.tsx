import { requiredAdmin } from "@/lib/auth";
import { Sidebar } from "@/components/dashboard/sidebar";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await requiredAdmin();

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar userName={user?.name as string} /> { /* Sidebar desktop */ }
      {children}
    </div>
  );
}
