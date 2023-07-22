import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

const auth = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ error: "Token not found" })
  }

  const [, token] = authorization.split(" ")

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string
    }

    res.locals.userId = decoded.id
    return next()
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" })
  }
}

export default auth
