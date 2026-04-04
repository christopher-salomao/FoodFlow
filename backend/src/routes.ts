import { Router, Request, Response } from "express";
import { CreateUserController } from "./controllers/user/createUserController";
import { validateSchema } from "./middlewares/validateSchema";
import { createUserSchema } from "./schemas/userSchema";

const router = Router();

// create a new user
router.post("/users",validateSchema(createUserSchema) , new CreateUserController().handle);

export { router };
