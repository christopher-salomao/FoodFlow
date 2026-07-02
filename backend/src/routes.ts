import { Router } from "express";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { UserDetailsController } from "./controllers/user/UserDetailsController";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoriesController } from "./controllers/category/ListCategoriesController";
import { RegisterProductsController } from "./controllers/product/RegisterProductsController";

import { validateSchema } from "./middlewares/validateSchema";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { isAdmin } from "./middlewares/isAdmin";

import { createUserSchema, authUserSchema } from "./schemas/userSchema";
import { createCategorySchema } from "./schemas/categorySchema";

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

// get user details
router.get("/me", isAuthenticated, new UserDetailsController().handle);

// list all categories
router.get(
  "/categories",
  isAuthenticated,
  new ListCategoriesController().handle,
);

// create a new category
router.post(
  "/categories",
  isAuthenticated,
  isAdmin,
  validateSchema(createCategorySchema),
  new CreateCategoryController().handle,
);

// register a new product
router.post(
  "/products",
  isAuthenticated,
  isAdmin,
  new RegisterProductsController().handle,
);

export { router };
