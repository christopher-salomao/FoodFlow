import { apiClient } from "@/lib/api";
import { getToken } from "@/lib/auth";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import type { CategoryProps } from "@/lib/types";
import { Tags } from "lucide-react";
import { CategoryForm } from "@/components/dashboard/category-form";

export default async function Categories() {
  const token = await getToken();
  const categories = await apiClient<CategoryProps[]>("categories", {
    token,
  });

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Categorias</h1>
          <p className="text-sm sm:text-base mt-1">Organize suas categorias</p>
        </div>

        <CategoryForm />
      </div>

      {categories.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:grid-cols-4">
          {categories.map((category) => (
            <Card key={category.id} className="bg-app-card border border-app-border transition-shadow hover:shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                  <Tags className="w-5 h-5" />
                  <span>{category.name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-200">ID: {category.id}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
