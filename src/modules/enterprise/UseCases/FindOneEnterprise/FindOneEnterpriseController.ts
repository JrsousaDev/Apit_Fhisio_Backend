import { Request, Response } from "express";
import { FindOneEnterpriseService } from "./FindOneEnterpriseService";

class FindOneEnterpriseController {
  async handle(request: Request, response: Response): Promise<Response> {

    const { 
      enterpriseCNPJ
    } = request.body;

    const findOneEnterpriseService = new FindOneEnterpriseService();

    const enterprise = await findOneEnterpriseService.execute({
      enterpriseCNPJ
    });

    return response.status(201).json(enterprise);
  }
}

  export { FindOneEnterpriseController }