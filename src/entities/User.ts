import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("users")
class User {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ type: "varchar", length: 255 })
  name: string

  @Column({ type: "varchar", length: 255 })
  email: string

  @Column({ type: "int" })
  cpf: number

  @Column({ type: "text", select: false })
  password: string

  @Column({ type: "text" })
  address: string

  @Column({ type: "char", length: 15 })
  phoneNumber: string
}

export default User
