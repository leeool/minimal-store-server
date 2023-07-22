import { NextFunction, Request, Response } from "express"

const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const message = err.statusCode
  //   ? err.message
  //   : "Algo deu errado, tente novamente mais tarde"

  console.log({
    message: err.message,
    method: req.method,
    path: req.path
  })

  return res
    .status(500)
    .json({
      error: "Algo deu errado, tente novamente mais tarde",
      description: err.message
    })
}

export default errorMiddleware
