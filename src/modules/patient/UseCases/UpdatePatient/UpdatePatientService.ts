import { AppError } from "../../../../errors/AppError";
import { PatientModel } from "../../entities/PatientModel";
import { UserModel } from "../../../user/entities/UserModel";

interface IRequest {
  id: string;
  defaultPatientId: string;
  defaultPatientEmail: string;
  patientName: string;
  patientBirthDate: string;
  patientGender: "F" | "M" | "O";
  patientResponsibleName: string;
  patientCPF: string;
  patientCustomerPortal: boolean;
  patientEmail: string;
  patientAddressName: string;
  patientNumberAndComplement: string;
  patientStreet: string;
  patientCityAndState: string;
  patientCep: string;
  patientPhone: string;
  patientTelephone: string;
  patientProfession: string;
  patientHeKnew: string;
  patientObservation: string;
}

class UpdatePatientService{
  async execute({
    id,
    defaultPatientId,
    defaultPatientEmail,
    patientName,
    patientBirthDate,
    patientGender,
    patientResponsibleName,
    patientCPF,
    patientCustomerPortal,
    patientEmail,
    patientAddressName,
    patientNumberAndComplement,
    patientStreet,
    patientCityAndState,
    patientCep,
    patientPhone,
    patientTelephone,
    patientProfession,
    patientHeKnew,
    patientObservation
  }: IRequest) {
    const userAlreadyExist = await UserModel.findOne({ _id: id });

    if (!userAlreadyExist) {
      throw new AppError('Este Usuário não existe!');
    }

    const patientAlreadyExist = await PatientModel.findOne({
      _id: defaultPatientId
    });

    if (!patientAlreadyExist) {
      throw new AppError('Este Patiente não existe!');
    }

    if(!patientEmail || patientEmail === defaultPatientEmail) {
      patientEmail = defaultPatientEmail;
    } else {
      const newPatientAlreadyExist = await PatientModel.findOne({
        'contact.email': patientEmail,
      });
  
      if (newPatientAlreadyExist) {
        throw new AppError('Já existe um paciente com este email!');
      }
    }
    
    const formatedDate = patientBirthDate ? `${patientBirthDate}T00:00:00.000Z` : patientAlreadyExist.birthDate;

    const patient = await PatientModel.findOneAndUpdate({
      _id: defaultPatientId
    }, {
      name: patientName,
      birthDate: formatedDate,
      gender: patientGender,
      cpf: patientCPF,
      'contact.email': patientEmail,
      'contact.phone': patientPhone,
      'contact.telephone': patientTelephone,
      'address.cityAndState': patientCityAndState,
      'address.street': patientStreet,
      'address.numberAndComplement': patientNumberAndComplement,
      'address.addressName': patientAddressName,
      'address.cep': patientCep,
      'patientOpciones.profession': patientProfession,
      'patientOpciones.heKnew': patientHeKnew,
      'patientOpciones.observation': patientObservation,
      'patientOpciones.customerPortal': patientCustomerPortal,
      'patientOpciones.responsibleName': patientResponsibleName,
    }, {
      new: true,
    });

    return patient
  }
}

export { UpdatePatientService }