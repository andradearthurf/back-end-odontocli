import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePaciente1658005905622 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: "paciente",
            columns: [
              {
                name: "cpf",
                type: "varchar",
                isPrimary: true,
              },
              {
                name: "nomeCompleto",
                type: "varchar",
              },
              {
                name: "telefone",
                type: "varchar",
              },
              {
                name: "dtNascimento",
                type: "varchar",
              },
              {
                name: "numeroEndereco",
                type: "integer",
              },
              {
                name: "logradouroEndereco",
                type: "varchar",
              },
              {
                name: "cepEndereco",
                type: "varchar"
              },
              {
                name: "cidade",
                type: "uuid",
              }
            ],
            foreignKeys: [
                {
                    name: "FKCidadePaciente",
                    referencedTableName: "cidade",
                    referencedColumnNames: ["idCidade"],
                    columnNames: ["cidade"],
                    onDelete: "SET NULL",
                    onUpdate: "SET NULL",
                }
            ]
          })
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("paciente");
      }

}
