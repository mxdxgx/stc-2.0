import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Dimension } from "./Dimension";
import { Speed } from "./Speed";
import { Weapon } from "./Weapon";

@Index("vesselspecification_pkey", ["id"], { unique: true })
@Entity("vesselspecification", { schema: "public" })
export class Vesselspecification {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "engine", nullable: true, length: 100 })
  engine: string | null;

  @ManyToOne(() => Dimension, (dimension) => dimension.vesselspecifications)
  @JoinColumn([{ name: "dimension_id", referencedColumnName: "id" }])
  dimension: Dimension;

  @ManyToOne(() => Speed, (speed) => speed.vesselspecifications)
  @JoinColumn([{ name: "max_speed_id", referencedColumnName: "id" }])
  maxSpeed: Speed;

  @ManyToOne(() => Weapon, (weapon) => weapon.vesselspecifications)
  @JoinColumn([{ name: "weapon_id", referencedColumnName: "id" }])
  weapon: Weapon;
}
