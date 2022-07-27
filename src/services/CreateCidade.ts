import { getCustomRepository } from "typeorm";
import AppError from "../errors/AppError";
import Cidade from "../models/Cidade";
import CidadeRepository from "../repositories/CidadeRepository";

interface Request {
  nomeCidade: string;
  uf: string;
}

class CreateCidade {

  public async execute({ nomeCidade, uf }: Request): Promise<Cidade> {
    const cidadeRepository = getCustomRepository(CidadeRepository);
    
    const findNomeCidade = await cidadeRepository.findByNomeCidade(nomeCidade);
    if (findNomeCidade){
      throw new AppError("Nome da cidade já existe!");
    }

    const cidade = cidadeRepository.create({
      nomeCidade,
      uf: "ES",
    });

    await cidadeRepository.save(cidade);

    return cidade;
  }
}

export default CreateCidade;
