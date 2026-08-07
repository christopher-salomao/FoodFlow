"use server";

import { apiClient } from "@/lib/api";
import type { UserProps, AuthResponseProps } from "@/lib/types";

import { removeToken, setToken } from "@/lib/auth";
import { redirect } from "next/navigation";

// api URL: http://localhost:3333

export async function registerAction(
  prevState: { success: boolean; error: string; redirectTo?: string } | null,
  formData: FormData,
) {
  try {
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    const data = {
      name,
      email,
      password,
    };

    await apiClient<UserProps>("users", {
      method: "POST",
      body: JSON.stringify(data),
    });

    return {
      success: true,
      error: "",
      redirectTo: "/login",
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
      };
    }

    console.error(error);

    return {
      success: false,
      error: "Erro ao criar conta",
    };
  }
}

export async function loginAction(
  prevState:
    | { success: boolean; error: string; redirectTo?: string }
    | null
    | undefined,
  formData: FormData,
) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");

    const data = {
      email,
      password,
    };

    const response = await apiClient<AuthResponseProps>("login", {
      method: "POST",
      body: JSON.stringify(data),
    });

    await setToken(response.token);

    return {
      success: true,
      error: "",
      redirectTo: "/dashboard",
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }
}

export async function logoutAction() {
  await removeToken();
  redirect("/login");
}
