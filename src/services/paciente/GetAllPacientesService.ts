import { getRepository } from "typeorm";
import Paciente from "../../models/Paciente";

export class GetAllPacientesService {

  public async execute() {
    const repo = getRepository(Paciente);

    const pacientes = await repo.find();

    return pacientes;
  }
}
