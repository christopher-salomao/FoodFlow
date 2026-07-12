import { z } from "zod";

export const registerProductSchema = z.object({
  body: z.object({
    name: z.string().min(1, {
      message: "O nome do produto é obrigatório",
    }),
    description: z.string().min(1, {
      message: "A descrição do produto é obrigatória",
    }),
    price: z
      .string()
      .min(3, {
        message: "O preco do produto precisa ter pelo menos 3 caracteres",
      })
      .regex(/^\d+$/, { message: "O preco do produto precisa ser um número" }),
    category_id: z.string({
      message: "A categoria do produto é obrigatória",
    }),
  }),
});

export const listProductSchema = z.object({
  query: z.object({
    disabled: z.string().optional(),
  }),
});

export const deleteProductSchema = z.object({
  query: z.object({
    product_id: z.string({
      message: "O id do produto é obrigatório",
    }),
  }),
});

export const listProductByCategorySchema = z.object({
  query: z.object({
    category_id: z.string({
      message: "O id da categoria é obrigatório",
    }),
    disabled: z.string().optional(),
  }),
});
