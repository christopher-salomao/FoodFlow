"use client";

import { useState } from "react";
import { createCategoryAction } from "@/actions/categories";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";

export function CategoryForm() {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  async function handleCreateCategory(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const result = await createCategoryAction(formData);

    if (result.success) {
      setOpen(false);
      router.refresh();
      return;
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button className=" bg-brand-primary hover:bg-brand-primary/90 font-semibold">
            <Plus className="mr-2 h-5 w-5" />
            Nova categoria
          </Button>
        }
      />

      <DialogContent className="bg-app-card sm:p-6 border border-app-border">
        <DialogHeader className="space-y-1 text-center">
          <DialogTitle>Criar nova categoria</DialogTitle>
          <DialogDescription className="text-sm text-gray-500!">
            Preencha o campo abaixo
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleCreateCategory} className="space-y-4">
          <div>
            <Label htmlFor="name">Nome da categoria</Label>
            <Input
              id="name"
              name="name"
              required
              placeholder="Digite o nome da categoria"
              className="mt-2 border-app-border bg-app-background"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-brand-primary hover:bg-brand-primary/90"
          >
            Criar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
