import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Weapon } from "./Weapon";

@Index("weapontype_pkey", ["id"], { unique: true })
@Entity("weapontype", { schema: "public" })
export class Weapontype {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "name", nullable: true, length: 100 })
  name: string | null;

  @OneToMany(() => Weapon, (weapon) => weapon.weapontype)
  weapons: Weapon[];
}
