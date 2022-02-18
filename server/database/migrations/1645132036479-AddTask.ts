import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class AddTask1645132036479 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'task',
              columns: [
                {
                  name: 'taskID',
                  type: 'int',
                  isPrimary: true,
                  isGenerated: true,
                },
                {
                    name: 'timeEstimation',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'status',
                    type: 'int',
                    isNullable: false,
                },
                {
                  name: 'userId',
                  type: 'int',
                  isNullable: false,
                },
                {
                    name: 'title',
                    type: 'text',
                    isNullable: false,
                },
                {
                  name: 'description',
                  type: 'text',
                  isNullable: false,
                },
                {
                  name: 'projectId',
                  type: 'int',
                  isNullable: false,
                },
              ],
            }),
        );
        await queryRunner.createForeignKey(
            'task',
            new TableForeignKey({
              columnNames: ['userId'],
              referencedColumnNames: ['id'],
              referencedTableName: 'user',
              onDelete: 'CASCADE',
            }),
        );
        await queryRunner.createForeignKey(
            'task',
            new TableForeignKey({
              columnNames: ['projectId'],
              referencedColumnNames: ['id'],
              referencedTableName: 'project',
              onDelete: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('task');
    }

}
