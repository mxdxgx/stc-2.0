import { CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Serie')
export class Serie {

    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @CreateDateColumn({ type: 'timestamp with time zone' })
    startDate: Date;

    @CreateDateColumn({ type: 'timestamp with time zone' })
    endDate: Date;
}