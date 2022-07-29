import { Router } from "express";
import { CountPacientesController } from "../controllers/paciente/CountPacientesController";
import { CreatePacienteController } from "../controllers/paciente/CreatePacienteController";
import { DeletePacienteController } from "../controllers/paciente/DeletePacienteController";
import { GetAllPacientesController } from "../controllers/paciente/GetAllPacientesController";

const pacientesRouter = Router();

pacientesRouter.post("/create", new CreatePacienteController().handle);

pacientesRouter.get("/list", new GetAllPacientesController().handle);

pacientesRouter.get("/count", new CountPacientesController().handle);

pacientesRouter.delete("/delete/:cpf", new DeletePacienteController().handle);

export { pacientesRouter }



// pacientesRouter.get('/count', async (request, response) => {
//   const pacienteRepository = getCustomRepository(PacienteRepository);

//   const qtdPacientes = (await pacienteRepository.find()).length;

//   return response.json(qtdPacientes);

// });


// export default pacientesRouter;