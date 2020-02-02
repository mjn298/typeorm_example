import {MigrationInterface, QueryRunner} from "typeorm";

export class Index1580530558234 implements MigrationInterface {
    name = 'Index1580530558234'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE INDEX "IDX_a5c5e1185f575ea59cadcedce2" ON "todo" ("isComplete") `, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP INDEX "IDX_a5c5e1185f575ea59cadcedce2"`, undefined);
    }

}
