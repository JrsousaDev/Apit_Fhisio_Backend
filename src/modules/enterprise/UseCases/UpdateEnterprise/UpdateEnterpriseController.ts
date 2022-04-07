import { Request, Response } from "express";
import { UpdateEnterpriseService } from "./UpdateEnterpriseService";

class UpdateEnterpriseController {
  async handle(request: Request, response: Response): Promise<Response> {

    const { data } = request.body;

    const { 
      id,
      defaultEnterpriseId,
      defaultEnterpriseCNPJ,
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

    const updateEnterpriseService = new UpdateEnterpriseService();

    const enterprise = await updateEnterpriseService.execute({
      id,
      defaultEnterpriseId,
      defaultEnterpriseCNPJ,
      enterpriseResponsibleName,
      enterprisePhone,
      enterpriseRegMunicipal,
      enterpriseName,
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

  export { UpdateEnterpriseController }