import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Serie } from "./Serie";

@Index("movie_pkey", ["id"], { unique: true })
@Entity("movie", { schema: "public" })
export class Movie {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "title", nullable: true, length: 100 })
  title: string | null;

  @Column("character varying", { name: "airdate", nullable: true, length: 100 })
  airdate: string | null;

  @Column("character varying", {
    name: "stardate",
    nullable: true,
    length: 100,
  })
  stardate: string | null;

  @Column("json", { name: "text", nullable: true })
  text: object | null;

  @ManyToOne(() => Serie, (serie) => serie.movies)
  @JoinColumn([{ name: "serie_id", referencedColumnName: "id" }])
  serie: Serie;
}
