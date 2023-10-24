import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateEntities1697909871985 implements MigrationInterface {
  name = 'UpdateEntities1697909871985';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "education" RENAME COLUMN "typeOfDegree" TO "instituteLink"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" RENAME COLUMN "aboutMe" TO "description"`,
    );
    await queryRunner.query(
      `CREATE TABLE "paragraph" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "paragraph" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_c4000792b02bf27771092e4e3c7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "link" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "tag" character varying, "name" character varying, "link" character varying NOT NULL, "target" character varying, "workExperienceId" uuid, "paragraphId" uuid, "contactId" uuid, CONSTRAINT "PK_26206fb7186da72fbb9eaa3fac9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tag" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "tag" character varying NOT NULL, "workExperienceId" uuid, CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "contact" DROP COLUMN "linkedinUrl"`);
    await queryRunner.query(`ALTER TABLE "contact" DROP COLUMN "githubUrl"`);
    await queryRunner.query(`ALTER TABLE "skill" DROP COLUMN "level"`);
    await queryRunner.query(
      `ALTER TABLE "work_experience" ADD "companyLink" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "description" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "paragraph" ADD CONSTRAINT "FK_0e684b3f73d8addf552513b75ac" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "link" ADD CONSTRAINT "FK_7567b2c1cdceae6c17c418bf2b7" FOREIGN KEY ("workExperienceId") REFERENCES "work_experience"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "link" ADD CONSTRAINT "FK_c0a64792df6d7aee4902d2c992c" FOREIGN KEY ("paragraphId") REFERENCES "paragraph"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "link" ADD CONSTRAINT "FK_607ff990e1080e786a4c0bf0575" FOREIGN KEY ("contactId") REFERENCES "contact"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tag" ADD CONSTRAINT "FK_7ff750d74efa230816c06a0abe9" FOREIGN KEY ("workExperienceId") REFERENCES "work_experience"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tag" DROP CONSTRAINT "FK_7ff750d74efa230816c06a0abe9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "link" DROP CONSTRAINT "FK_607ff990e1080e786a4c0bf0575"`,
    );
    await queryRunner.query(
      `ALTER TABLE "link" DROP CONSTRAINT "FK_c0a64792df6d7aee4902d2c992c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "link" DROP CONSTRAINT "FK_7567b2c1cdceae6c17c418bf2b7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "paragraph" DROP CONSTRAINT "FK_0e684b3f73d8addf552513b75ac"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "description" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "work_experience" DROP COLUMN "companyLink"`,
    );
    await queryRunner.query(
      `ALTER TABLE "skill" ADD "level" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "contact" ADD "githubUrl" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "contact" ADD "linkedinUrl" character varying`,
    );
    await queryRunner.query(`DROP TABLE "tag"`);
    await queryRunner.query(`DROP TABLE "link"`);
    await queryRunner.query(`DROP TABLE "paragraph"`);
    await queryRunner.query(
      `ALTER TABLE "user" RENAME COLUMN "description" TO "aboutMe"`,
    );
    await queryRunner.query(
      `ALTER TABLE "education" RENAME COLUMN "instituteLink" TO "typeOfDegree"`,
    );
  }
}
