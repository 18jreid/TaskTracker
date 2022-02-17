import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class AddProject1645131828651 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'project',
              columns: [
                {
                  name: 'projectID',
                  type: 'int',
                  isPrimary: true,
                  isGenerated: true,
                },
                {
                  name: 'description',
                  type: 'text',
                  isNullable: false,
                },
                {
                  name: 'status',
                  type: 'int',
                  isNullable: false,
                  // default is incomplete -> 0
                  default: "0",
                },
                {
                  name: 'createdByUser',
                  type: 'int',
                  isNullable: false,
                },
                {
                  name: 'teamLead',
                  type: 'int',
                  isNullable: false,
                },
              ],
            }),
        );
        await queryRunner.createForeignKey(
            'project',
            new TableForeignKey({
              columnNames: ['createdByUser'],
              referencedColumnNames: ['id'],
              referencedTableName: 'user',
              onDelete: 'CASCADE',
            }),
        );
        await queryRunner.createForeignKey(
            'project',
            new TableForeignKey({
              columnNames: ['teamLead'],
              referencedColumnNames: ['id'],
              referencedTableName: 'user',
              onDelete: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('project');
    }

}
