import AppDataSource from "@dataSource"
import Product from "@entity/Product"

const productRepository = AppDataSource.getRepository(Product)

export default productRepository
