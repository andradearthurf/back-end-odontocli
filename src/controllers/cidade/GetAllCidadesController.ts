import { Request, Response } from "express";
import { GetAllCidadesService } from "../../services/cidade/GetAllCidadesService";


export class GetAllCidadesController {
  async handle(request: Request, response: Response) {
    const service = new GetAllCidadesService();

    const cidades = await service.execute();

    return response.json(cidades);
  }
}