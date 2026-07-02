import prismaClient from "../../prisma/index";

interface RegisterProductsProps {
  name: string;
  description: string;
  price: number;
  category_id: string;
  bunner: string;
}

class RegisterProductsService {
  async execute(/* { name, description, price, category_id, bunner }: RegisterProductsProps */) {
    return "Produto cadastrado com sucesso";
  }
}

export { RegisterProductsService };
