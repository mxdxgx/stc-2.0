import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Weapon } from "./Weapon";

@Index("weaponmode_pkey", ["id"], { unique: true })
@Entity("weaponmode", { schema: "public" })
export class Weaponmode {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "name", nullable: true, length: 100 })
  name: string | null;

  @OneToMany(() => Weapon, (weapon) => weapon.weaponMode)
  weapons: Weapon[];
}
