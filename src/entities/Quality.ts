import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("quality_pkey", ["id"], { unique: true })
@Index("quality_name_key", ["name"], { unique: true })
@Entity("quality", { schema: "public" })
export class Quality {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", {
    name: "name",
    nullable: true,
    unique: true,
    length: 50,
  })
  name: string | null;

  @Column("character varying", {
    name: "definition",
    nullable: true,
    length: 500,
  })
  definition: string | null;
}
