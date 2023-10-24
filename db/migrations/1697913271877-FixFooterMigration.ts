import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixFooterMigration1697913271877 implements MigrationInterface {
  name = 'FixFooterMigration1697913271877';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "paragraph" DROP CONSTRAINT "FK_a724fe1b78ede767a23cc319468"`,
    );
    await queryRunner.query(
      `ALTER TABLE "paragraph" ADD CONSTRAINT "FK_a724fe1b78ede767a23cc319468" FOREIGN KEY ("footerId") REFERENCES "footer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "paragraph" DROP CONSTRAINT "FK_a724fe1b78ede767a23cc319468"`,
    );
    await queryRunner.query(
      `ALTER TABLE "paragraph" ADD CONSTRAINT "FK_a724fe1b78ede767a23cc319468" FOREIGN KEY ("footerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
