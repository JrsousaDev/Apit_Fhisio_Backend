import { Request, Response } from "express";
import { DeleteMatriculationService } from "./DeleteMatriculationService";

class DeleteMatriculationController {
  async handle(request: Request, response: Response): Promise<Response> {
  
    const { data } = request.body

    const { 
      responsibleEnterpriseUser,
      idMatriculation,
      emailPatient
    } = data;

    const deleteMatriculationService = new DeleteMatriculationService();

    const matriculation = await deleteMatriculationService.execute({
      responsibleEnterpriseUser,
      idMatriculation,
      emailPatient
    });

    return response.status(201).json(matriculation);
  }
}

  export { DeleteMatriculationController }