import { z } from "zod";

export const createOrderSchema = z.object({
  body: z.object({
    table: z.int({ message: "A mesa precisa ser um número" }),
    products: z.array(z.string({ message: "Os produtos precisam ser um array de textos" })),
  }),
});
