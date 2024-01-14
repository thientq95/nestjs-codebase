import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateNews1704969942393 implements MigrationInterface {
  name = 'CreateNews1704969942393';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "mes"."news" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "slug" character varying NOT NULL, "content" character varying NOT NULL, "published" boolean NOT NULL, "publish_at" TIMESTAMP, CONSTRAINT "UQ_d09152c44881b7620e12d6df099" UNIQUE ("slug"), CONSTRAINT "PK_39a43dfcb6007180f04aff2357e" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "mes"."news"`);
  }
}
