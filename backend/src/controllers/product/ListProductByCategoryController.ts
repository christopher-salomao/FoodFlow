import { Request, Response } from "express";
import { ListProductByCategoryService } from "../../services/products/ListProductByCategoryService";

class ListProductByCategoryController {
  async handle(req: Request, res: Response) {
    const category_id = req.query.category_id as string;
    const disabled = req.query.disabled as string | undefined;

    const listProductByCategoryService = new ListProductByCategoryService();
    const products = await listProductByCategoryService.execute({
      category_id,
      disabled,
    });

    res.status(200).json(products);
  }
}

export { ListProductByCategoryController };
