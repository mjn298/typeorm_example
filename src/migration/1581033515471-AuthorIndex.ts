import {MigrationInterface, QueryRunner} from "typeorm";

export class AuthorIndex1581033515471 implements MigrationInterface {
    name = 'AuthorIndex1581033515471'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE INDEX "IDX_c56120106977cc14f975726af0" ON "todo" ("authorId") `, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP INDEX "IDX_c56120106977cc14f975726af0"`, undefined);
    }

}
