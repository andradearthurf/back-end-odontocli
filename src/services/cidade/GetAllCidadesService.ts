import { getRepository } from "typeorm";
import Cidade from "../../models/Cidade";


export class GetAllCidadesService {

  public async execute() {
    const repo = getRepository(Cidade);

    const cidades = await repo.find();

    return cidades;
  }
}
