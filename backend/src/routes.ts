import { Router } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { validateSchema } from "./middlewares/validateSchema";
import { createUserSchema, authUserSchema } from "./schemas/userSchema";

const router = Router();

// create a new user
router.post(
  "/users",
  validateSchema(createUserSchema),
  new CreateUserController().handle,
);

// login
router.post(
  "/login",
  validateSchema(authUserSchema),
  new AuthUserController().handle,
);

export { router };
