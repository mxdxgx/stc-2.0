import { MigrationInterface, QueryRunner } from "typeorm";

export class movie1607994039320 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("ALTER TABLE MOVIE DROP COLUMN episode_number");
    await queryRunner.query("ALTER TABLE MOVIE DROP COLUMN serie_id");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
