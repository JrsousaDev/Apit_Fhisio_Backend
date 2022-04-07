import { AppError } from "../../../../errors/AppError";
import { UserModel } from "../../entities/UserModel";
import { checkPassword, createPasswordHash } from "../../../../utils/authPassword";

interface IRequest{
  email: string;
  password: string;
  newPassword: string;
}

class ChangePasswordUserService{
  async execute({ email, password, newPassword }: IRequest) {
    const userAlreadyExists = await UserModel.findOne({ email });

    if (!userAlreadyExists) {
      throw new AppError('Este usuário não existe!');
    }

    const samePassword = await checkPassword(userAlreadyExists, password)
    if(!samePassword){
      throw new AppError('Senha inválida');
    } 

   const encryptedPassword = await createPasswordHash(newPassword); 

    const user = await UserModel.findOneAndUpdate({
      _id: userAlreadyExists._id
    }, {
      password: encryptedPassword
    }, {
      new: true
    });

    return user;
  }
}

export { ChangePasswordUserService }