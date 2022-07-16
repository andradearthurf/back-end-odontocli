import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePaciente1658005905622 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: "paciente",
            columns: [
              {
                name: "cpf",
                type: "varchar(11)",
                isPrimary: true,
              },
              {
                name: "nomeCompleto",
                type: "varchar(45)",
              },
              {
                name: "telefone",
                type: "varchar(20)",
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
                type: "varchar(45)",
              },
              {
                name: "cepEndereco",
                type: "char(8)"
              },
              {
                name: "idCidade",
                type: "uuid",
              }
            ],
            foreignKeys: [
                {
                    name: "FKCidadePaciente",
                    referencedTableName: "cidade",
                    referencedColumnNames: ["idCidade"],
                    columnNames: ["idCidade"],
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
