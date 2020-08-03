import { MigrationInterface, QueryRunner, Table } from 'typeorm';

class CreateHelpOrderTableTable1596390794483 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'helporders',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
            isPrimary: true,
          },
          {
            name: 'studentId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'question',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'answer',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'answeredAt',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'helpOrderStudents',
            columnNames: ['studentId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'students',
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('helpOrders');
  }
}

export default CreateHelpOrderTableTable1596390794483;
