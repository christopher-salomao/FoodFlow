import { requiredAdmin } from "@/lib/auth";
import { Sidebar } from "@/components/dashboard/sidebar";
import { MobileSidebar } from "@/components/dashboard/mobile-sidebar";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await requiredAdmin();

  return (
    <div className="flex h-screen overflow-hidden">
      { /* Sidebar desktop */}
      <Sidebar userName={user?.name as string} />

      <div className="flex flex-1 flex-col overflow-hidden">
        { /* header mobile */}
        <MobileSidebar />

        <main className="flex-1 overflow-y-auto">
          <div className="container max-w-full px-4 py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
