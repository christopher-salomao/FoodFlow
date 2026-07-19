import { Request, Response } from "express";
import { SendOrderService } from "../../services/order/SendOrderService";

class SendOrderController {
  async handle(req: Request, res: Response) {
    const { order_id, customer_name } = req.body;

    const sendOrder = new SendOrderService();
    const order = await sendOrder.execute({ order_id, customer_name });

    res.status(200).json(order);
  }
}

export { SendOrderController };
