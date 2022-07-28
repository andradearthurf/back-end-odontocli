import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import PacienteRepository from '../repositories/PacienteRepository';
import CreatePaciente from '../services/CreatePaciente';

const pacientesRouter = Router();

pacientesRouter.post('/create', async (request, response) => {
  const { 
    cpf,
    nomeCompleto,
    telefone,
    dtNascimento,
    numeroEndereco,
    logradouroEndereco,
    cepEndereco,
    cidade } = request.body;

  const createPaciente = new CreatePaciente();

  const paciente = await createPaciente.execute({
    cpf,
    nomeCompleto,
    telefone,
    dtNascimento,
    numeroEndereco,
    logradouroEndereco,
    cepEndereco,
    cidade
  });

  return response.json(paciente);
});

pacientesRouter.get('/list', async (request, response) => {
  const pacienteRepository = getCustomRepository(PacienteRepository);

  const pacientes = await pacienteRepository.find();

  return response.json(pacientes);

});

export default pacientesRouter;