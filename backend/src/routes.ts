import { Router } from "express";
import multer from "multer";

import uploadConfig from "./config/multer";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { UserDetailsController } from "./controllers/user/UserDetailsController";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoriesController } from "./controllers/category/ListCategoriesController";
import { RegisterProductsController } from "./controllers/product/RegisterProductsController";
import { ListProductsController } from "./controllers/product/ListProductsController";
import { DeleteProductController } from "./controllers/product/DeleteProductController";
import { ListProductByCategoryController } from "./controllers/product/ListProductByCategoryController";
import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { ListOrderController } from "./controllers/order/ListOrderController";

import { validateSchema } from "./middlewares/validateSchema";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { isAdmin } from "./middlewares/isAdmin";
import { createUserSchema, authUserSchema } from "./schemas/userSchema";
import { createCategorySchema } from "./schemas/categorySchema";
import { registerProductSchema, listProductSchema, deleteProductSchema, listProductByCategorySchema } from "./schemas/productSchema";
import { createOrderSchema, listOrderSchema } from "./schemas/orderSchema";

const router = Router();

const upload = multer(uploadConfig);

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
  upload.single("banner"),
  validateSchema(registerProductSchema),
  new RegisterProductsController().handle,
);

// list all products
router.get(
  "/products",
  isAuthenticated,
  validateSchema(listProductSchema),
  new ListProductsController().handle,
);

// disable a product
router.delete(
  "/products",
  isAuthenticated,
  isAdmin,
  validateSchema(deleteProductSchema),
  new DeleteProductController().handle,
);

// list products by category
router.get(
  "/category/products",
  isAuthenticated,
  validateSchema(listProductByCategorySchema),
  new ListProductByCategoryController().handle,
);

// create a new order
router.post(
  "/order",
  isAuthenticated,
  validateSchema(createOrderSchema),
  new CreateOrderController().handle,
);

// list all orders
router.get(
  "/orders",
  isAuthenticated,
  validateSchema(listOrderSchema),
  new ListOrderController().handle,
);

export { router };
