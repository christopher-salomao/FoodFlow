import prismaClient from "../../prisma/index";

interface FinishOrderServiceProps {
  order_id: string;
}

class FinishOrderService {
  async execute({ order_id }: FinishOrderServiceProps) {
    try {
      const order = await prismaClient.order.findFirst({
        where: {
          id: order_id,
          draft: false
        },
      });

      if (!order) throw new Error("Pedido não encontrado ou está em rascunho");

      if (order.status === true) throw new Error("Pedido já finalizado");

      const updatedOrder = await prismaClient.order.update({
        where: {
          id: order_id,
        },
        data: {
          status: true,
        },
        select: {
          id: true,
          table: true,
          status: true,
          customer_name: true,
          createdAt: true,
        },
      });

      return updatedOrder;

    } catch (error) {
      console.error(error);
      throw new Error("Erro ao finalizar pedido");
    }
  }
}

export { FinishOrderService };
