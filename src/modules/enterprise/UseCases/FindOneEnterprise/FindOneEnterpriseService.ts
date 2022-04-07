import { AppError } from "../../../../errors/AppError";
import { EnterpriseModel } from "../../entities/EnterpriseModel";

interface IRequest{
  enterpriseCNPJ: string;
}

class FindOneEnterpriseService{
  async execute({ 
    enterpriseCNPJ,
  }: IRequest) {

    const enterpriseAlreadyExist = await EnterpriseModel.findOne({ cnpj: enterpriseCNPJ });

    if (!enterpriseAlreadyExist) {
      throw new AppError('Esta empresa não existe!');
    }

    return enterpriseAlreadyExist;
  }
}

export { FindOneEnterpriseService }