import prismaClient from "../../prisma/index";

interface OrderDetailsServiceProps {
  order_id: string;
}

class OrderDetailsService {
  async execute({ order_id }: OrderDetailsServiceProps) {
    try {
      const order = await prismaClient.order.findFirst({
        where: {
          id: order_id,
        },
        select: {
          id: true,
          table: true,
          status: true,
          customer_name: true,
          createdAt: true,
          order_items: {
            select: {
              id: true,
              amount: true,
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
          },
        },
      });

      if (!order) throw new Error("Pedido não encontrado");

      return order;
    } catch (error) {
      console.error(error);
      throw new Error("Pedido não encontrado");
    }
  }
}

export { OrderDetailsService };
