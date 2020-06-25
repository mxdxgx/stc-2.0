import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Character } from "./Character";
import { Job } from "./Job";

@Index("rank_pkey", ["id"], { unique: true })
@Index("rank_name_key", ["name"], { unique: true })
@Entity("rank", { schema: "public" })
export class Rank {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", {
    name: "name",
    nullable: true,
    unique: true,
    length: 50,
  })
  name: string | null;

  @OneToMany(() => Character, (character) => character.rank)
  characters: Character[];

  @OneToMany(() => Job, (job) => job.minimalRank)
  jobs: Job[];
}
