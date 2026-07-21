import prismaClient from "../../prisma/index";

interface DeleteProductServiceProps {
  product_id: string;
}

class DeleteProductService {
  async execute({ product_id }: DeleteProductServiceProps) {
    try {
      await prismaClient.product.update({
        where: {
          id: product_id,
        },
        data: {
          disabled: true,
        },
      });

      return {
        message: "Produto excluído/arquivado com sucesso",
      };
    } catch (error) {
      console.error(error);
      throw new Error("Falha ao excluir produto");
    }
  }
}

export { DeleteProductService };
