import { MigrationInterface, QueryRunner } from "typeorm";
import { SERIES } from "../../resources/jsonModels/series";

export class InitialData_1593226608033 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        for (const serie of SERIES) {
            queryRunner.connection.getRepository('Serie').create(serie);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        for (const serie of SERIES) {
            queryRunner.connection.getRepository('Serie').delete(serie);
        }
    }
}
