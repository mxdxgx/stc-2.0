import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("vesseltype_pkey", ["id"], { unique: true })
@Entity("vesseltype", { schema: "public" })
export class Vesseltype {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "name", nullable: true, length: 100 })
  name: string | null;
}
