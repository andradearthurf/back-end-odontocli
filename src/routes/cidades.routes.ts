import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import CidadeRepository from '../repositories/CidadeRepository';
import CreateCidade from '../services/CreateCidade';

const cidadesRouter = Router();

cidadesRouter.post('/create', async (request, response) => {
  const { nomeCidade } = request.body;

  const createCidade = new CreateCidade();

  const cidade = await createCidade.execute({
    nomeCidade,
    uf: "ES",
  });

  return response.json(cidade);
});

cidadesRouter.get('/list', async (request, response) => {
  const cidadeRepository = getCustomRepository(CidadeRepository);

  const cidades = await cidadeRepository.find();

  return response.json(cidades);

});

export default cidadesRouter;