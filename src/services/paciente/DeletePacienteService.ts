import { getCustomRepository } from "typeorm";
import AppError from "../../errors/AppError";
import Paciente from "../../models/Paciente";
import PacienteRepository from "../../repositories/PacienteRepository";


export class DeletePacienteService{
  async execute(cpf: string): Promise<Paciente> {
    const repo = getCustomRepository(PacienteRepository);
    
    const paciente = await repo.findByCpf(cpf);

    if (!(paciente)){
      throw new AppError("Paciente não existe para ser deletado!");
    }

    await repo.delete(cpf);

    return paciente;
  }
}