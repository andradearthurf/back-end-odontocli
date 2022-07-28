import { getCustomRepository } from "typeorm";
import AppError from "../errors/AppError";
import Paciente from "../models/Paciente";
import PacienteRepository from "../repositories/PacienteRepository";

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


class CreatePaciente {

  public async execute({     
    cpf,
    nomeCompleto,
    telefone,
    dtNascimento,
    numeroEndereco,
    logradouroEndereco ,
    cepEndereco,
    cidade, }: Request): Promise<Paciente> {
    const pacienteRepository = getCustomRepository(PacienteRepository);
    
    const findCpf = await pacienteRepository.findByCpf(cpf);
    if (findCpf){
      throw new AppError("Paciente já foi cadastrado!");
    }

    const paciente = pacienteRepository.create({
        cpf,
        nomeCompleto,
        telefone,
        dtNascimento,
        numeroEndereco,
        logradouroEndereco,
        cepEndereco,
        cidade
    });

    await pacienteRepository.save(paciente);

    return paciente;
  }
}

export default CreatePaciente;
