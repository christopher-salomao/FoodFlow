import Image from "next/image";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { logoutAction } from "@/actions/auth";
import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";

import logo from "@/assets/logo.png";

export default async function AccessDenied() {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full">
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
              <div className="space-y-4 text-center">
                <h1 className="text-2xl sm:text-3xl font-bold">Acesso negado</h1>
                <p className="text-sm sm:text-base text-gray-100">
                  Você não tem permissão para acessar o painel. Apenas
                  administradores podem continuar.
                </p>
                <p className="text-sm sm:text-base text-gray-100">
                  Se você acha que isso é um erro, procure o responsável.
                </p>
                <form action={logoutAction}>
                  <Button
                    type="submit"
                    className="w-full py-6 bg-brand-primary hover:bg-brand-primary/80 transition-all duration-300"
                  >
                    Voltar ao login
                  </Button>
                </form>
              </div>
            </CardContent>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
