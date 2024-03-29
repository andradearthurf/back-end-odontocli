import { getCustomRepository } from "typeorm";
import AppError from "../../errors/AppError";
import PacienteRepository from "../../repositories/PacienteRepository";
import CidadeRepository from "../../repositories/CidadeRepository";

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

export class UpdatePacienteService {
  async execute({
    cpf,
    nomeCompleto,
    telefone,
    dtNascimento,
    numeroEndereco,
    logradouroEndereco,
    cepEndereco,
    cidade,}: Request) {
    const repo = getCustomRepository(PacienteRepository);

    const repoCidade = getCustomRepository(CidadeRepository);

    const updatePaciente = await repo.findByCpf(cpf);
    
    if (!updatePaciente){
      throw new AppError("Paciente não existe para ser atualizado!");
    }

    const findIdCidade = await repoCidade.findByIdCidade(cidade);

    if (!findIdCidade){
      throw new AppError("Não existe uma cidade com este id!");
    }

    updatePaciente.cpf = updatePaciente.cpf;
    updatePaciente.nomeCompleto = nomeCompleto ? nomeCompleto : updatePaciente.nomeCompleto;
    updatePaciente.telefone = telefone ? telefone : updatePaciente.telefone;
    updatePaciente.dtNascimento = dtNascimento ? dtNascimento : updatePaciente.dtNascimento;
    updatePaciente.numeroEndereco = numeroEndereco ? numeroEndereco : updatePaciente.numeroEndereco;
    updatePaciente.logradouroEndereco = logradouroEndereco ? logradouroEndereco : updatePaciente.logradouroEndereco;
    updatePaciente.cepEndereco = cepEndereco ? cepEndereco : updatePaciente.cepEndereco;
    updatePaciente.cidade = cidade ? cidade : updatePaciente.cidade;

    await repo.save(updatePaciente);

    return updatePaciente;
  }
}