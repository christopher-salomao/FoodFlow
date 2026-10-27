"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { apiClient } from "@/lib/api";
import type { OrderProps } from "@/lib/types";
import { useEffect, useState } from "react";

import { formatCurrency } from "@/lib/utils";

interface OrderModalProps {
  orderId: string | null;
  token: string;
  onClose: () => Promise<void>;
}

export function OrderModal({ orderId, token, onClose }: OrderModalProps) {
  const [order, setOrder] = useState<OrderProps | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchOrder() {
    try {
      if (!orderId) {
        setOrder(null);
        setLoading(false);
        return;
      }

      const response = await apiClient<OrderProps>(`order/details?order_id=${orderId}`, {
        method: "GET",
        token,
      });

      setOrder(response);
      setLoading(false);

    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
      }

      setLoading(false);
    }
  }

  function calculateTotal() {
    if (!order?.order_items) return 0;

    return order.order_items.reduce((total, item) => {
      return total + item.product.price * item.amount;
    }, 0);
  }

  useEffect(() => {
    async function loadOrder() {
      await fetchOrder();
    }

    loadOrder();
  }, [orderId]);

  return (
    <Dialog open={orderId !== null} onOpenChange={onClose}>
      <DialogContent
        className="p-6 pl-8 bg-app-card max-w-2xl max-h-[90vh]  overflow-auto scrollbar-thumb-transparent scrollbar-thin"
        showCloseButton={false}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Detalhes do pedido
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <p className="text-gray-400!">Carregando...</p>
          </div>
        ) : order ? (
          <div className="space-y-6">
            {/* Informações do pedido */}
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-sm text-gray-400! mb-1">Nome da categoria</p>
                <p className="text-lg font-semibold">Mesa {order.table}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400! mb-1">Nome do cliente</p>
                <p className="text-lg font-semibold">
                  {order.customer_name || "Não informado"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400! mb-1">Status</p>
                <span className="inline-block px-3 py-1 bg-orange-500/20 text-orange-500! rounded-full text-xs font-medium">
                  Em produção
                </span>
              </div>
            </div>

            {/* Itens do pedido */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Itens do pedido</h3>
              <div className="space-y-3">
                {order.order_items && order.order_items.length > 0 ? (
                  order.order_items.map((item) => {
                    const subtotal = item.product.price * item.amount;
                    return (
                      <div
                        key={item.id}
                        className="bg-app-background rounded-lg p-4 border border-app-border"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="font-semibold text-base mb-1">
                              {item.product.name}
                            </h4>
                            <p className="text-sm text-gray-400">
                              {item.product.description}
                            </p>
                            <p className="text-sm text-gray-400 mt-2">
                              {formatCurrency(item.product.price)} x{" "}
                              {item.amount}
                            </p>
                          </div>
                          <div className="text-right ml-4">
                            <p className="text-sm text-gray-400 mb-1">
                              Quantidade: {item.amount}
                            </p>
                            <p className="font-semibold text-lg">
                              Subtotal: {formatCurrency(subtotal)}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-gray-400 text-center py-4">
                    Nenhum item no pedido
                  </p>
                )}
              </div>
            </div>

            {/* Total */}
            <div className="border-t border-app-border pt-4">
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold">Total</span>
                <span className="text-2xl font-bold text-brand-primary">
                  {formatCurrency(calculateTotal())}
                </span>
              </div>
            </div>
          </div>
        ) : null}

        <DialogFooter className="flex gap-3 sm:gap-3 bg-transparent">
          <Button
            onClick={() => onClose()}
            className="flex-1 border-app-border hover:bg-transparent bg-transparent "
          >
            Fechar
          </Button>
          <Button
            className="flex-1 bg-brand-primary hover:bg-brand-primary/90 font-semibold"
            disabled={loading}
          >
            Finalizar pedido
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
