"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { ShoppingCart, Package, Tags, LogOut } from "lucide-react";
import { Button } from "../ui/button";

import { logoutAction } from "@/actions/auth";

import logo from "@/assets/logo.png";

interface SidebarProps {
  userName: string;
}

const menuItems = [
  {
    title: "Pedidos",
    href: "/dashboard",
    icon: ShoppingCart,
  },
  {
    title: "Produtos",
    href: "/dashboard/products",
    icon: Package,
  },
  {
    title: "Categorias",
    href: "/dashboard/categories",
    icon: Tags,
  },
];

export function Sidebar({ userName }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col items-center h-screen w-64 border-r border-app-border bg-app-sidebar">
      <div className="border-b border-app-border w-full p-6">
        <Image
          src={logo}
          alt="Logo Food Flow"
          className="w-44 h-auto"
          priority
        />

        <p className="mt-1 text-sm text-gray-400! text-center">
          Olá, {userName}!
        </p>
      </div>

      <nav className="flex flex-col flex-1 w-full space-y-4 p-4">
        {menuItems.map((menu) => {
          const Icon = menu.icon;

          const isActive = pathname === menu.href;

          return (
            <Link
              key={menu.href}
              href={menu.href}
              className={cn(
                "flex gap-3 items-center s rounded-md p-2 font-medium",
                isActive
                  ? "bg-brand-primary"
                  : "hover:bg-gray-700 transition-colors duration-300",
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{menu.title}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-app-border w-full p-4 bg-black">
        <form action={logoutAction}>
          <Button type="submit" variant="ghost" className="w-full justify-start gap-3 hover:bg-transparent hover:text-white">
            <LogOut className="w-5 h-5" />
            Sair
          </Button>
        </form>
      </div>
    </aside>
  );
}
