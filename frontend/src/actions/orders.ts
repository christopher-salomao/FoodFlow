"use server";

import { apiClient } from "@/lib/api";
import { getToken } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function finishOrderAction(orderId: string) {
  if (!orderId) {
    return { success: false, error: "Erro ao finalizar pedido" };
  }

  const token = await getToken();

  if (!token) {
    return { success: false, error: "Erro ao finalizar pedido" };
  }

  try {
    await apiClient(`order/finish?order_id=${orderId}`, {
      method: "PATCH",
      token,
    });

    revalidatePath("/dashboard");

    return { success: true, error: "" };
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return { success: false, error: error.message };
    }
  }
}
