import { getCustomRepository } from "typeorm";
import AppError from "../../errors/AppError";
import Cidade from "../../models/Cidade";
import CidadeRepository from "../../repositories/CidadeRepository";

interface Request {
  nomeCidade: string;
  uf: string;
}

export class CreateCidadeService {

  public async execute({ nomeCidade, uf }: Request): Promise<Cidade> {
    const repo = getCustomRepository(CidadeRepository);
    
    const findNomeCidade = await repo.findByNomeCidade(nomeCidade)
    if (findNomeCidade){
      throw new AppError("Nome da cidade já existe!");
    }

    const cidade = repo.create({
      nomeCidade,
      uf: "ES",
    });

    await repo.save(cidade);

    return cidade;
  }
}
