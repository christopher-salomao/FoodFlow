"use client";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "../ui//card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Image from "next/image";
import Link from "next/link";

import logo from "@/assets/logo.png";

import { loginAction } from "@/actions/auth";

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, null);

  const router = useRouter();

  useEffect(() => {
    if (state?.success && state?.redirectTo) {
      router.replace(state.redirectTo);
    }
  }, [state, router]);

  return (
    <Card className="bg-app-card border border-app-border w-full mx-auto max-w-md">
      <CardHeader>
        <CardTitle className="text-center mx-auto">
          <Image
            src={logo}
            alt="Logo Food Flow"
            className="w-48 sm:w-64 h-auto"
            priority
          />
        </CardTitle>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Digite seu e-mail"
                required
                className="text-white border border-app-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                type="password"
                id="password"
                name="password"
                placeholder="Digite sua senha"
                required
                className="text-white border border-app-border"
              />
            </div>

            <Button
              type="submit"
              className="w-full py-6 bg-brand-primary hover:bg-brand-primary/80 transition-all duration-300"
            >
              {isPending ? "Acessando conta..." : "Acessar"}
            </Button>

            {state?.error && (
              <p className="text-sm text-center bg-red-100 py-3 rounded-md font-medium text-red-500!">
                {state.error}
              </p>
            )}

            <p className="text-sm text-center text-gray-100">
              Ainda não possui uma conta?{" "}
              <Link href="/register" className="font-bold text-brand-primary!">
                Crie uma conta
              </Link>
            </p>
          </form>
        </CardContent>
      </CardHeader>
    </Card>
  );
}
