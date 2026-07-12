import { Request, Response } from "express";
import { CreateOrderService } from "../../services/order/CreateOrderService";

class CreateOrderController {
  async handle(req: Request, res: Response) {
    const { customer_name, table } = req.body;

    const createOrder = new CreateOrderService();
    const order = await createOrder.execute({
      customer_name,
      table: Number(table),
    });

    res.status(201).json(order);
  }
}

export { CreateOrderController };
