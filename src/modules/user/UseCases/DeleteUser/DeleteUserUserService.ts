import { AppError } from "../../../../errors/AppError";
import { UserModel } from "../../entities/UserModel";

interface IRequest{
  email: string;
}

class DeleteUserService{
  async execute({ email }: IRequest) {
    const userAlreadyExists = await UserModel.findOne({ 'contact.email': email });

    if (!userAlreadyExists) {
      throw new AppError('Este usuário não existe!');
    }

    const user = UserModel.deleteOne({
      _id: userAlreadyExists._id
    });

    return user;
  }
}

export { DeleteUserService }