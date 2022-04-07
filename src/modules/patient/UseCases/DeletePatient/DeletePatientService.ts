import { AppError } from "../../../../errors/AppError";
import { UserModel } from "../../../user/entities/UserModel";
import { PatientModel } from "../../entities/PatientModel";
import { MatriculationModel } from "../../../matriculation/entities/MatriculationModel";

interface IRequest{
  responsibleEnterpriseUser: string;
  email: string;
}

class DeletePatientService{
  async execute({ 
    responsibleEnterpriseUser,
    email,
  }: IRequest) {

    const userEnterprise = await UserModel.findOne({ _id: responsibleEnterpriseUser });

    if(!userEnterprise) throw new AppError('User Enterprise not Exist!');
    if(!email) throw new AppError('Email invalid!');

    const patient = await PatientModel.findOne({
      'patientOpciones.responsibleEnterpriseUser': userEnterprise, 
      'contact.email': email
    });

    await MatriculationModel.deleteOne({
      responsibleEnterpriseUser: userEnterprise,
      patientName: patient
    });

    await UserModel.findOneAndUpdate({
      _id: userEnterprise._id
    }, {
      $pull: { listPatients: {_id: patient?._id} }
    })

    await PatientModel.deleteOne({ 
      _id: patient?._id,
    });

    return patient;
  }
}

export { DeletePatientService }