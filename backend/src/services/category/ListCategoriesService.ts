import prismaClient from "../../prisma/index";

class ListCategoriesService {
  async execute() {
    try {
      const categories = await prismaClient.category.findMany({
        select: {
          id: true,
          name: true,
          createdAt: true,
        },
        orderBy: {
          name: "asc",
        },
      });

      return categories;
    } catch (error) {
      throw new Error("Erro ao listar categorias");
    }
  }
}

export { ListCategoriesService };
