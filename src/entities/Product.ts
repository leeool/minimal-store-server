import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm"
import User from "./User"
import Category from "./Category"
import CartItem from "./CartItem"

@Entity("products")
class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ type: "varchar", length: 255 })
  name: string

  @Column({ type: "text" })
  description: string

  @Column({ type: "text", array: true, nullable: true })
  images: string[]

  @Column({ type: "decimal" })
  price: number

  @ManyToMany(() => User, (user) => user.favorites)
  userFavorites: User[]

  @ManyToOne(() => Category, (category) => category.products)
  category: Category

  @OneToMany(() => CartItem, (cartItem) => cartItem.product)
  cartItem: CartItem
}

export default Product
