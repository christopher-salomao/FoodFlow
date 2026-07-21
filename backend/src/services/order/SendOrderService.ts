import prismaClient from "../../prisma/index";

interface SendOrderServiceProps {
  order_id: string;
  customer_name?: string;
}

class SendOrderService {
  async execute({ order_id, customer_name }: SendOrderServiceProps) {
    try {
      const order = await prismaClient.order.findFirst({
        where: {
          id: order_id,
        },
      });

      if (!order) throw new Error("Pedido não encontrado");
      if (order.status === true) throw new Error("Pedido já finalizado");
      if (order.draft === false) throw new Error("Pedido já enviado para produção ");

      const updatedOrder = await prismaClient.order.update({
        where: {
          id: order_id,
        },
        data: {
          draft: false,
          customer_name: customer_name ?? "",
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
      throw new Error("Falha ao enviar pedido");
    }
  }
}

export { SendOrderService };
