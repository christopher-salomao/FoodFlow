import prismaClient from "../../prisma/index";

interface DeleteOrderServiceProps {
  order_id: string;
}

class DeleteOrderService {
  async execute({ order_id }: DeleteOrderServiceProps) {
    try {
     const order = await prismaClient.order.delete({
        where: {
          id: order_id,
        },
      });

      return order;
    } catch (error) {
      throw new Error("Pedido não encontrado");
    }
  }
}

export { DeleteOrderService };
