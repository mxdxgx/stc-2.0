import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Planet } from "./Planet";

@Index("race_pkey", ["id"], { unique: true })
@Entity("race", { schema: "public" })
export class Race {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "name", nullable: true, length: 50 })
  name: string | null;

  @Column("character varying", {
    name: "description",
    nullable: true,
    length: 5000,
  })
  description: string | null;

  @ManyToOne(() => Planet, (planet) => planet.races)
  @JoinColumn([{ name: "planet_id", referencedColumnName: "id" }])
  planet: Planet;
}
