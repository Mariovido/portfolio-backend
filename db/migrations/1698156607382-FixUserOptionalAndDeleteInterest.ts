import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixUserOptionalAndDeleteInterest1698156607382
  implements MigrationInterface
{
  name = 'FixUserOptionalAndDeleteInterest1698156607382';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "paragraph" ALTER COLUMN "order" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "description" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "interest" DROP CONSTRAINT "FK_565b1666092f9c0f988183c78bd"`,
    );
    await queryRunner.query(`DROP TABLE "interest"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "description" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "paragraph" ALTER COLUMN "order" SET DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "interest" ADD CONSTRAINT "FK_565b1666092f9c0f988183c78bd" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `CREATE TABLE "interest" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "interestName" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_6619d627e204e0596968653011f" PRIMARY KEY ("id"))`,
    );
  }
}
