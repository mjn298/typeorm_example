import {MigrationInterface, QueryRunner} from "typeorm";

export class Author1580926222439 implements MigrationInterface {
    name = 'Author1580926222439'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "author" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_5a0e79799d372fe56f2f3fa6871" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "todo" ADD "authorId" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "todo" ADD CONSTRAINT "FK_c56120106977cc14f975726af07" FOREIGN KEY ("authorId") REFERENCES "author"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "todo" DROP CONSTRAINT "FK_c56120106977cc14f975726af07"`, undefined);
        await queryRunner.query(`ALTER TABLE "todo" DROP COLUMN "authorId"`, undefined);
        await queryRunner.query(`DROP TABLE "author"`, undefined);
    }

}
