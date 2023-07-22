import cartRepository from "@repositories/cart.repository"
import cartItemRepository from "@repositories/cartItem.repository"
import productRepository from "@repositories/product.repository"
import userRepository from "@repositories/user.repository"
import { Response, Request } from "express"

class CartController {
  async index(req: Request, res: Response) {
    const carts = await cartRepository.find()

    res.json(carts)
  }

  async show(req: Request, res: Response) {
    const { userId } = req.params

    const cart = await cartRepository.findOne({
      where: { user: { id: userId } },
      relations: { cartItems: true, user: true }
    })

    res.json(cart)
  }

  async store(req: Request, res: Response) {
    const { userId, productId } = req.body

    const user = await userRepository.findOne({
      where: { id: userId },
      relations: { cart: { cartItems: true } }
    })

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    const product = await productRepository.findOne({
      where: { id: productId }
    })

    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }

    let userCart = user.cart

    if (!userCart) {
      const cart = cartRepository.create({
        user,
        cartItems: []
      })

      userCart = cart

      await cartRepository.save(cart)
    }

    const cartItem = cartItemRepository.create({
      product,
      quantity: 1,
      cart: userCart
    })

    await cartItemRepository.save(cartItem)

    console.log(userCart)

    const cart = cartRepository.create({
      ...userCart,
      user,
      cartItems:
        userCart.cartItems.length > 0
          ? [...userCart.cartItems, cartItem]
          : [cartItem]
    })

    await cartRepository.save(cart)

    res.json(cart.cartItems)
  }
}

export default new CartController()
