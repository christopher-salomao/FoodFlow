import prismaClient from "../../prisma/index";

interface CreateUserProps {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute({ name, email, password }: CreateUserProps) {
    const userAlreadyExists = await prismaClient.user.findUnique({
      where: {
        email,
      },
    });

    if (userAlreadyExists) throw new Error("Usuário já cadastrado");

    try {
      const user = await prismaClient.user.create({
        data: {
          name,
          email,
          password,
        },
      });

      return user.createdAt;
    } catch (error) {
      return "Erro ao criar usuário";
    }
  }
}

export { CreateUserService };
