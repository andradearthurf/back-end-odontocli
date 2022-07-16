import {
  Entity,
  Column,
  PrimaryColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import Cidade from './Cidade';


@Entity('paciente')
class Paciente {
  @PrimaryColumn()
  cpf: string;

  @Column()
  nomeCompleto: string;

  @Column()
  telefone: string;

  @Column()
  dtNascimento: string;

  @Column()
  numeroEndereco: number;

  @Column()
  logradouroEndereco: string;

  @Column()
  cepEndereco: string;

  @OneToMany(() => Cidade, cidade => cidade.idCidade)
  @JoinColumn({name: "idCidade"})
  idCidade: Cidade
}

export default Paciente;
