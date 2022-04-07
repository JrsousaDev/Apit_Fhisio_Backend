import { Request, Response } from "express";
import { CreateEnterpriseService } from "./CreateEnterpriseService";

class CreateEnterpriseController {
  async handle(request: Request, response: Response): Promise<Response> {

    const { data } = request.body;

    const { 
      id,
      defaultEmail,
      enterpriseResponsibleName,
      enterpriseRegMunicipal,
      enterpriseName,
      enterprisePhone,
      enterpriseEmail,
      enterpriseCNPJ,
      enterpriseState,
      enterpriseCity,
      enterpriseCep,
      enterpriseAddressNumber,
      enterpriseAddressName,
      enterpriseStreet,
      enterpriseCountry 
    } = data  

    const createEnterpriseService = new CreateEnterpriseService();

    const enterprise = await createEnterpriseService.execute({
      id,
      defaultEmail,
      enterpriseResponsibleName,
      enterpriseRegMunicipal,
      enterpriseName,
      enterprisePhone,
      enterpriseEmail,
      enterpriseCNPJ,
      enterpriseState,
      enterpriseCity,
      enterpriseCep,
      enterpriseAddressNumber,
      enterpriseAddressName,
      enterpriseStreet,
      enterpriseCountry 
    });

    return response.status(201).json(enterprise);
  }
}

  export { CreateEnterpriseController }