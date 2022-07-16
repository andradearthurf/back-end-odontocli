import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { v4 as uuidv4 } from "uuid";

@Entity('cidade')
class Cidade {
  @PrimaryGeneratedColumn('uuid')
  idCidade: string;

  @Column()
  nomeCidade: string;

  @Column()
  uf: string;

  constructor(){
    if (!this.idCidade){
      this.idCidade = uuidv4();
    }
  }
}

export default Cidade;
