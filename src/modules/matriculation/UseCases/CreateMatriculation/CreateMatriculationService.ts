import { AppError } from "../../../../errors/AppError";
import { MatriculationModel } from "../../entities/MatriculationModel";
import { UserModel } from "../../../user/entities/UserModel";
import { PatientModel } from "../../../patient/entities/PatientModel";
import mongoose from 'mongoose';

interface IRequest{
  responsibleEnterpriseUser: string;
  patientName: string;
  physicalTherapist: mongoose.Types.ObjectId;
  dateMatriculation: string;
  dueDate: string;
  expiryDay: number;
  firstPaymentDay: string;
  enrollmentFee: number;
  billingMethod: "Semestral" | "Bimestral"
  enrollmentValue: number;
  modality: mongoose.Types.ObjectId;
  sessionRoom: mongoose.Types.ObjectId;
  enrollmentPlan: mongoose.Types.ObjectId;
  observation: string;
  status: string;
  singleTime: boolean;
  dayOfSessions: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday"
}

class CreateMatriculationService{
  async execute({ 
    status,
    responsibleEnterpriseUser,
    patientName,
    physicalTherapist,
    dateMatriculation,
    expiryDay,
    firstPaymentDay,
    enrollmentFee,
    billingMethod,
    enrollmentValue,
    modality,
    sessionRoom,
    enrollmentPlan,
    observation,
    dueDate,
    dayOfSessions,
    singleTime
  }: IRequest) {

    const patientAlreadyExist = await PatientModel.findOne({ _id: patientName });
    const userAlreadyExist = await UserModel.findOne({ _id: responsibleEnterpriseUser });

    const patientResponsibleUser = patientAlreadyExist?.patientOpciones.responsibleEnterpriseUser.toString();
    const responsibleUser = userAlreadyExist?._id.toString();
    
    if ( patientAlreadyExist?.matriculation) {
      throw new AppError('Este Paciente já está matriculado');
    }

    if ( patientResponsibleUser !== responsibleUser ){
      throw new AppError('Internal Server Error');
    }

    if ( !userAlreadyExist ) {
      throw new AppError('Internal Server Error');
    }

    if( !patientAlreadyExist ) {
      throw new AppError('Este Paciente não existe!');
    }

    if( !dateMatriculation ) {
      throw new AppError('Por favor, informe a data de matrícula!');
    }

    if ( !expiryDay ) {
      throw new AppError('Por favor, informe a data de vencimento!');
    }

    if ( !enrollmentValue ) {
      throw new AppError('Por favor, informe o valor da mensalidade!');
    } 

    const firstPaymentDayFormated = `${firstPaymentDay}T00:00:00.000Z`;
    const dueDateFormated = `${dueDate}T00:00:00.000Z`
    const dateMatriculationFormated = `${dateMatriculation}T00:00:00.000Z`

    const payment = {
      enrollmentPlan,
      billingMethod,
      enrollmentFee,
      enrollmentValue,
      expiryDay,
      firstPaymentDay: firstPaymentDayFormated,
      dueDate: dueDateFormated,
    }



    const sessions = {
      sessionRoom,
      dayOfSessions,
      singleTime
    }
    
    const data = {
      responsibleEnterpriseUser: userAlreadyExist._id,
      patientName: patientAlreadyExist._id,
      dateMatriculation: dateMatriculationFormated,
      physicalTherapist,
      modality,
      observation,
      status,
      sessions,
      payment
    }

    const matriculation = await MatriculationModel.create(data);

    await PatientModel.findOneAndUpdate({
      _id: patientAlreadyExist._id
    }, {matriculation}, {new: true});

    return matriculation;
  }
}

export { CreateMatriculationService }