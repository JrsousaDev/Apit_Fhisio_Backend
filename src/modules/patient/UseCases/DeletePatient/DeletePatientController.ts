import { Request, Response } from "express";
import { DeletePatientService } from "./DeletePatientService";

class DeletePatientController {
  async handle(request: Request, response: Response): Promise<Response> {

    const { data } = request.body;

    const {      
      responsibleEnterpriseUser,
      email,
    } = data;

    const deletePatientService = new DeletePatientService();
    const patient = await deletePatientService.execute({
      responsibleEnterpriseUser,
      email
    });

    return response.status(201).json(patient);
  }
}

  export { DeletePatientController }