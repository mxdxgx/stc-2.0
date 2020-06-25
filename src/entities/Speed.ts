import {
    Column,
    Entity,
    Index,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Vesselspecification } from "./Vesselspecification";

@Index("speed_pkey", ["id"], { unique: true })
@Entity("speed", { schema: "public" })
export class Speed {
    @PrimaryGeneratedColumn({ type: "integer", name: "id" })
    id: number;

    @Column("character varying", { name: "name", nullable: true, length: 100 })
    name: string | null;

    @Column("double precision", { name: "warp", nullable: true })
    warp: number | null;

    @OneToMany(
        () => Vesselspecification,
        (vesselspecification) => vesselspecification.maxSpeed
    )
    vesselspecifications: Vesselspecification[];
}
