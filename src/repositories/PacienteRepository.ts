import { EntityRepository, Repository } from 'typeorm';
import Paciente from '../models/Paciente';
import { cpf } from 'cpf-cnpj-validator';

@EntityRepository(Paciente)
class PacienteRepository extends Repository<Paciente> {
  public async findByCpf(cpf: string) {
    const findCpf = await this.findOne({where: {cpf}})
    
    return findCpf;
  }

  public async validatorOfCpf(cpfOfBody: string){
    const valid = cpf.isValid(cpfOfBody);

    return valid;
  }
}

export default PacienteRepository;