import { EntityRepository, Repository } from 'typeorm';
import Cidade from '../models/Cidade';

@EntityRepository(Cidade)
class CidadeRepository extends Repository<Cidade> {
  public async findByNomeCidade(nomeCidade: string) {
    const findNomeCidade = await this.findOne({where: {nomeCidade}})
    
    return findNomeCidade;
  }
  public async findByIdCidade(idCidade: string) {
    const findIdCidade = await this.findOne({where: {idCidade}})
    
    return findIdCidade;
  }
}

export default CidadeRepository;
