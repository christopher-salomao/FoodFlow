import { Request, Response } from "express";
import { AddItemToOrderService } from "../../services/order/AddItemToOrderService";

class AddItemToOrderController {
  async handle(req: Request, res: Response) {
    const { order_id, product_id, amount } = req.body;

    const addItemToOrder = new AddItemToOrderService();
    const orderItem = await addItemToOrder.execute({
      order_id,
      product_id,
      amount,
    });

    res.status(201).json(orderItem);
  }
}

export { AddItemToOrderController };
