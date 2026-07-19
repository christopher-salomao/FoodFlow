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

export const addItemToOrderSchema = z.object({
  body: z.object({
    order_id: z.string({ message: "O ID do pedido deve ser um texto" }).min(1, { message: "O ID do pedido é obrigatório" }),
    product_id: z.string({ message: "O ID do produto deve ser um texto" }).min(1, { message: "O ID do produto é obrigatório" }),
    amount: z
      .number({ message: "A quantidade é obrigatória" })
      .int({ message: "A quantidade deve ser um número inteiro" })
      .positive({ message: "A quantidade deve ser um número positivo" }),
  }),
});

export const removeOrderItemSchema = z.object({
  query: z.object({
    order_item_id: z.string({ message: "O ID do item do pedido deve ser um texto" }).min(1, { message: "O ID do item do pedido é obrigatório" }),
  }),
});

export const orderDetailsSchema = z.object({
  query: z.object({
    order_id: z.string({ message: "O ID do pedido deve ser um texto" }).min(1, { message: "O ID do pedido é obrigatório" }),
  }),
});
