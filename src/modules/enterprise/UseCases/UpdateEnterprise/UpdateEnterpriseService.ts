import { AppError } from "../../../../errors/AppError";
import { EnterpriseModel } from "../../entities/EnterpriseModel";
import { UserModel } from "../../../user/entities/UserModel";

interface IRequest{
  id: string;
  defaultEnterpriseId: string;
  defaultEnterpriseCNPJ: string;
  enterpriseResponsibleName: string;
  enterpriseName: string;
  enterpriseEmail: string;
  enterpriseCNPJ: string;
  enterpriseRegMunicipal: string;
  enterprisePhone: string;
  enterpriseState: string;
  enterpriseCity: string;
  enterpriseCep: string;
  enterpriseAddressNumber: string;
  enterpriseAddressName: string;
  enterpriseStreet: string;
  enterpriseCountry: string;
}

class UpdateEnterpriseService{
  async execute({ 
    id,
    defaultEnterpriseId,
    defaultEnterpriseCNPJ,
    enterpriseResponsibleName,
    enterpriseName,
    enterpriseEmail,
    enterpriseCNPJ,
    enterpriseRegMunicipal,
    enterprisePhone,
    enterpriseState,
    enterpriseCity,
    enterpriseCep,
    enterpriseAddressNumber,
    enterpriseAddressName,
    enterpriseStreet,
    enterpriseCountry,
  }: IRequest) {

    const userAlreadyExist = await UserModel.findOne({ _id: id });

    if (!userAlreadyExist) {
      throw new AppError('Este Usuário não existe!');
    }

    const enterpriseAlreadyExist = await EnterpriseModel.findOne({ _id: defaultEnterpriseId });

    if (!enterpriseAlreadyExist) {
      throw new AppError('Esta empresa não existe!');
    }

    if(!enterpriseCNPJ || enterpriseCNPJ === defaultEnterpriseCNPJ){
      enterpriseCNPJ = defaultEnterpriseCNPJ;
    } else {

      const newEnterpriseAlreadyExist = await EnterpriseModel.findOne({ cnpj: enterpriseCNPJ });

      if (newEnterpriseAlreadyExist) {
        throw new AppError('Já existe uma empresa cadastrada com esse CNPJ')
      }

    }

      const enterprise = await EnterpriseModel.findOneAndUpdate({
        _id: defaultEnterpriseId
      }, {
        responsibleUser: userAlreadyExist,
        responsibleName: enterpriseResponsibleName,
        name: enterpriseName,
        cnpj: enterpriseCNPJ,
        regMunicipal: enterpriseRegMunicipal,
        'contact.phone': enterprisePhone,
        'contact.email': enterpriseEmail,
        'address.state': enterpriseState,
        'address.city': enterpriseCity,
        'address.cep': enterpriseCep,
        'address.number': enterpriseAddressNumber,
        'address.addressName': enterpriseAddressName,
        'address.street': enterpriseStreet,
        'address.country': enterpriseCountry,
      }, {
        new: true
      });

      return enterprise;
  }
}

export { UpdateEnterpriseService }