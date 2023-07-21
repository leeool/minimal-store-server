import { Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import User from "./User"
import Product from "./Product"

@Entity("user_favorites")
class UserFavorite {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @OneToOne(() => User, (user) => user.id)
  userId: string

  @OneToMany(() => Product, (product) => product.id)
  productId: string
}

export default UserFavorite
