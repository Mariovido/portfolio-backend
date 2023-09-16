import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1694768444541 implements MigrationInterface {
  name = 'InitialMigration1694768444541';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "education" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "courseName" character varying NOT NULL, "typeOfDegree" character varying NOT NULL, "institute" character varying NOT NULL, "startDate" TIMESTAMP WITH TIME ZONE NOT NULL, "endDate" TIMESTAMP WITH TIME ZONE, "grade" numeric(4,2), "userId" uuid, CONSTRAINT "PK_bf3d38701b3030a8ad634d43bd6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "technology" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "technologyName" character varying NOT NULL, "projectId" uuid, CONSTRAINT "PK_89f217a9ebf9b4bc1a0d74883ec" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "project" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "projectName" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "bullet_point" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "bulletPoint" character varying NOT NULL, "workExperienceId" uuid, "projectId" uuid, CONSTRAINT "PK_8c8813959e0091c09a1198153d8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "work_experience" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "role" character varying NOT NULL, "company" character varying NOT NULL, "startDate" TIMESTAMP WITH TIME ZONE NOT NULL, "endDate" TIMESTAMP WITH TIME ZONE, "userId" uuid, CONSTRAINT "PK_d4bef63ad6da7ec327515c121bd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "skill" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "skillName" character varying NOT NULL, "level" character varying NOT NULL, "rating" integer NOT NULL, "userId" uuid, CONSTRAINT "PK_a0d33334424e64fb78dc3ce7196" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "interest" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "interestName" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_6619d627e204e0596968653011f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "password" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "dateOfBirth" TIMESTAMP WITH TIME ZONE NOT NULL, "aboutMe" character varying, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "contact" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "linkedinUrl" character varying, "githubUrl" character varying, "userId" uuid, CONSTRAINT "UQ_eff09bb429f175523787f46003b" UNIQUE ("email"), CONSTRAINT "REL_e7e34fa8e409e9146f4729fd0c" UNIQUE ("userId"), CONSTRAINT "PK_2cbbe00f59ab6b3bb5b8d19f989" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "education" ADD CONSTRAINT "FK_723e67bde13b73c5404305feb14" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "technology" ADD CONSTRAINT "FK_628c31e73d59299052dbd573020" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "project" ADD CONSTRAINT "FK_7c4b0d3b77eaf26f8b4da879e63" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "bullet_point" ADD CONSTRAINT "FK_61da3bdbf14e42385905f2c0cda" FOREIGN KEY ("workExperienceId") REFERENCES "work_experience"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "bullet_point" ADD CONSTRAINT "FK_f9cc83220bdbec824bcac22bec7" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "work_experience" ADD CONSTRAINT "FK_2923da6483452c1005c44833db0" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "skill" ADD CONSTRAINT "FK_c08612011a88745a32784544b28" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "interest" ADD CONSTRAINT "FK_565b1666092f9c0f988183c78bd" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "contact" ADD CONSTRAINT "FK_e7e34fa8e409e9146f4729fd0cb" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "contact" DROP CONSTRAINT "FK_e7e34fa8e409e9146f4729fd0cb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "interest" DROP CONSTRAINT "FK_565b1666092f9c0f988183c78bd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "skill" DROP CONSTRAINT "FK_c08612011a88745a32784544b28"`,
    );
    await queryRunner.query(
      `ALTER TABLE "work_experience" DROP CONSTRAINT "FK_2923da6483452c1005c44833db0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bullet_point" DROP CONSTRAINT "FK_f9cc83220bdbec824bcac22bec7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bullet_point" DROP CONSTRAINT "FK_61da3bdbf14e42385905f2c0cda"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project" DROP CONSTRAINT "FK_7c4b0d3b77eaf26f8b4da879e63"`,
    );
    await queryRunner.query(
      `ALTER TABLE "technology" DROP CONSTRAINT "FK_628c31e73d59299052dbd573020"`,
    );
    await queryRunner.query(
      `ALTER TABLE "education" DROP CONSTRAINT "FK_723e67bde13b73c5404305feb14"`,
    );
    await queryRunner.query(`DROP TABLE "contact"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "interest"`);
    await queryRunner.query(`DROP TABLE "skill"`);
    await queryRunner.query(`DROP TABLE "work_experience"`);
    await queryRunner.query(`DROP TABLE "bullet_point"`);
    await queryRunner.query(`DROP TABLE "project"`);
    await queryRunner.query(`DROP TABLE "technology"`);
    await queryRunner.query(`DROP TABLE "education"`);
  }
}
