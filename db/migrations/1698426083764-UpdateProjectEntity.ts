import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateProjectEntity1698426083764 implements MigrationInterface {
  name = 'UpdateProjectEntity1698426083764';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "bullet_point" DROP CONSTRAINT "FK_f9cc83220bdbec824bcac22bec7"`,
    );
    await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "projectName"`);
    await queryRunner.query(
      `ALTER TABLE "bullet_point" DROP COLUMN "projectId"`,
    );
    await queryRunner.query(`ALTER TABLE "link" ADD "projectId" uuid`);
    await queryRunner.query(`ALTER TABLE "tag" ADD "projectId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "project" ADD "title" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "project" ADD "subtitle" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "project" ADD "projectLink" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "project" ADD "imageLink" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "project" ADD "date" TIMESTAMP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "project" ADD "isDisplayed" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "link" ADD CONSTRAINT "FK_6e67a324a44ab9d886bf717fab8" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tag" ADD CONSTRAINT "FK_5ed9c8937635b255539d31b2cce" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tag" DROP CONSTRAINT "FK_5ed9c8937635b255539d31b2cce"`,
    );
    await queryRunner.query(
      `ALTER TABLE "link" DROP CONSTRAINT "FK_6e67a324a44ab9d886bf717fab8"`,
    );
    await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "isDisplayed"`);
    await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "date"`);
    await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "imageLink"`);
    await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "projectLink"`);
    await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "subtitle"`);
    await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "title"`);
    await queryRunner.query(`ALTER TABLE "tag" DROP COLUMN "projectId"`);
    await queryRunner.query(`ALTER TABLE "link" DROP COLUMN "projectId"`);
    await queryRunner.query(`ALTER TABLE "bullet_point" ADD "projectId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "project" ADD "projectName" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "bullet_point" ADD CONSTRAINT "FK_f9cc83220bdbec824bcac22bec7" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
