import prismaClient from "../../prisma/index";

interface ListProductByCategoryServiceProps {
  category_id: string;
  disabled?: string;
}

class ListProductByCategoryService {
  async execute({ category_id, disabled }: ListProductByCategoryServiceProps) {
    const categoryExists = await prismaClient.category.findFirst({
      where: {
        id: category_id,
      },
    });

    if (!categoryExists) {
      throw new Error("Categoria não encontrada");
    }

    try {
      const products = await prismaClient.product.findMany({
        where: {
          category_id,
          disabled: disabled === "true" ? true : false,
        },
        select: {
          id: true,
          name: true,
          price: true,
          description: true,
          banner: true,
          disabled: true,
          category_id: true,
          createdAt: true,
          category: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return products;
    } catch (error) {
      throw new Error("Falha ao buscar produtos");
    }
  }
}

export { ListProductByCategoryService };
