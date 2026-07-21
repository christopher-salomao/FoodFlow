import prismaClient from "../../prisma/index";

class UserDetailsService {
  async execute(userId: string) {
    try {
      const user = await prismaClient.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
        },
      });

      if (!user) throw new Error("Usuário não encontrado");

      return user;
    } catch (error) {
      console.error(error);
      throw new Error("Usuário não encontrado");
    }
  }
}

export { UserDetailsService };
