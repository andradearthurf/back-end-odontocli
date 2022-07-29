import { Request, Response } from "express";
import AppError from "../../errors/AppError";
import { CreateCidadeService } from "../../services/cidade/CreateCidadeService";


export class CreateCidadeController {
  async handle(request: Request, response: Response) {
    const { nomeCidade } = request.body;

    const service = new CreateCidadeService();

    const result = await service.execute({nomeCidade, uf: "ES"});

    if (result instanceof AppError){
      return response.status(400).json(result.message);
    }

    return response.json(result);
  }
}