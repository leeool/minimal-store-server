import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("products")
class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ type: "varchar", length: 255 })
  name: string

  @Column({ type: "text" })
  description: string

  @Column({ type: "text", array: true })
  images: string[]

  @Column({ type: "int" })
  price: number
}

export default Product
