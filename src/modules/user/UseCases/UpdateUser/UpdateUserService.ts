import { AppError } from "../../../../errors/AppError";
import { UserModel } from "../../entities/UserModel";

interface IRequest{
  userName: string;
  userCPF: string;
  userEmail: string;
  userPhone: string;
  userTelephone: string; 
  id: string; 
}

class UpdateUserService{
  async execute({ userName, userCPF, userEmail, userPhone, userTelephone, id }: IRequest) {

    const user = await UserModel.findOne({ _id: id });

    if( !user ) {
      throw new AppError('Este usuário não existe!');
    }

    const userUpdate = UserModel.findOneAndUpdate({
      _id: user._id
    }, {
      name: userName,
      cpf: userCPF,
      'contact.email': userEmail,
      'contact.phone': userPhone,
      'contact.telephone': userTelephone,
    })

    return userUpdate;
  }
}

export { UpdateUserService }