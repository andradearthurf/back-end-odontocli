import { Request, Response } from "express";
import AppError from "../../errors/AppError";
import { DeletePacienteService } from "../../services/paciente/DeletePacienteService";


export class DeletePacienteController {
  async handle(request: Request, response: Response) {
    const { cpf } = request.params;

    const service = new DeletePacienteService();

    const result = await service.execute(cpf);

    if (result instanceof AppError) {
      return response.status(400).json(result.message);
    }

    return response.status(204).end();
  }
}