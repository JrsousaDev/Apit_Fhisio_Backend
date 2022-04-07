import { Request, Response } from "express";
import { CreatePatientService } from "./CreatePatientService";

class CreatePatientController {
  async handle(request: Request, response: Response): Promise<Response> {

    const { data } = request.body;

    const {      
      responsibleEnterpriseUser,
      name, 
      birthDate,
      gender, 
      password,
      responsibleName, 
      cpf, 
      customerPortal, 
      email, 
      addressName, 
      numberAndComplement, 
      street, 
      cityAndState,
      cep,
      phone,
      telephone,
      profession,
      heKnew,
      observation,
    } = data;

    const createPatientService = new CreatePatientService();

    const patient = await createPatientService.execute({
      responsibleEnterpriseUser,
      name, 
      birthDate,
      gender, 
      password,
      responsibleName, 
      cpf, 
      customerPortal, 
      email, 
      addressName, 
      numberAndComplement, 
      street, 
      cityAndState,
      cep,
      phone,
      telephone,
      profession,
      heKnew,
      observation,
      type_user: "PACIENTE"
    });

    return response.status(201).json(patient);
  }
}

  export { CreatePatientController }