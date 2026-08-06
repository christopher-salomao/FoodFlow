import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { apiClient } from "./api";
import type { UserProps } from "./types";

const COOKIE_NAME = "token_food_flow";

export async function getToken(): Promise<string | undefined> {
  const cookieStore = await cookies();

  return cookieStore.get(COOKIE_NAME)?.value;
}

export async function setToken(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
    sameSite: true,
    secure: process.env.NODE_ENV === "production",
  });
}

export async function removeToken() {
  const cookieStore = await cookies();

  cookieStore.delete(COOKIE_NAME);
}

export async function getUser(): Promise<UserProps | null> {
  try {
    const token = await getToken();

    if (!token) {
      return null;
    }

    const user = await apiClient<UserProps>("me", {
      token,
    });

    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function logout() {
  await removeToken();
  return "/login";
}

export async function requiredAdmin(): Promise<UserProps | undefined> {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  if (user.role !== "ADMIN") {
    redirect("/access-denied");
  }

  return user;
}
