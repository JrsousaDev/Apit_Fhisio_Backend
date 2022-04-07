import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';
import { PatientModel } from '../../entities/PatientModel';
import { AppError } from '../../../../errors/AppError';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  patient: {
    name: string;
    email: string;
    typeUser: string;
  },
  token: string;
}

class AuthenticatePatientService {

  async execute({ email, password }: IRequest) {
    
    const patient = await PatientModel.findOne({ 'contact.email': email });

    if (!patient) {
      throw new AppError('Patient not exists!')
    }

    const passwordMatch = await compare(password, patient.password);

    if (!passwordMatch) {
      throw new AppError("Email or password incorrect!");
    }
    
    const token = sign({}, process.env.APP_SECRET as string, {
      subject: patient.id,
      expiresIn: "30m"
    });

    const tokenReturn: IResponse = {
      token,
      patient: {
        name: patient.name,
        email: patient.contact.email,
        typeUser: patient.type_user,
      }
    }

    return tokenReturn;
  }
}


export { AuthenticatePatientService }