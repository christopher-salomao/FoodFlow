import { z } from "zod";

export const createOrderSchema = z.object({
  body: z.object({
    table: z.string({ message: "A mesa precisa ser um número" }).min(1, { message: "A mesa é obrigatória" }).regex(/^\d+$/, { message: "A mesa precisa ser um número" }),
    products: z.array(z.string()),
  }),
});
