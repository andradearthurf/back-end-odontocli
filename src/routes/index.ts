import { Router } from 'express';

import cidadesRouter from './cidades.routes';

const routes = Router();

routes.use('/cidade', cidadesRouter);

export default routes;
