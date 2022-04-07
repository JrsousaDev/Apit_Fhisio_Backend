import { AppError } from "../../../../errors/AppError";
import { UserModel } from "../../entities/UserModel";

interface IRequest{
  id: string;
}

class GetOneUserService{
  async execute({ id }: IRequest) {

    const user = await UserModel.findOne({ _id: id })
    .populate('enterprise')

    if( !user ) {
      throw new AppError('Este usuário não existe!');
    }

    return user;
  }
}

export { GetOneUserService }