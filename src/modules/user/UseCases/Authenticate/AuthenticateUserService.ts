import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';
import { UserModel } from '../../entities/UserModel';
import { AppError } from '../../../../errors/AppError';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    id: string;
    typeUser: string;
  },
  token: string;
}

class AuthenticateUserService {

  async execute({ email, password }: IRequest) {
    
    const user = await UserModel.findOne({ 'contact.email': email });

    if (!user) {
      throw new AppError('User not exists!')
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email or password incorrect!");
    }
    
    const token = sign({
      id: user._id,
      name: user.name
    }, process.env.APP_SECRET as string, {
      expiresIn: "30m"
    });

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        id: user._id,
        typeUser: user.type_user,
      }
    }

    return tokenReturn;
  }
}


export { AuthenticateUserService }