import { EntityRepository, Repository } from 'typeorm';
import Cidade from '../models/Cidade';

@EntityRepository(Cidade)
class CidadeRepository extends Repository<Cidade> {
  public async findByNomeCidade(nomeCidade: string) {
    const findNomeCidade = await this.findOne({where: {nomeCidade}})
    
    return findNomeCidade;
  }
}

export default CidadeRepository;
