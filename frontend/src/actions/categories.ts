"use server";

import { apiClient } from "@/lib/api";
import { getToken } from "@/lib/auth";
import { CategoryProps } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function createCategoryAction(formData: FormData) {
  try {
    const tokem = await getToken();
    const name = formData.get("name");

    if(!name || !tokem) {
      return {
        success: false,
        error: "Erro ao criar categoria",
      };
    }

    await apiClient<CategoryProps>("categories", {
      method: "POST",
      body: JSON.stringify({
        name,
      }),
      token: tokem,
    });

    revalidatePath("/dashboard/categories");

    return {
      success: true,
      error: "",
    };

  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: false,
      error: "Erro ao criar categoria",
    };
  }
}
