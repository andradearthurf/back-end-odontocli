import {
  Entity,
  Column,
  PrimaryColumn,
  JoinColumn,
  ManyToOne,
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

  @ManyToOne(() => Cidade, cidade => cidade.idCidade)
  @JoinColumn({name: "cidade"})
  cidade: string;
}

export default Paciente;
