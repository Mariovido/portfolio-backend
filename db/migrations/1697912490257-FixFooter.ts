import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixFooter1697912490257 implements MigrationInterface {
  name = 'FixFooter1697912490257';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "footer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid, CONSTRAINT "REL_62ca6310ac05e3db8a84f258f5" UNIQUE ("userId"), CONSTRAINT "PK_9eea7c25d14157b981b8feb29dc" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "paragraph" ADD "footerId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "footer" ADD CONSTRAINT "FK_62ca6310ac05e3db8a84f258f5c" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "paragraph" ADD CONSTRAINT "FK_a724fe1b78ede767a23cc319468" FOREIGN KEY ("footerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "paragraph" DROP CONSTRAINT "FK_a724fe1b78ede767a23cc319468"`,
    );
    await queryRunner.query(
      `ALTER TABLE "footer" DROP CONSTRAINT "FK_62ca6310ac05e3db8a84f258f5c"`,
    );
    await queryRunner.query(`ALTER TABLE "paragraph" DROP COLUMN "footerId"`);
    await queryRunner.query(`DROP TABLE "footer"`);
  }
}
