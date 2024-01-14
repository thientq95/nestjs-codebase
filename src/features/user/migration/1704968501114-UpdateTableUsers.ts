import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTableUsers1704968501114 implements MigrationInterface {
    name = 'UpdateTableUsers1704968501114'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mes"."users" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "mes"."users" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "mes"."users" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mes"."users" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "mes"."users" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "mes"."users" DROP COLUMN "created_at"`);
    }

}
