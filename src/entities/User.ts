import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from "typeorm"
import Product from "./Product"
import Cart from "./Cart"
import Order from "./Order"

@Entity("users")
class User {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ type: "varchar", length: 255 })
  name: string

  @Column({ type: "varchar", length: 255, unique: true })
  email: string

  @Column({ type: "char", unique: true, length: 11 })
  cpf: number

  @Column({ type: "text", select: false })
  password: string

  @Column({ type: "text", nullable: true })
  address: string

  @Column({ type: "char", length: 15, nullable: true, unique: true })
  phoneNumber: string

  @ManyToMany(() => Product, (product) => product.userFavorites, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  })
  @JoinTable()
  favorites: Product[]

  @OneToOne(() => Cart, (cart) => cart.user, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  })
  cart: Cart

  @OneToMany(() => Order, (order) => order.user)
  order: Order
}

export default User
