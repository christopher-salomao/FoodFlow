import { Request, Response } from "express";
import { ListOrderService } from "../../services/order/ListOrdersService";

class ListOrderController {
  async handle(req: Request, res: Response) {
    const draft = req.query?.draft as string | undefined;

    const listOrderService = new ListOrderService();
    const orders = await listOrderService.execute({draft});

    res.status(200).json(orders);
  }
}

export { ListOrderController };
