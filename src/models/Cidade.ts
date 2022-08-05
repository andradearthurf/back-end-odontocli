import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

import { v4 as uuidv4 } from "uuid";
import Paciente from './Paciente';

@Entity('cidade')
class Cidade {
  @PrimaryGeneratedColumn('uuid')
  idCidade: string;

  @Column()
  nomeCidade: string;

  @Column()
  uf: string;

  @OneToMany(() => Paciente, paciente => paciente.cidade)
  // @JoinColumn({name: "cidade"})a
  cidade: Paciente[]

  constructor(){
    if (!this.idCidade){
      this.idCidade = uuidv4();
    }
  }
}

export default Cidade;
