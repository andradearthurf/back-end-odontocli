import { getCustomRepository } from "typeorm";
import AppError from "../../errors/AppError";
import Paciente from "../../models/Paciente";
import CidadeRepository from "../../repositories/CidadeRepository";
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

    const repoCidade = getCustomRepository(CidadeRepository);
    
    const findCpf = await repo.findByCpf(cpf);
    
    if (findCpf){
      throw new AppError("Este Cpf já foi cadastrado!");
    }

    const validCpf = await repo.validatorOfCpf(cpf);

    if (!validCpf) {
      throw new AppError("O Cpf inserido é inválido!");
    }

    const findIdCidade = await repoCidade.findByIdCidade(cidade);

    if (!findIdCidade){
      throw new AppError("Não existe uma cidade com este id!");
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

