import { Request, Response } from "express";
import { ListCategoriesService } from "../../services/category/ListCategoriesService";

class ListCategoriesController {
  async handle(_req: Request, res: Response) {
    const listCategoriesService = new ListCategoriesService();
    const categories = await listCategoriesService.execute();

    res.status(200).json(categories);
  }
}

export { ListCategoriesController };
