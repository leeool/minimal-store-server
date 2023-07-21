import AppDataSource from "@dataSource"
import UserFavorite from "@entities/UserFavorite"

const userRepository = AppDataSource.getRepository(UserFavorite)

export default userRepository
