import { EntityRepository, Repository } from 'typeorm';
import Paciente from '../models/Paciente';

@EntityRepository(Paciente)
class PacienteRepository extends Repository<Paciente> {
  public async findByCpf(cpf: string) {
    const findCpf = await this.findOne({where: {cpf}})
    
    return findCpf
  }
}

export default PacienteRepository;