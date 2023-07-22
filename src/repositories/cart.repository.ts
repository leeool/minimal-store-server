import AppDataSource from "@dataSource"
import Cart from "@entities/Cart"

const cartRepository = AppDataSource.getRepository(Cart)

export default cartRepository
