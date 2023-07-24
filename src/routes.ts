import authController from "@controllers/auth.controller"
import cartController from "@controllers/cart.controller"
import cartItemController from "@controllers/cartItem.controller"
import categoryController from "@controllers/category.controller"
import orderController from "@controllers/order.controller"
import productController from "@controllers/product.controller"
import userController from "@controllers/user.controller"
import userFavoriteController from "@controllers/userFavorite.controller"
import auth from "@middlewares/auth.middleware"
import verifyUser from "@middlewares/verifyUser.middleware"
import { Router } from "express"
import "express-async-errors"

const routes = Router()

routes.post("/auth/signin", authController.signIn)
routes.post("/auth/signup", authController.signUp)
routes.get("/auth/me", authController.me)

routes.get("/user/:id", userController.show)
routes.get("/user", userController.index)
routes.post("/user", userController.store)

routes.get(
  "/favorites/:id",
  auth,
  verifyUser,
  userFavoriteController.showByUser
)
routes.post("/favorites/:id", userFavoriteController.store)
routes.delete("/favorites/:id", userFavoriteController.delete)

routes.get("/product/category/:id", categoryController.show)
routes.get("/product/category", categoryController.index)
routes.post("/product/category", categoryController.store)

routes.get("/product/:id", productController.show)
routes.put("/product/:id", productController.update)
routes.delete("/product/:id", productController.delete)
routes.get("/product", productController.index)
routes.post("/product", productController.store)

routes.patch("/cart-item/:id/increment", cartItemController.incrementQty)
routes.patch("/cart-item/:id/decrement", cartItemController.decrementQty)
routes.delete("/cart-item/:id", cartItemController.delete)

routes.get("/cart/:userId", cartController.show)
routes.get("/cart", cartController.index)
routes.post("/cart", cartController.store)

routes.get("/order/:id", orderController.show)
routes.get("/order", orderController.index)
routes.post("/order", orderController.store)

export default routes
