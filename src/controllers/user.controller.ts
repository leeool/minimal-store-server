import productRepository from "@repositories/product.repository"
import userRepository from "@repositories/user.repository"
import { Request, Response } from "express"

class UserController {
  async index(req: Request, res: Response) {
    const users = await userRepository.find()

    return res.json(users)
  }

  async show(req: Request, res: Response) {
    const { id } = req.params

    const user = await userRepository.findOne({
      where: { id },
      relations: { favorites: true }
    })

    return res.json(user)
  }

  async store(req: Request, res: Response) {
    const { name, email, password, cpf } = req.body

    const user = userRepository.create({ name, email, password, cpf })

    await userRepository.save(user)

    return res.json(user)
  }
}

export default new UserController()
