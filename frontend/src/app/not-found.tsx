import Image from "next/image";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import logo from "@/assets/logo.png";

export default function NotFound() {
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
                <h1 className="text-2xl sm:text-3xl font-bold">
                  Não encontrado (404)
                </h1>
                <p className="text-sm sm:text-base text-gray-100">
                  A página que você tentou acessar não existe ou foi movida.
                </p>
                <Link href="/dashboard">
                  <Button className="w-full py-6 bg-brand-primary hover:bg-brand-primary/80 transition-all duration-300">
                    Ir para o dashboard
                  </Button>
                </Link>
              </div>
            </CardContent>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
