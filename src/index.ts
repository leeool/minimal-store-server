import AppDataSource from "@dataSource"
import errorMiddleware from "@middlewares/error.middleware"
import routes from "@routes"
import Express from "express"
import cors from "cors"
import "express-async-errors"

AppDataSource.initialize().then(() => {
  const app = Express()

  app.use(
    cors({
      origin: process.env.CLIENT_URL
      // credentials: true
    })
  )

  app.use(Express.json())
  app.use(Express.urlencoded({ extended: true }))
  app.use(routes)

  app.use(errorMiddleware)

  app.listen(3000, () => console.log("🔥 Server is running on port 3000"))
})
