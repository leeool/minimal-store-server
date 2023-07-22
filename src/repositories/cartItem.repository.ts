import AppDataSource from "@dataSource"
import CartItem from "@entities/CartItem"

const cartItemRepository = AppDataSource.getRepository(CartItem)

export default cartItemRepository
