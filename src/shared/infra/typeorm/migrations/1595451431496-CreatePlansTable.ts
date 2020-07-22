import { MigrationInterface, QueryRunner, Table } from 'typeorm';

class CreatePlansTable1595451431496 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'memberships',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
            isPrimary: true,
          },
          {
            name: 'title',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'duration',
            type: 'integer',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'price',
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
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('memberships');
  }
}

export default CreatePlansTable1595451431496;
