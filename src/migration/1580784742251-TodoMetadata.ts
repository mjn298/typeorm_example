import {MigrationInterface, QueryRunner} from "typeorm";

export class TodoMetadata1580784742251 implements MigrationInterface {
    name = 'TodoMetadata1580784742251'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "todo_metadata" ("id" SERIAL NOT NULL, "comment" character varying NOT NULL, CONSTRAINT "PK_471eb57e34fb899c416da7db939" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "todo" ADD "metadataId" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "todo" ADD CONSTRAINT "UQ_d1f431fd7974ef1af9318304fa2" UNIQUE ("metadataId")`, undefined);
        await queryRunner.query(`ALTER TABLE "todo" ADD CONSTRAINT "FK_d1f431fd7974ef1af9318304fa2" FOREIGN KEY ("metadataId") REFERENCES "todo_metadata"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "todo" DROP CONSTRAINT "FK_d1f431fd7974ef1af9318304fa2"`, undefined);
        await queryRunner.query(`ALTER TABLE "todo" DROP CONSTRAINT "UQ_d1f431fd7974ef1af9318304fa2"`, undefined);
        await queryRunner.query(`ALTER TABLE "todo" DROP COLUMN "metadataId"`, undefined);
        await queryRunner.query(`DROP TABLE "todo_metadata"`, undefined);
    }

}
