import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Rank } from "./Rank";
import { Dialog } from "./Dialog";

@Index("character_pkey", ["id"], { unique: true })
@Entity("character", { schema: "public" })
export class Character {
    @PrimaryGeneratedColumn({ type: "integer", name: "id" })
    id: number;

    @Column("character varying", { name: "name", nullable: true, length: 100 })
    name: string | null;

    @Column("character varying", {
        name: "provenance",
        nullable: true,
        length: 100,
    })
    provenance: string | null;

    @Column("integer", { name: "race_id", nullable: true })
    raceId: number | null;

    @Column("integer", { name: "vessel_id", nullable: true })
    vesselId: number | null;

    @ManyToOne(() => Rank, (rank) => rank.characters)
    @JoinColumn([{ name: "rank_id", referencedColumnName: "id" }])
    rank: Rank;

    @OneToMany(() => Dialog, (dialog) => dialog.character)
    dialogs: Dialog[];

    constructor(character?: any) {
        if (character) {
            this.dialogs = character.dialogs;
            this.id = character.id;
            this.name = character.name;
            this.provenance = character.provenance;
            this.raceId = character.raceId;
            this.rank = character.rank;
            this.vesselId = character.vesselId;
        }
    }

}
