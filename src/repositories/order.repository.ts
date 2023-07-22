import AppDataSource from "@dataSource"
import Order from "@entities/Order"

const orderRepository = AppDataSource.getRepository(Order)

export default orderRepository
