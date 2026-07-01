import { z } from "zod";

export const createProductSchema = z.object({
  body: z.object({
    name: z
      .string({ message: "O nome do produto precisa ser um texto" })
      .min(3, { message: "O nome do produto precisa ter pelo menos 3 caracteres" }),
    description: z
      .string({ message: "A descrição do produto precisa ser um texto" })
      .min(3, { message: "A descrição do produto precisa ter pelo menos 3 caracteres" }),
    price: z
      .int({ message: "O preco do produto precisa ser em centavos" })
      .min(3, { message: "O preco do produto precisa ter pelo menos 3 caracteres" }),
    category_id: z
      .string({ message: "A categoria do produto precisa ser um texto" })
      .min(3, { message: "A categoria do produto precisa ter pelo menos 3 caracteres" }),
  }),
});
