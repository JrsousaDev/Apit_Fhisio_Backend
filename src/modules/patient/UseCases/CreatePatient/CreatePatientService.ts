import { AppError } from "../../../../errors/AppError";
import { UserModel } from "../../../user/entities/UserModel";
import { PatientModel } from "../../entities/PatientModel";

interface IRequest{
  responsibleEnterpriseUser: string;
  name: string;
  birthDate: string;
  gender: "M" | "F" | "O";
  password: string;
  responsibleName: string; 
  cpf: string; 
  customerPortal: boolean; 
  email: string; 
  addressName: string; 
  numberAndComplement: string; 
  street: string; 
  cityAndState: string;
  cep: string;
  phone: string;
  telephone: string;
  profession: string;
  heKnew: string;
  observation: string;
  type_user: "PACIENTE";
}

class CreatePatientService{
  async execute({ 
    responsibleEnterpriseUser,
    name, 
    birthDate,
    gender, 
    password,
    responsibleName, 
    cpf, 
    customerPortal, 
    email, 
    addressName, 
    numberAndComplement, 
    street, 
    cityAndState,
    cep,
    phone,
    telephone,
    profession,
    heKnew,
    observation,
    type_user,
  }: IRequest) {

    const patientAlreadyExist = await PatientModel.findOne({ 'contact.email': email });
    const userAlreadyExist = await UserModel.findOne({ 'contact.email': email });

    if( patientAlreadyExist || userAlreadyExist ) throw new AppError('Email Already Exist!');
    
    const enterpriseUserExist = await UserModel.findOne({ _id: responsibleEnterpriseUser });

    if( !enterpriseUserExist ) throw new AppError('Enterprise Not Exist!');

    const formatedDate = `${birthDate}T00:00:00.000Z`

    const address = {
      cityAndState,
      cep,
      addressName, 
      numberAndComplement, 
      street, 
    }

    const contact = {
      telephone,
      phone,
      email
    }

    const patientOpciones = {
      responsibleEnterpriseUser: enterpriseUserExist,
      responsibleName,
      customerPortal, 
      profession,
      heKnew,
      observation,
    }
    
    const data = {
      name,
      password,
      birthDate: formatedDate,
      gender,
      type_user,
      cpf,
      address,
      patientOpciones,
      contact
    }

    const patient = await PatientModel.create(data);

    await UserModel.findOneAndUpdate({
      _id: enterpriseUserExist._id
    }, { $push: {listPatients: patient}}, {new: true});

    return patient;
  }
}

export { CreatePatientService }