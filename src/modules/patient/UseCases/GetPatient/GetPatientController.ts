import { Request, Response } from "express";
import { GetPatientService } from "./GetPatientService";

class GetPatientController {
  async handle(request: Request, response: Response): Promise<Response> {

    const { data } = request.body;

    const {      
      responsibleEnterpriseUser,
    } = data;

    const getPatientService = new GetPatientService();

    const patient = await getPatientService.execute({
      responsibleEnterpriseUser,
    });

    return response.status(201).json(patient);
  }
}

  export { GetPatientController }