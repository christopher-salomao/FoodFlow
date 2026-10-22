"use client";

import { Trash } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "../ui/dialog";

import { deleteProductAction } from "@/actions/products";
import { useRouter } from "next/navigation";

interface DeleteButtonProps {
  productId: string;
}

export function DeleteButtonProduct({ productId }: DeleteButtonProps) {
  const router = useRouter();

  async function handleDeleteProduct() {
    const result = await deleteProductAction(productId);

    if (result?.success) {
      router.refresh();
      return;
    }

    if (result?.error) {
      console.error(result.error);
    }
  }

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            // onClick={handleDeleteProduct}
            className="bg-red-500 hover:bg-red-600"
          >
            <Trash className="w-5 h-5" />
          </Button>
        }
      />

      <DialogContent
        showCloseButton={false}
        className="bg-app-card sm:p-6 border border-app-border flex flex-col gap-8 md:min-w-md"
      >
        <h3 className="md:text-[18px] font-semibold self-center text-center">
          Tem certeza que deseja excluir esse produto?
        </h3>

        <div className="flex gap-4 self-end">
          <DialogClose
            render={
              <Button className="bg-green-500 hover:bg-green-600">
                Cancelar
              </Button>
            }
          />
          <Button
            onClick={handleDeleteProduct}
            className="bg-red-500 hover:bg-red-600"
          >
            Excluir
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
