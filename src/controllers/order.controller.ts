import Cart from "@entities/Cart"
import Order from "@entities/Order"
import User from "@entities/User"
import cartRepository from "@repositories/cart.repository"
import orderRepository from "@repositories/order.repository"
import userRepository from "@repositories/user.repository"
import { Request, Response } from "express"
import { format } from "date-fns"
import transporter, { sendEmail } from "@helpers/transporter"
import orderHTML from "@helpers/orderHTML"

class OrderController {
  async index(req: Request, res: Response) {
    const orders = await orderRepository.find()

    return res.json(orders)
  }

  async show(req: Request, res: Response) {
    const { id } = req.params

    const order = await orderRepository.findOne({
      where: { id },
      relations: { user: true, cart: { cartItems: true } }
    })

    return res.json(order)
  }

  async store(req: Request, res: Response) {
    const { cartId } = req.body
    const { userId } = req.params

    const user = await userRepository.findOne({
      where: { id: userId }
    })

    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    // if (!user.address) {
    //   return res.status(400).json({ error: "User address not found" })
    // }

    const cart = await cartRepository.findOne({
      where: { id: cartId },
      relations: { cartItems: true }
    })

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" })
    }

    const total = cart.cartItems.reduce(
      (acc, cartItem) => acc + cartItem.product.price * cartItem.quantity,
      0
    )

    const order = orderRepository.create({
      user,
      cart,
      total
    })

    await orderRepository.save(order)

    const html = orderHTML(order, user, cart)

    await sendEmail(
      user.email,
      `#${order.id.split("-")[0]} - Confirmação de pedido`,
      html
    )

    return res.json(order)
  }
}

export default new OrderController()
