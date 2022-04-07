import { AppError } from "../../../../errors/AppError";
import { UserModel } from "../../entities/UserModel";

interface IRequest{
  name: string;
  email: string;
  password: string;
  gender: "M" | "F" | "O";
  type_user: "EMPRESA";
  cpf: string;
  phone: string;
  telephone: string;
  state: string;
  city: string;
  street: string;
}

class CreateUserService{
  async execute({ 
    name, 
    email, 
    password, 
    gender, 
    state,
    city,
    street,
    type_user,
    cpf,
    phone,
    telephone,
  }: IRequest) {

    const userAlreadyExist = await UserModel.findOne({ 'contact.email': email });

    if( userAlreadyExist ) {
      throw new AppError('Usuário já cadastrado!');
    }

    const address = {
      state,
      city,
      street
    }

    const contact = {
      email,
      phone,
      telephone,
    }
    
    const data = {
      name,
      password,
      gender,
      cpf,
      type_user,
      contact,
      address,
    }

    const user = await UserModel.create(data);

    return user;
  }
}

export { CreateUserService }