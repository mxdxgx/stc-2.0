import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Race } from "./Race";

@Index("planet_pkey", ["id"], { unique: true })
@Entity("planet", { schema: "public" })
export class Planet {
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

  @OneToMany(() => Race, (race) => race.planet)
  races: Race[];
}
