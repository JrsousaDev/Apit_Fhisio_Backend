import { AppError } from "../../../../errors/AppError";
import { UserModel } from "../../../user/entities/UserModel";
import { PatientModel } from "../../entities/PatientModel";

interface IRequest{
  responsibleEnterpriseUser: string;
}

class GetPatientService{
  async execute({ 
    responsibleEnterpriseUser,
  }: IRequest) {

    const userEnterprise = await UserModel.findOne({ _id: responsibleEnterpriseUser });
    
    if(!userEnterprise) {
      throw new AppError('User Enterprise not Exist!');
    }

    const patients = await PatientModel.find({'patientOpciones.responsibleEnterpriseUser': userEnterprise});

    return patients;
  }
}

export { GetPatientService }