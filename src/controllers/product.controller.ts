import categoryRepository from "@repositories/category.repository"
import productRepository from "@repositories/product.repository"
import { Request, Response } from "express"

class ProductController {
  async index(req: Request, res: Response) {
    const products = await productRepository.find()

    return res.json(products)
  }

  async show(req: Request, res: Response) {
    const { id } = req.params

    const product = await productRepository.findOne({
      where: { id },
      relations: { category: true }
    })

    return res.json(product)
  }

  async store(req: Request, res: Response) {
    const { name, description, images, price } = req.body

    const product = productRepository.create({
      name,
      description,
      images,
      price
    })

    await productRepository.save(product)

    return res.json(product)
  }

  async update(req: Request, res: Response) {
    const { id } = req.params
    const { name, description, images, price, categoryId } = req.body

    const product = await productRepository.findOneBy({ id })

    if (!product) {
      return res.status(400).json({ error: "Product not found" })
    }

    const category = await categoryRepository.findOneBy({ id: categoryId })

    const updatedProduct = productRepository.create({
      ...product,
      ...{
        name,
        description,
        images,
        price,
        category: category || product.category
      }
    })

    await productRepository.save(updatedProduct)

    return res.json(updatedProduct)
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params

    const product = await productRepository.findOneBy({ id })

    if (!product) {
      return res.status(400).json({ error: "Product not found" })
    }

    await productRepository.delete(product.id)

    return res.sendStatus(204)
  }
}

export default new ProductController()
