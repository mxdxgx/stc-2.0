import { MigrationInterface, QueryRunner, getManager } from "typeorm";
import { SERIES } from "../../resources/jsonModels/series";
import { logger } from "../server/server";
import { Serie } from "../entities/Serie";
import { CHARACTERS } from "../../resources/jsonModels/characters";
import { Character } from "../entities/Character";

export class DatabaseInitializer implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        logger.info('inserting <Series>');

        const seriesCount: number = await getManager().getRepository('Serie').count();

        if (!seriesCount) {
            for (let serie of SERIES) {
                await getManager().save<Serie>(new Serie(serie));
            }
        }

        logger.info('Done <Serie>!');
        logger.info('inserting <Characters>');

        const ranksCount: number = await getManager().getRepository('Rank').count();

        if (!ranksCount) {
            for (let rank of RANKS) {
                await getManager().save<Rank>(new Rank(rank));
            }
        }
        logger.info('Done <Characters>!');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        for (let serie of SERIES) {
            await getManager().remove(serie);
        }
    }
}