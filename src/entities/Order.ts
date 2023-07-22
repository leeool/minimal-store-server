import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn
} from "typeorm"
import Cart from "./Cart"
import User from "./User"

@Entity("orders")
class Order {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @ManyToOne(() => Cart, (cart) => cart.order, { eager: true })
  cart: Cart

  @ManyToOne(() => User, (user) => user.order, { eager: true })
  user: User

  @Column({ type: "decimal" })
  total: number

  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date
}

export default Order
