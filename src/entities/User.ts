import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

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
}

export default User
