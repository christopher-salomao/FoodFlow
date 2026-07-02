import { Request, Response } from "express";
import { RegisterProductsService } from "../../services/products/RegisterProductsService";

class RegisterProductsController {
  async handle(req: Request, res: Response) {
    const RegisterProduct = new RegisterProductsService();

    const product = await RegisterProduct.execute();

    res.json(product);
  }
}

export { RegisterProductsController };
