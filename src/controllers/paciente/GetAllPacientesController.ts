import { Request, Response } from "express";
import { GetAllPacientesService } from "../../services/paciente/GetAllPacientesService";


export class GetAllPacientesController {
  async handle(request: Request, response: Response) {
    const service = new GetAllPacientesService();

    const pacientes = await service.execute();

    return response.json(pacientes);
  }
}