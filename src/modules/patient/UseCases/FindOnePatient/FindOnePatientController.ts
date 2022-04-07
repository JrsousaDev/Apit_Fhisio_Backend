import { Request, Response } from "express";
import { FindOnePatientService } from './FindOnePatientService'

class FindOnePatientController {
  async handle(request: Request, response: Response): Promise<Response> {

    const { data } = request.body;

    const {      
      responsibleEnterpriseUser,
      idPatient,
    } = data;

    const findOnePatientService = new FindOnePatientService();

    const patient = await findOnePatientService.execute({
      responsibleEnterpriseUser,
      idPatient,
    });

    return response.status(201).json(patient);
  }
}

  export { FindOnePatientController }