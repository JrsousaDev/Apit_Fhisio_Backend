import { AppError } from "../../../../errors/AppError";
import { UserModel } from "../../../user/entities/UserModel";
import { EnterpriseModel } from "../../../enterprise/entities/EnterpriseModel";

interface IRequest{
  id: string;
  defaultEmail: string;
  enterpriseResponsibleName: string;
  enterpriseRegMunicipal: string;
  enterpriseName: string;
  enterprisePhone: string;
  enterpriseEmail: string;
  enterpriseCNPJ: string;
  enterpriseState: string;
  enterpriseCity: string;
  enterpriseCep: string;
  enterpriseAddressNumber: string;
  enterpriseAddressName: string;
  enterpriseStreet: string;
  enterpriseCountry: string; 
}

class CreateEnterpriseService{
  async execute({ 
    id,
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
  }: IRequest) {

    const address = {
      state: enterpriseState,
      city: enterpriseCity,
      cep: enterpriseCep,
      number: enterpriseAddressNumber,
      addressName: enterpriseAddressName,
      street: enterpriseStreet,
      country: enterpriseCountry 
    }

    const userAlreadyExist = await UserModel.findOne({ _id : id });

    if (!userAlreadyExist) {
      throw new AppError('Este Usuário não existe!');
    }

    const enterpriseAlreadyExist = await EnterpriseModel.findOne({ cnpj: enterpriseCNPJ });

    if (enterpriseAlreadyExist) {
      throw new AppError('Esta Empresa já existe!');
    }

    if(!enterpriseName || !enterpriseEmail|| 
      !enterpriseCNPJ || !enterpriseState || !enterpriseCity || 
      !enterpriseCep || !enterpriseAddressNumber || !enterpriseAddressName || 
      !enterpriseStreet || !enterpriseCountry) {
        throw new AppError('Por favor, preencha todos os campos!');
      }

    const contact = {
      email: enterpriseEmail,
      phone: enterprisePhone,
    }
    
    const data = {
      responsibleUser: userAlreadyExist,
      responsibleName: enterpriseResponsibleName,
      regMunicipal: enterpriseRegMunicipal,
      name: enterpriseName,
      cnpj: enterpriseCNPJ,
      address,
      contact
    }

    const enterprise = await EnterpriseModel.create(data);

    await UserModel.findOneAndUpdate({
      'contact.email': userAlreadyExist.contact.email
    }, {enterprise}, {new: true});

    return enterprise;
  }
}

export { CreateEnterpriseService }