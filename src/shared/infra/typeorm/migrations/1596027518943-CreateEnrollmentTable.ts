import { MigrationInterface, QueryRunner, Table } from 'typeorm';

class CreateEnrollmentTable1596027518943 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'enrollments',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
            isPrimary: true,
          },
          {
            name: 'membershipId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'studentId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'startDate',
            type: 'date',
          },
          {
            name: 'endDate',
            type: 'date',
          },
          {
            name: 'total',
            type: 'decimal',
            isNullable: false,
            precision: 7,
            scale: 2,
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
            name: 'enrollmentStudent',
            columnNames: ['studentId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'students',
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
          {
            name: 'enrollmentMembership',
            columnNames: ['membershipId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'memberships',
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('enrollments');
  }
}

export default CreateEnrollmentTable1596027518943;
