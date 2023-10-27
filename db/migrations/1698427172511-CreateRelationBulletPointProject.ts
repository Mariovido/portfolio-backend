import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRelationBulletPointProject1698427172511
  implements MigrationInterface
{
  name = 'CreateRelationBulletPointProject1698427172511';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "bullet_point" ADD "projectId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "bullet_point" ADD CONSTRAINT "FK_f9cc83220bdbec824bcac22bec7" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "bullet_point" DROP CONSTRAINT "FK_f9cc83220bdbec824bcac22bec7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bullet_point" DROP COLUMN "projectId"`,
    );
  }
}
