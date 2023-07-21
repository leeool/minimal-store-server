import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

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
}

export default Product
