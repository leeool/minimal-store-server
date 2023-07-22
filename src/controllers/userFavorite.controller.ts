import productRepository from "@repositories/product.repository"
import userRepository from "@repositories/user.repository"
import { Response, Request } from "express"
import { In } from "typeorm"

class UserFavoriteController {
  async showByUser(req: Request, res: Response) {
    const { id } = req.params

    const userFavorites = await userRepository.find({
      where: { id },
      relations: { favorites: true }
    })

    console.log(userFavorites)

    return res.json(userFavorites)
  }

  async store(req: Request, res: Response) {
    const { id } = req.params
    const { productId } = req.body

    const user = await userRepository.findOne({
      where: { id },
      relations: { favorites: true }
    })

    if (!user) {
      return res.status(400).json({ error: "User not found" })
    }

    const products = await productRepository.findOneBy({ id: productId })

    if (!products) {
      return res.status(400).json({ error: "Product not found" })
    }

    await userRepository.save({
      ...user,
      favorites: [...user.favorites, products]
    })

    return res.json(products)
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params
    const { productId } = req.body

    const user = await userRepository.findOne({
      where: { id },
      relations: { favorites: true }
    })

    if (!user) {
      return res.status(400).json({ error: "User not found" })
    }

    const products = await productRepository.findOneBy({ id: productId })

    if (!products) {
      return res.status(400).json({ error: "Product not found" })
    }

    await userRepository.save({
      ...user,
      favorites: user.favorites.filter((favorite) => favorite.id !== productId)
    })

    return res.sendStatus(204)
  }
}

export default new UserFavoriteController()
