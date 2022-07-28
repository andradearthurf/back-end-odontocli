import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCidade1658005857509 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: "cidade",
            columns: [
              {
                name: "idCidade",
                type: "uuid",
                isPrimary: true,
              },
              {
                name: "nomeCidade",
                type: "varchar",
              },
              {
                name: "uf",
                type: "varchar",
              },
            ],
          })
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("cidade");
      }

}
