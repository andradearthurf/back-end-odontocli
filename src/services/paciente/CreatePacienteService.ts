import { getCustomRepository } from "typeorm";
import AppError from "../../errors/AppError";
import Paciente from "../../models/Paciente";
import PacienteRepository from "../../repositories/PacienteRepository";


interface Request {
    cpf: string;
    nomeCompleto: string;
    telefone: string;
    dtNascimento: string;
    numeroEndereco: number;
    logradouroEndereco: string;
    cepEndereco: string;
    cidade: string;
}


export class CreatePacienteService {

  public async execute({     
    cpf,
    nomeCompleto,
    telefone,
    dtNascimento,
    numeroEndereco,
    logradouroEndereco ,
    cepEndereco,
    cidade, }: Request): Promise<Paciente> {
    const repo = getCustomRepository(PacienteRepository);
    
    const findCpf = await repo.findByCpf(cpf);
    
    if (findCpf){
      throw new AppError("Paciente já foi cadastrado!");
    }

    const paciente = repo.create({
        cpf,
        nomeCompleto,
        telefone,
        dtNascimento,
        numeroEndereco,
        logradouroEndereco,
        cepEndereco,
        cidade
    });

    await repo.save(paciente);

    return paciente;
  }
}

