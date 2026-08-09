"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { ShoppingCart, Package, Tags, LogOut, Menu } from "lucide-react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";

import { logoutAction } from "@/actions/auth";
import { useState } from "react";

import logo from "@/assets/logo.png";

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

export function MobileSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <header className="sticky top-0 bg-app-sidebar border-b border-app-border">
        <div className="flex items-center justify-between h-16 px-4 py-8">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger>
              <Menu className="w-6 h-6" />
            </SheetTrigger>

            <SheetContent
              side="left"
              className="bg-app-sidebar border-r border-app-border w-72! p-0"
            >
              <SheetHeader className="border-b border-app-border p-6">
                <SheetTitle className="text-center font-bold text-xl">
                  Menu
                </SheetTitle>
              </SheetHeader>

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
                  <Button
                    type="submit"
                    variant="ghost"
                    className="w-full justify-start gap-3 hover:bg-transparent hover:text-white"
                  >
                    <LogOut className="w-5 h-5" />
                    Sair
                  </Button>
                </form>
              </div>
            </SheetContent>
          </Sheet>

          <Image
            src={logo}
            alt="Logo Food Flow"
            className="w-38 h-auto"
            priority
          />

          <div className="w-10"></div>
        </div>
      </header>
    </div>
  );
}
