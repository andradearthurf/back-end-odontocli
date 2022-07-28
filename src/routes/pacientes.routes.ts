import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import PacienteRepository from '../repositories/PacienteRepository';
import CreatePaciente from '../services/CreatePaciente';
import * as yup from 'yup';

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

    const dateRegex = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;

    let schema = yup.object().shape({
      cpf: yup.string().required("O cpf é obrigatório!").max(11, "A quantidade de números é onze!").min(11, "A quantidade de números é onze!").matches(/^[0-9]+$/, "O cpf aceita apenas números!"),
      nomeCompleto: yup.string().required("O nome do paciente é obrigatório!").matches(/^[aA-zZ\s]+$/, "O nome do paciente deve conter apenas letras!"),
      telefone: yup.string().required("O telefone é obrigatório!").matches(/^[0-9]+$/, "O telefone aceita apenas números!").max(12, "A quantidade de números do telefone é 12!").min(12, "A quantidade de números do telefone é 12!"),
      dtNascimento: yup.string().required("A data de nascimento é obrigatória!").matches(dateRegex, "O formato deve ser dd/mm/yyyy!"),
      numeroEndereco: yup.string().required("O número de endereço é obrigatório!").matches(/^[0-9]+$/, "O número de endereço aceita apenas números!"),
      logradouroEndereco: yup.string().required("O logradouro é obrigatório!"),
    });

    await schema.validate(request.body);

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