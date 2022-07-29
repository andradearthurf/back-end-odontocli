import { Request, Response } from "express";
import { CountPacientesService } from "../../services/paciente/CountPacientesService";

export class CountPacientesController {
  async handle(request: Request, response: Response) {
    const service = new CountPacientesService();

    const count = await service.execute();

    return response.json(count);
  }
}