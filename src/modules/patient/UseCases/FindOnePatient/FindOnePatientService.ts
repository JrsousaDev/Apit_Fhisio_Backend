import { AppError } from "../../../../errors/AppError";
import { UserModel } from "../../../user/entities/UserModel";
import { PatientModel } from "../../entities/PatientModel";

interface IRequest{
  responsibleEnterpriseUser: string;
  idPatient: string;
}

class FindOnePatientService{
  async execute({ 
    responsibleEnterpriseUser,
    idPatient,
  }: IRequest) {

    const userEnterprise = await UserModel.findOne({ _id: responsibleEnterpriseUser });
    
    if(!userEnterprise) {
      throw new AppError('User Enterprise not Exist!');
    }

    const patient = await PatientModel.findOne({
      'patientOpciones.responsibleEnterpriseUser': userEnterprise, 
      _id: idPatient
    });

    return patient;
  }
}

export { FindOnePatientService }