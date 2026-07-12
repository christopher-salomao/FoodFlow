import { z } from "zod";

export const createOrderSchema = z.object({
  body: z.object({
    customer_name: z.string().optional(),
    table: z
      .number({ message: "O número da mesa é obrigatório" })
      .int({ message: "O número da mesa deve ser um número inteiro" })
      .positive({ message: "O número da mesa deve ser um número positivo" }),
  }),
});

export const listOrderSchema = z.object({
  query: z.object({
    draft: z.string().optional(),
  }),
});
