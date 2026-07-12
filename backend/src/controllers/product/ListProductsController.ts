import { Request, Response } from "express";
import { ListProductsService } from "../../services/products/ListProductsService";

class ListProductsController {
  async handle(req: Request, res: Response) {
    const disabled = req.query?.disabled as string | undefined;

    const listProduct = new ListProductsService();

    const products = await listProduct.execute({
      disabled,
    });

    res.status(200).json(products);
  }
}

export { ListProductsController };
