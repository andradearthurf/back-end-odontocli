import { Router } from "express";
import { CountPacientesController } from "../controllers/paciente/CountPacientesController";
import { CreatePacienteController } from "../controllers/paciente/CreatePacienteController";
import { DeletePacienteController } from "../controllers/paciente/DeletePacienteController";
import { GetAllPacientesController } from "../controllers/paciente/GetAllPacientesController";
import { UpdatePacienteController } from "../controllers/paciente/UpdatePacienteController";

const pacientesRouter = Router();

pacientesRouter.post("/create", new CreatePacienteController().handle);
pacientesRouter.get("/list", new GetAllPacientesController().handle);
pacientesRouter.get("/count", new CountPacientesController().handle);
pacientesRouter.delete("/delete/:cpf", new DeletePacienteController().handle);
pacientesRouter.put("/update/:cpf",  new UpdatePacienteController().handle);

export { pacientesRouter }
