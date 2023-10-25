import { MigrationInterface, QueryRunner } from 'typeorm';

export class DeleteTechnologyTable1698266226765 implements MigrationInterface {
  name = 'DeleteTechnologyTable1698266226765';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "technology" DROP CONSTRAINT "FK_628c31e73d59299052dbd573020"`,
    );
    await queryRunner.query(`DROP TABLE "technology"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "technology" ADD CONSTRAINT "FK_628c31e73d59299052dbd573020" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `CREATE TABLE "technology" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "technologyName" character varying NOT NULL, "projectId" uuid, CONSTRAINT "PK_89f217a9ebf9b4bc1a0d74883ec" PRIMARY KEY ("id"))`,
    );
  }
}
