import { MigrationInterface, QueryRunner } from "typeorm";

export class NewsUpdateColumn1705031568705 implements MigrationInterface {
    name = 'NewsUpdateColumn1705031568705'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mes"."news" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "mes"."news" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "mes"."news" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "mes"."news" ADD "created_by" integer`);
        await queryRunner.query(`ALTER TABLE "mes"."news" ADD "updated_by" integer`);
        await queryRunner.query(`ALTER TABLE "mes"."news" ADD "is_deleted" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mes"."news" DROP COLUMN "is_deleted"`);
        await queryRunner.query(`ALTER TABLE "mes"."news" DROP COLUMN "updated_by"`);
        await queryRunner.query(`ALTER TABLE "mes"."news" DROP COLUMN "created_by"`);
        await queryRunner.query(`ALTER TABLE "mes"."news" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "mes"."news" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "mes"."news" DROP COLUMN "created_at"`);
    }

}
