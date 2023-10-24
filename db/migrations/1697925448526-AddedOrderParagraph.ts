import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedOrderParagraph1697925448526 implements MigrationInterface {
  name = 'AddedOrderParagraph1697925448526';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "paragraph" ADD "order" integer NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "paragraph" DROP COLUMN "order"`);
  }
}
