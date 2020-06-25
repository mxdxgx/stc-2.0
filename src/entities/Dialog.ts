import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Character } from "./Character";
import { Episode } from "./Episode";

@Index("dialog_pkey", ["id"], { unique: true })
@Entity("dialog", { schema: "public" })
export class Dialog {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", {
    name: "sentiment",
    nullable: true,
    length: 50,
  })
  sentiment: string | null;

  @Column("character varying", { name: "text", nullable: true, length: 1000 })
  text: string | null;

  @ManyToOne(() => Character, (character) => character.dialogs)
  @JoinColumn([{ name: "character_id", referencedColumnName: "id" }])
  character: Character;

  @ManyToOne(() => Episode, (episode) => episode.dialogs)
  @JoinColumn([{ name: "episode_id", referencedColumnName: "id" }])
  episode: Episode;
}
