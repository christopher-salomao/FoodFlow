import prismaClient from "../../prisma/index";
import { compare } from "bcryptjs";

interface AuthUserProps {
  email: string;
  password: string;
}

 class AuthUserService {
  async execute({ email, password }: AuthUserProps) {
    console.log(email, password);
    return "LOGADO";
    /* const user = await prismaClient.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) throw new Error("Usuário não encontrado");

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) throw new Error("Senha incorreta");

    return user; */
  }
}

export { AuthUserService };
