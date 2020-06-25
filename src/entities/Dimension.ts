import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Unit } from "./Unit";
import { Vesselspecification } from "./Vesselspecification";

@Index("dimension_pkey", ["id"], { unique: true })
@Entity("dimension", { schema: "public" })
export class Dimension {
    @PrimaryGeneratedColumn({ type: "integer", name: "id" })
    id: number;

    @Column("double precision", { name: "length", nullable: true })
    length: number | null;

    @Column("double precision", { name: "width", nullable: true })
    width: number | null;

    @Column("double precision", { name: "height", nullable: true })
    height: number | null;

    @ManyToOne(() => Unit, (unit) => unit.dimensions)
    @JoinColumn([{ name: "unit_id", referencedColumnName: "id" }])
    unit: Unit;

    @OneToMany(
        () => Vesselspecification,
        (vesselspecification) => vesselspecification.dimension
    )
    vesselspecifications: Vesselspecification[];
}
