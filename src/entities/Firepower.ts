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
import { Weapon } from "./Weapon";

@Index("firepower_pkey", ["id"], { unique: true })
@Entity("firepower", { schema: "public" })
export class Firepower {
    @PrimaryGeneratedColumn({ type: "integer", name: "id" })
    id: number;

    @Column("double precision", {
        name: "quantity",
        nullable: true
    })
    quantity: number | null;

    @ManyToOne(() => Unit, (unit) => unit.firepowers)
    @JoinColumn([{ name: "unit_id", referencedColumnName: "id" }])
    unit: Unit;

    @OneToMany(() => Weapon, (weapon) => weapon.firepower)
    weapons: Weapon[];
}
