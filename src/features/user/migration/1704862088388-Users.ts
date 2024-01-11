import { MigrationInterface, QueryRunner } from 'typeorm';

export class Users1704862088388 implements MigrationInterface {
  name = 'Users1704862088388';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "mes"."users" (
        "id" SERIAL NOT NULL, 
        "sso" character varying(20) NOT NULL,
        "name" character varying(255) NOT NULL, 
        "job_name" character varying(255) NOT NULL, 
        "email" character varying NOT NULL, "password" character varying NOT NULL, 
        "created_by" integer, 
        "updated_by" integer, 
        "is_deleted" boolean NOT NULL DEFAULT false, 
        CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "mes"."users"`);
  }
}
