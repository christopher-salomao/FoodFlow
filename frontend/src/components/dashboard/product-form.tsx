"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus, Upload } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

import { createProductAction } from "@/actions/products";
import { CategoryProps } from "@/lib/types";

interface ProductFormProps {
  categories: CategoryProps[];
}

export function ProductForm({ categories }: ProductFormProps) {
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [priceValue, setPriceValue] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const router = useRouter();

  function convertBRLToCents(value: string): number {
    const cleanedValue = value
      .replace(/[R$\s]/g, "")
      .replace(/\./g, "")
      .replace(",", ".");

    const BRL = parseFloat(cleanedValue) || 0;

    return Math.round(BRL * 100);
  }

  async function handleCreateProduct(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (!imageFile) {
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    const formElement = e.currentTarget;

    const name = (formElement.elements.namedItem("name") as HTMLInputElement)
      ?.value;
    const description = (
      formElement.elements.namedItem("description") as HTMLInputElement
    )?.value;
    const princeInCents = convertBRLToCents(priceValue);

    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", princeInCents.toString());
    formData.append("category_id", selectedCategory);
    formData.append("banner", imageFile);

    const result = await createProductAction(formData);

    if (result.success) {
      setIsLoading(false);
      setOpen(false);
      router.refresh();
      return;
    } else {
      setIsLoading(false);
      console.error(result.error);
      return;
    }
  }

  function formatToBRL(value: string) {
    const numbers = value.replace(/\D/g, "");

    if (!numbers) return "";

    const amount = parseInt(numbers, 10);
    const formatted = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(amount / 100);

    return formatted;
  }

  function handlePriceChange(e: React.ChangeEvent<HTMLInputElement>) {
    const formattedValue = formatToBRL(e.target.value);
    setPriceValue(formattedValue);
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        return;
      }

      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  function clearImage() {
    setImagePreview(null);
    setImageFile(null);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button className="bg-brand-primary hover:bg-brand-primary/90 font-semibold">
            <Plus className="h-5 w-5 mr-2" />
            Novo produto
          </Button>
        }
      />

      <DialogContent className="p-6 bg-app-card text-white max-h-[90vh] md:min-w-115 overflow-y-hidden ">
        <DialogHeader>
          <DialogTitle>Criar novo produto</DialogTitle>
          <DialogDescription>Criando novo produto...</DialogDescription>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleCreateProduct}>
          <div>
            <Label htmlFor="name" className="mb-2">
              Nome do produto
            </Label>
            <Input
              id="name"
              name="name"
              required
              placeholder="Digite o nome do produto..."
              className="border-app-border bg-app-background text-white"
            />
          </div>

          <div>
            <Label htmlFor="price" className="mb-2">
              Preço
            </Label>
            <Input
              id="price"
              name="price"
              required
              placeholder="Ex: 35,00"
              value={priceValue}
              onChange={handlePriceChange}
              className="border-app-border bg-app-background text-white"
            />
          </div>

          <div>
            <Label htmlFor="description" className="mb-2">
              Descrição
            </Label>
            <Textarea
              id="description"
              name="description"
              required
              placeholder="Digite a descrição do produto..."
              className="border-app-border bg-app-background text-white min-h-25 resize-none"
            />
          </div>

          <div>
            <Label htmlFor="category" className="mb-2">
              Categoria
            </Label>
            <Select
              value={selectedCategory}
              onValueChange={(value) => setSelectedCategory(value ?? "")}
              required
              // id="category"
              // name="category"
            >
              <SelectTrigger className="border-app-border bg-app-background text-white">
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent className="bg-app-card border-app-border">
                {categories.map((category) => (
                  <SelectItem
                    key={category.id}
                    value={category.id}
                    className="text-white hover:bg-app-background focus:bg-app-background data-highlighted:bg-app-background data-highlighted:text-white cursor-pointer"
                  >
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="mb-2">Imagem do produto</Label>

            {imagePreview ? (
              <div className="relative w-full h-48 border rounded-lg overflow-hidden">
                <Image
                  src={imagePreview}
                  alt="Prévizualização da imagem"
                  fill
                  className="object-cover"
                />

                <Button
                  className="absolute top-2 right-2 z-20 bg-red-600 hover:bg-red-700"
                  type="button"
                  variant="destructive"
                  onClick={clearImage}
                >
                  Excluir
                </Button>
              </div>
            ) : (
              <Label
                htmlFor="file"
                className="border-2 border-dashed rounded-md p-8 flex flex-col items-center justify-center gap-2 cursor-pointer"
              >
                <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                <p>Clique para selecionar uma imagem</p>
                <p className="mt-1 text-xs  text-center">
                  Formatos aceitos: JPG, JPEG, PNG, WEBP (máx. 4MB)
                </p>
                <Input
                  id="file"
                  name="file"
                  type="file"
                  className="hidden"
                  accept="image/jpg, image/jpeg, image/png, image/webp"
                  onChange={handleImageChange}
                  required
                />
              </Label>
            )}
          </div>

          <Button
            type="submit"
            disabled={isLoading || !selectedCategory}
            className="w-full bg-brand-primary text-white hover:bg-brand-primary disabled:opacity-50"
          >
            {isLoading ? "Criando..." : "Criar produto"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
