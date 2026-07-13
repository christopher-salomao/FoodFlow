import prismaClient from "../../prisma/index";

interface RemoveOrderItemServiceProps {
  order_item_id: string;
}

class RemoveOrderItemService {
  async execute({ order_item_id }: RemoveOrderItemServiceProps) {
    const orderItemExists = await prismaClient.orderItem.findFirst({
      where: {
        id: order_item_id,
      },
    });

    if (!orderItemExists) throw new Error("Item não encontrado");

    try {
      const removedItem = await prismaClient.orderItem.delete({
        where: {
          id: order_item_id,
        },
        select: {
          id: true,
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
          amount: true,
        },
      })

      return removedItem;
    } catch (error) {
      console.error(error);
      throw new Error("Item não encontrado");
    }
  }
}

export { RemoveOrderItemService };
