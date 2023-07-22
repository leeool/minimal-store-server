import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import Product from "./Product"

@Entity("categories")
class Category {
  @PrimaryGeneratedColumn("identity")
  id: string

  @Column({ type: "varchar", length: 255 })
  name: string

  @OneToMany(() => Product, (product) => product.category)
  products: Product[]
}

export default Category
