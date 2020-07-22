import { MigrationInterface, QueryRunner } from 'typeorm';

class SeedMemberships1595452038095 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "INSERT INTO memberships (title, duration, price) VALUES ('Start', 1, 129);",
    );
    await queryRunner.query(
      "INSERT INTO memberships (title, duration, price) VALUES ('Gold', 3, 109);",
    );
    await queryRunner.query(
      "INSERT INTO memberships (title, duration, price) VALUES ('Diamond', 6, 89);",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("DELETE FROM memberships WHERE title='Start';");
    await queryRunner.query("DELETE FROM memberships WHERE title='Gold';");
    await queryRunner.query("DELETE FROM memberships WHERE title='Diamond';");
  }
}

export default SeedMemberships1595452038095;
