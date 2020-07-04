import {
    Column,
    Entity,
    Index,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Episode } from "./Episode";
import { Movie } from "./Movie";
import { logger } from "../server/server";

@Index("serie_pkey", ["id"], { unique: true })
@Index("serie_name_key", ["name"], { unique: true })
@Entity("serie", { schema: "public" })
export class Serie {
    @PrimaryGeneratedColumn({ type: "integer", name: "id" })
    id: number;

    @Column("character varying", {
        name: "name",
        nullable: true,
        unique: true,
        length: 50,
    })
    name: string | null;

    @Column("integer", { name: "start_year", nullable: true })
    startYear: number | null;

    @Column("integer", { name: "end_year", nullable: true })
    endYear: number | null;

    @Column("character varying", { name: "acronym", nullable: true, length: 5 })
    acronym: string | null;

    @OneToMany(() => Episode, (episode) => episode.serie)
    episodes: Episode[];

    @OneToMany(() => Movie, (movie) => movie.serie)
    movies: Movie[];

    // copy constructor
    constructor(serie?: any) {
        if (serie) {
            console.log(serie.start_year)
            this.acronym = serie.acronym;
            this.episodes = serie.episodes;
            this.endYear = serie.endYear;
            this.movies = serie.movies;
            this.name = serie.name;
            this.startYear = serie.startYear;
            this.id = serie.id;
        }
    }

}
