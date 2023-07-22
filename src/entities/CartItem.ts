import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn
} from "typeorm"
import Product from "./Product"
import Cart from "./Cart"

@Entity("cart_items")
class CartItem {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @ManyToOne(() => Product, (product) => product.cartItem, { eager: true })
  @JoinColumn()
  product: Product

  @Column({ type: "int" })
  quantity: number

  @ManyToMany(() => Cart, (cart) => cart.cartItems, { cascade: true })
  @JoinTable()
  cart: Cart
}

export default CartItem
