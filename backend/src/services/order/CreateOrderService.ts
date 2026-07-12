import prismaClient from "../../prisma/index";

interface CreateOrderServiceProps {
  customer_name?: string;
  table: number;
}

class CreateOrderService {
  async execute({ customer_name, table }: CreateOrderServiceProps) {
    try {
      const order = await prismaClient.order.create({
        data: {
          customer_name: customer_name ?? "",
          table,
        },
        select: {
          id: true,
          table: true,
          draft: true,
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
            }
          }
        },
      });

      return order;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao criar pedido");
    }
  }
}

export { CreateOrderService };
