import { Router } from "express";
import { CreateCidadeController } from "../controllers/cidade/CreateCidadeController";
import { GetAllCidadesController } from "../controllers/cidade/GetAllCidadesController";

const cidadesRouter = Router();

cidadesRouter.post("/create", new CreateCidadeController().handle);

cidadesRouter.get("/list", new GetAllCidadesController().handle);

export { cidadesRouter }
