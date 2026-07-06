import prismaClient from "../../prisma/index";

interface CreateCategoryProps {
  name: string;
}

class CreateCategoryService {
  async execute({ name }: CreateCategoryProps) {
    const categoryAlreadyExists = await prismaClient.category.findFirst({
      where: {
        name,
      },
    });

    if (categoryAlreadyExists) {
      throw new Error("Já existe uma categoria com esse nome");
    }

    try {
      const category = await prismaClient.category.create({
        data: {
          name,
        },
        select: {
          id: true,
          name: true,
          createdAt: true,
        },
      });

      return category;
    } catch (error) {
      throw new Error("Erro ao criar categoria");
    }
  }
}

export { CreateCategoryService };
