import { AppError } from "../../../../errors/AppError";
import { MatriculationModel } from "../../entities/MatriculationModel";
import { UserModel } from "../../../user/entities/UserModel";

interface IRequest{
  responsibleEnterpriseUser: string;
}

class GetMatriculationService{
  async execute({ 
    responsibleEnterpriseUser,
  }: IRequest) {

    const user = await UserModel.findOne({
      _id: responsibleEnterpriseUser
    });

    if ( !user ) {
      throw new AppError('User is not exist!')
    }

    const matriculations = await MatriculationModel.find({
      responsibleEnterpriseUser: user,
    }).populate('patientName');

    if ( !matriculations ) {
      throw new AppError('Matriculation is not exist!')
    }

    return matriculations
  }
}

export { GetMatriculationService }