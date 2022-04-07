import { AppError } from "../../../../errors/AppError";
import { MatriculationModel } from "../../entities/MatriculationModel";
import { UserModel } from "../../../user/entities/UserModel";
import { PatientModel } from "../../../patient/entities/PatientModel";

interface IRequest{
  responsibleEnterpriseUser: string;
  idMatriculation: string;
  emailPatient: string;
}

class DeleteMatriculationService{
  async execute({ 
    responsibleEnterpriseUser,
    idMatriculation,
    emailPatient,
  }: IRequest) {

    if ( !idMatriculation ) {
      throw new AppError('Matriculation invalid!');
    }

    if ( !emailPatient ) {
      throw new AppError('Email invalid!');
    }

    const user = await UserModel.findOne({
      _id: responsibleEnterpriseUser
    });

    if ( !user ) {
      throw new AppError('User is not exist!');
    }

    const matriculation = await MatriculationModel.findOne({
      _id: idMatriculation,
    });

    if ( !matriculation ) {
      throw new AppError('Matriculation is not exist!');
    }

    await PatientModel.findOneAndUpdate({
      'contact.email': emailPatient,
      'patientOpciones.responsibleEnterpriseUser': responsibleEnterpriseUser,
    }, { $unset: {matriculation} });

    await MatriculationModel.deleteOne({
      responsibleEnterpriseUser,
      _id: idMatriculation,
    });

    return matriculation
  }
}

export { DeleteMatriculationService }