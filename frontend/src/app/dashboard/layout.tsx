import { requiredAdmin } from "@/lib/auth";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await requiredAdmin();

  return (
    <div>
      <h1>Bem vindo, {user?.name}</h1>
      {children}
    </div>
  );
}
