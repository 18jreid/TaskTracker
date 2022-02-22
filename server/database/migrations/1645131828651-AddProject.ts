import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class AddProject1645131828651 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'project',
              columns: [
                {
                  name: 'id',
                  type: 'int',
                  isPrimary: true,
                  isGenerated: true,
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
                  name: 'status',
                  type: 'int',
                  isNullable: false,
                  // default is incomplete -> 0
                  default: "0",
                },
                {
                  name: 'createdByUserId',
                  type: 'int',
                  isNullable: false,
                },
                {
                  name: 'teamLeadId',
                  type: 'int',
                  isNullable: false,
                },
              ],
            }),
        );
        await queryRunner.createForeignKey(
            'project',
            new TableForeignKey({
              columnNames: ['createdByUserId'],
              referencedColumnNames: ['id'],
              referencedTableName: 'user',
              onDelete: 'CASCADE',
            }),
        );
        await queryRunner.createForeignKey(
            'project',
            new TableForeignKey({
              columnNames: ['teamLeadId'],
              referencedColumnNames: ['id'],
              referencedTableName: 'user',
              onDelete: 'CASCADE',
            }),
        );
        await queryRunner.createTable(
            new Table({
              name: 'project_users_user',
              columns: [
                {
                  name: 'id',
                  type: 'int',
                  isPrimary: true,
                  isGenerated: true,
                },
                {
                  name: 'projectId',
                  type: 'int',
                  isNullable: false,
                },
                {
                  name: 'userId',
                  type: 'int',
                  isNullable: false,
                },
              ],
            }),
        );
          await queryRunner.createForeignKey(
            'project_users_user',
            new TableForeignKey({
              columnNames: ['userId'],
              referencedColumnNames: ['id'],
              referencedTableName: 'user',
              onDelete: 'CASCADE',
            }),
        );
      
          await queryRunner.createForeignKey(
            'project_users_user',
            new TableForeignKey({
              columnNames: ['projectId'],
              referencedColumnNames: ['id'],
              referencedTableName: 'project',
              onDelete: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('project');
    }

}
