"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

import type { OrderProps } from "@/lib/types";
import { apiClient } from "@/lib/api";

interface ContentOrdersProps {
  token: string;
}

export function ContentOrders({ token }: ContentOrdersProps) {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<OrderProps[]>([]);

  async function fetchOrders() {
    try {
      const response = await apiClient<OrderProps[]>("orders?draft=false", {
        method: "GET",
        cache: "no-store",
        token,
      });
      setOrders(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);

      if (error instanceof Error) {
        console.error(error);
      }
    }
  }

  useEffect(() => {
    async function loadOrders() {
      await fetchOrders();
    }

    loadOrders();
  }, []);

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Pedidos</h1>
          <p className="text-sm sm:text-base mt-1">
            Gerencie os pedidos da cozinha
          </p>
        </div>

        <Button className="bg-white hover:bg-gray-200">
          <RefreshCcw
            className={`w-5 h-5 ${loading ? "animate-spin" : ""}`}
            color="black"
          />
        </Button>
      </div>
    </div>
  );
}
