import cartItemRepository from "@repositories/cartItem.repository"
import { Request, Response } from "express"

class CartItemController {
  async delete(req: Request, res: Response) {
    const { id } = req.params

    const cartItem = await cartItemRepository.findOne({
      where: { id }
    })

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" })
    }

    await cartItemRepository.delete({ id })

    return res.json(cartItem)
  }

  async incrementQty(req: Request, res: Response) {
    const { id } = req.params

    const cartItem = await cartItemRepository.findOne({
      where: { id }
    })

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" })
    }

    await cartItemRepository.increment({ id }, "quantity", 1)

    return res.sendStatus(204)
  }

  async decrementQty(req: Request, res: Response) {
    const { id } = req.params

    const cartItem = await cartItemRepository.findOne({
      where: { id }
    })

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" })
    }

    if (cartItem.quantity === 1) {
      return res
        .status(400)
        .json({ message: "Cart item quantity cannot be less than 1" })
    }

    await cartItemRepository.decrement({ id }, "quantity", 1)

    return res.sendStatus(204)
  }
}

export default new CartItemController()
