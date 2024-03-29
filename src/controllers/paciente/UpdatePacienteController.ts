import { Request, Response } from "express";
import AppError from "../../errors/AppError";
import { UpdatePacienteService } from "../../services/paciente/UpdatePacienteService";
import * as yup from "yup";


export class UpdatePacienteController {
  async handle(request: Request, response: Response) {
    const { cpf } = request.params;

    const {
      nomeCompleto,
      telefone,
      dtNascimento,
      numeroEndereco,
      logradouroEndereco,
      cepEndereco,
      cidade } = request.body;

    const dateRegex = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;

    const nameRegex = /^[A-ZÀ-Ÿ][A-zÀ-ÿ']+\s([A-zÀ-ÿ']\s?)*[A-ZÀ-Ÿ][A-zÀ-ÿ']+$/;

    const schema = yup.object().shape({
      nomeCompleto: yup.string().required("O nome do paciente é obrigatório!").matches(nameRegex, "Formato do nome inválido!"),
      telefone: yup.string().required("O telefone é obrigatório!").matches(/^[0-9]+$/, "O telefone aceita apenas números!").max(12, "O telefone tem 12 números!").min(12, "O telefone tem 12 números!"),
      dtNascimento: yup.string().required("A data de nascimento é obrigatória!").matches(dateRegex, "O formato deve ser dd/mm/yyyy!"),
      numeroEndereco: yup.string().required("O número de endereço é obrigatório!").matches(/^[0-9]+$/, "O número de endereço aceita apenas números!"),
      logradouroEndereco: yup.string().required("O logradouro é obrigatório!"),
      cepEndereco: yup.string().required("O cep é obrigatório!").matches(/^([0-9]{5})\-([0-9]{3})$/, "O formato do cep deve ser nnnnn-nnn!"),
      cidade: yup.string().required("A cidade é obrigatória!"),
    });

    await schema.validate(request.body);


    const service = new UpdatePacienteService();

    const result = await service.execute({
      cpf,
      nomeCompleto,
      telefone,
      dtNascimento,
      numeroEndereco,
      logradouroEndereco,
      cepEndereco,
      cidade
    });

    if (result instanceof AppError) {
      return response.status(400).json(result.message);
    }

    return response.json(result);
  }
}