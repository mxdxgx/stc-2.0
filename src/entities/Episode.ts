import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Dialog } from "./Dialog";
import { Serie } from "./Serie";

@Index("episode_pkey", ["id"], { unique: true })
@Entity("episode", { schema: "public" })
export class Episode {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "title", nullable: true, length: 99999 })
  title: string | null;

  @Column("integer", { name: "episode_number", nullable: true })
  episodeNumber: number | null;

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

  @OneToMany(() => Dialog, (dialog) => dialog.episode)
  dialogs: Dialog[];

  @ManyToOne(() => Serie, (serie) => serie.episodes)
  @JoinColumn([{ name: "serie_id", referencedColumnName: "id" }])
  serie: Serie;
}
