import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("organization_pkey", ["id"], { unique: true })
@Entity("organization", { schema: "public" })
export class Organization {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "name", nullable: true, length: 50 })
  name: string | null;
}
