import { NextFunction, Request, Response } from "express"

const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  const { userId } = res.locals
  const { id } = req.params

  if (userId !== id) {
    return res.status(401).json({ error: "User not authorized" })
  }

  return next()
}

export default verifyUser
