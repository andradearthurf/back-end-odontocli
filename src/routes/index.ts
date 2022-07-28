import { Router } from 'express';

import cidadesRouter from './cidades.routes';
import pacientesRouter from './pacientes.routes';

const routes = Router();

routes.use('/cidade', cidadesRouter);
routes.use('/paciente', pacientesRouter);

export default routes;
