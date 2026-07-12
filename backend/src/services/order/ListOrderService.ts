import prismaClient from "../../prisma";

interface ListOrderServiceProps {
  draft?: string;
}

class ListOrderService {
  async execute({ draft }: ListOrderServiceProps) {
    try {
      const orders = await prismaClient.order.findMany({
        where: {
          draft: draft === "true" ? true : false,
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
            }
          }
        },
        orderBy: {
          createdAt: "asc",
        },
      });

      return orders;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao listar pedidos");
    }
  }
}

export { ListOrderService };
