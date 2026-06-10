import prismaClient from "../../prisma/index";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface AuthUserProps {
  email: string;
  password: string;
}

class AuthUserService {
  async execute({ email, password }: AuthUserProps) {
    console.log(email, password);

    // verificação de email
    const user = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) throw new Error("Dados incorretos, verifique suas credenciais");

    // verificação de senha
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch)
      throw new Error("Dados incorretos, verifique suas credenciais");

    // gerar token JWT
    const token = sign({
      name: user.name,
      email: user.email,
    }, process.env.JWT_SECRET as string, {
      subject: user.id,
      expiresIn: "30d"
    })

    // retornar user e token
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token
    };
  }
}

export { AuthUserService };
