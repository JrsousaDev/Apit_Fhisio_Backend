import { Request, Response } from "express";
import { GetMatriculationService } from "./GetMatriculationService";

class GetMatriculationController {
  async handle(request: Request, response: Response): Promise<Response> {
  
    const { data } = request.body

    const { 
      responsibleEnterpriseUser,
    } = data;

    const getMatriculationService = new GetMatriculationService();

    const matriculation = await getMatriculationService.execute({
      responsibleEnterpriseUser,
    });

    return response.status(201).json(matriculation);
  }
}

  export { GetMatriculationController }