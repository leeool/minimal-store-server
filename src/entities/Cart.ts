import {
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from "typeorm"
import User from "./User"
import CartItem from "./CartItem"
import Order from "./Order"

@Entity("carts")
class Cart {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @OneToOne(() => User, (user) => user.cart, { eager: true })
  @JoinColumn()
  user: User

  @ManyToMany(() => CartItem, (cartItem) => cartItem.cart)
  cartItems: CartItem[]

  @OneToMany(() => Order, (order) => order.cart)
  order: Order
}

export default Cart
