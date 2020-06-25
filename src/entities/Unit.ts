import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Dimension } from "./Dimension";
import { Firepower } from "./Firepower";

@Index("unit_pkey", ["id"], { unique: true })
@Entity("unit", { schema: "public" })
export class Unit {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "name", nullable: true, length: 50 })
  name: string | null;

  @Column("character varying", { name: "symbol", nullable: true, length: 50 })
  symbol: string | null;

  @OneToMany(() => Dimension, (dimension) => dimension.unit)
  dimensions: Dimension[];

  @OneToMany(() => Firepower, (firepower) => firepower.unit)
  firepowers: Firepower[];
}
