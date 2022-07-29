import { getRepository } from "typeorm";
import Paciente from "../../models/Paciente";

export class CountPacientesService {

  public async execute() {
    const repo = getRepository(Paciente);

    const count = (await repo.find()).length;

    return count;
  }
}
