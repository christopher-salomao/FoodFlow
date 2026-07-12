import prismaClient from "../../prisma/index";

interface AddItemToOrderServiceProps {
  order_id: string;
  product_id: string;
  amount: number;
}

class AddItemToOrderService {
  async execute({ order_id, product_id, amount }: AddItemToOrderServiceProps) {
    try {
      const orderExists = await prismaClient.order.findFirst({
        where: {
          id: order_id,
        },
      });

      if (!orderExists) throw new Error("Pedido não encontrado");

      const productExists = await prismaClient.product.findFirst({
        where: {
          id: product_id,
          disabled: false,
        },
      });

      if (!productExists) throw new Error("Produto não encontrado");

      const orderItem = await prismaClient.orderItem.create({
        data: {
          order_id,
          product_id,
          amount,
        },
        select: {
          id: true,
          amount: true,
          order_id: true,
          product: {
            select: {
              id: true,
              name: true,
              price: true,
              description: true,
              banner: true,
            },
          },
        },
      });

      return orderItem;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao adicionar item ao pedido");
    }
  }
}

export { AddItemToOrderService };
