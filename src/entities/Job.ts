import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Rank } from "./Rank";

@Index("job_pkey", ["id"], { unique: true })
@Entity("job", { schema: "public" })
export class Job {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "name", nullable: true, length: 100 })
  name: string | null;

  @ManyToOne(() => Rank, (rank) => rank.jobs)
  @JoinColumn([{ name: "minimal_rank_id", referencedColumnName: "id" }])
  minimalRank: Rank;
}
