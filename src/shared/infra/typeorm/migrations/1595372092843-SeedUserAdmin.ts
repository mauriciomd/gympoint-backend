import { MigrationInterface, QueryRunner } from 'typeorm';
import { hashSync } from 'bcryptjs';

class SeedUserAdmin1595372092843 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const password = hashSync('123456', 8);

    await queryRunner.query(
      `INSERT INTO users (name, email, password) VALUES ('Administrador', 'admin@gympoint.com', '${password}');`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM users WHERE email='admin@gympoint.com';`,
    );
  }
}

export default SeedUserAdmin1595372092843;
