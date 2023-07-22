import AppDataSource from "@dataSource"
import Category from "@entities/Category"

const categoryRepository = AppDataSource.getRepository(Category)

export default categoryRepository
