import AppDataSource from "@dataSource"
import Express from "express"
import "express-async-errors"

AppDataSource.initialize().then(() => {
  const app = Express()

  app.use(Express.json())
  app.use(Express.urlencoded({ extended: true }))
  app.get("/", (_, res) => res.send("Hello World!"))

  app.listen(3000, () => console.log("🔥 Server is running on port 3000"))
})
