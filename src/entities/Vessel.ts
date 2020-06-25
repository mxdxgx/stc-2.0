import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("vessel_pkey", ["id"], { unique: true })
@Entity("vessel", { schema: "public" })
export class Vessel {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "name", nullable: true, length: 500 })
  name: string | null;

  @Column("character varying", {
    name: "registry",
    nullable: true,
    length: 2000,
  })
  registry: string | null;

  @Column("character varying", {
    name: "description",
    nullable: true,
    length: 5000,
  })
  description: string | null;

  @Column("character varying", {
    name: "ship_class",
    nullable: true,
    length: 5000,
  })
  shipClass: string | null;
}
