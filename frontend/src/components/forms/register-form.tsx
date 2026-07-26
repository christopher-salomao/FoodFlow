"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui//card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Image from "next/image";
import Link from "next/link";

import logo from "@/assets/logo.png";

export function RegisterForm() {
  return (
    <Card className="bg-app-card border border-app-border w-full mx-auto max-w-md">
      <CardHeader>
        <CardTitle className="text-center mx-auto">
          <Image
            src={logo}
            alt="Logo Food Flow"
            width={200}
            height={100}
            className="w-48 sm:w-64 h-auto"
            priority
          />
        </CardTitle>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                type="text"
                id="name"
                placeholder="Digite seu nome"
                required
                minLength={3}
                className="text-white border border-app-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                type="email"
                id="email"
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
                placeholder="Digite sua senha"
                required
                className="text-white border border-app-border"
              />
            </div>

            <Button type="submit" className="w-full py-6 bg-brand-primary hover:bg-brand-primary/80 transition-all duration-300">Cadastrar</Button>

            <p className="text-sm text-center text-gray-100">Já possui uma conta? <Link href="/login" className="font-bold text-brand-primary!">Faça login</Link></p>
          </form>
        </CardContent>
      </CardHeader>
    </Card>
  );
}
