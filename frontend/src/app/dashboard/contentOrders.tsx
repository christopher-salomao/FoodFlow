"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, RefreshCcw } from "lucide-react";

import type { OrderProps } from "@/lib/types";
import { apiClient } from "@/lib/api";
import { formatCurrency } from "@/lib/utils";

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

      const pendingOrders = response.filter(
        (order) => !order.status
      );

      setOrders(pendingOrders);
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

  function claculeteOrderTotal(order: OrderProps) {
    if (!order.order_items) {
      return 0;
    }

    const total = order.order_items.reduce((acc, item) => {
      return acc + item.product.price * item.amount;
    }, 0);

    return total;
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Pedidos</h1>
          <p className="text-sm sm:text-base mt-1">
            Gerencie os pedidos da cozinha
          </p>
        </div>

        <Button onClick={async () => await fetchOrders()} className="bg-white hover:bg-gray-200">
          <RefreshCcw
            className={`w-5 h-5 ${loading ? "animate-spin" : ""}`}
            color="black"
          />
        </Button>
      </div>

      {loading ? (
        <div>
          <p className="text-sm sm:text-base mt-2 font-extrabold text-center text-gray-300!">
            Carregando pedidos...
          </p>
        </div>
      ) : orders.length === 0 ? (
        <div>
          <p className="text-sm sm:text-base mt-2 font-extrabold text-center text-gray-300!">
            Nenhum pedido encontrado
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {orders.map((order) => (
            <Card
              key={order.id}
              className="bg-app-card border border-app-border"
            >
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg lg:text-xl font-bold">
                    <span>Mesa {order.table}</span>
                  </CardTitle>

                  <Badge
                    variant="secondary"
                    className="text-xs text-black! select-none"
                  >
                    Em produção
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-3 sm:space-y-4 mt-auto">
                <div>
                  {order.order_items && order.order_items.length > 0 && (
                    <div className="space-y-1">
                      {order.order_items.slice(0, 2).map((item) => (
                        <p
                          key={item.id}
                          className="text-xs sm:text-sm text-gray-300! truncate"
                        >
                          • {item.amount}x {item.product.name}
                        </p>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex flex-col xl:flex-row items-center justify-between pt-4 border-t border-app-border gap-3">
                  <div className="flex flex-col gap-1 self-start">
                    <p className="text-sm text-gray-400! md:text-base">Total:</p>
                    <p className="font-bold text-base lg:text-lg text-brand-primary!">
                      {formatCurrency(claculeteOrderTotal(order))}
                    </p>
                  </div>

                  <Button size="sm" className="bg-brand-primary hover:bg-brand-primary/80 w=full xl-w-auto">
                     <Eye className=" h-5 w-5" /> Detalhes
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
