import { Response, Request } from "express";
import { RemoveOrderItemService } from "../../services/order/RemoveItemService";


class RemoveOrderItemController {
  async handle(req: Request, res: Response) {
    const order_item_id = req.query?.order_item_id as string;

    const removeOrderItem = new RemoveOrderItemService();
    const orderItem = await removeOrderItem.execute({ order_item_id});

    res.status(200).json(orderItem);
  }
}

export { RemoveOrderItemController };
