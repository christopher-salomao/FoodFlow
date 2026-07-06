import { Request, Response } from "express";
import { RegisterProductsService } from "../../services/products/RegisterProductsService";

class RegisterProductsController {
  async handle(req: Request, res: Response) {
    const { name, description, price, category_id } = req.body;

    if (!req.file) {
      throw new Error("A imagem do produto é obrigatória");
    }

    const RegisterProduct = new RegisterProductsService();

    const product = await RegisterProduct.execute(
      {
        name,
        description,
        price,
        category_id,
        bunnerBuffer: req.file.buffer,
        bunnerName: req.file.originalname,
      }
    );

    res.json(product);
  }
}

export { RegisterProductsController };
