import { Request, Response } from "express";
import { UserDetailsService } from "../../services/user/UserDetailsSerivice";

class UserDetailsController {
  async handle(req: Request, res: Response) {
    const userDetails = new UserDetailsService();
    const user = await userDetails.execute(req.user_id);

    res.json(user);
  }
}

export { UserDetailsController };
