import { z } from "zod";

export const createUserSchema = z.object({
  body: z.object({
    name: z
      .string({ message: "O nome precisa ser um texto" })
      .min(3, { message: "O nome deve ter pelo menos 3 caracteres" }),
    email: z.email({ message: "Precisa ser um email válido" }),
    password: z
      .string({ message: "A senha precisa ser um texto" })
      .min(6, { message: "A senha precisa ter pelo menos 6 caracteres" }),
  }),
});
