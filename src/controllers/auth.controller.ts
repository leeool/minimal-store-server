import userRepository from "@repositories/user.repository"
import { Request, Response } from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

class AuthController {
  async signIn(req: Request, res: Response) {
    const { email, password } = req.body

    const user = await userRepository.findOne({
      where: { email },
      select: ["id", "password"]
    })

    if (!user) {
      return res.status(404).json({ error: "Incorrect e-mail or password" })
    }

    const passwordMatched = await bcrypt.compare(password, user.password)

    if (!passwordMatched) {
      return res.status(404).json({ error: "Incorrect e-mail or password " })
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: "1d"
    })

    return res.json({ token })
  }

  async signUp(req: Request, res: Response) {
    const { name, email, password, cpf, address } = req.body

    const userExists = await userRepository.findOne({
      where: [{ email }, { cpf }]
    })

    if (userExists) {
      return res.status(409).json({ error: "CPF or e-mail already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
      cpf,
      address
    })

    await userRepository.save(user)

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: "1d"
    })

    return res.json({ token })
  }

  async me(req: Request, res: Response) {
    const { authorization } = req.headers

    if (!authorization) {
      return res.status(401).json({ error: "Token not found" })
    }

    const [, token] = authorization.split(" ")

    try {
      const { id } = jwt.verify(token, process.env.JWT_SECRET as string) as {
        id: string
      }

      const user = await userRepository.findOne({
        where: { id }
      })

      return res.json(user)
    } catch (error) {
      return res.status(401).json({ error: "Invalid token" })
    }
  }
}

export default new AuthController()
