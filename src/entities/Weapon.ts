import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Vesselspecification } from "./Vesselspecification";
import { Firepower } from "./Firepower";
import { Weaponmode } from "./Weaponmode";
import { Weapontype } from "./Weapontype";

@Index("weapon_pkey", ["id"], { unique: true })
@Entity("weapon", { schema: "public" })
export class Weapon {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @OneToMany(
    () => Vesselspecification,
    (vesselspecification) => vesselspecification.weapon
  )
  vesselspecifications: Vesselspecification[];

  @ManyToOne(() => Firepower, (firepower) => firepower.weapons)
  @JoinColumn([{ name: "firepower_id", referencedColumnName: "id" }])
  firepower: Firepower;

  @ManyToOne(() => Weaponmode, (weaponmode) => weaponmode.weapons)
  @JoinColumn([{ name: "weapon_mode_id", referencedColumnName: "id" }])
  weaponMode: Weaponmode;

  @ManyToOne(() => Weapontype, (weapontype) => weapontype.weapons)
  @JoinColumn([{ name: "weapontype_id", referencedColumnName: "id" }])
  weapontype: Weapontype;
}
