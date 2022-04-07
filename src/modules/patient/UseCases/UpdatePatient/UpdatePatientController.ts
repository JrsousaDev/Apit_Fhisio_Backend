import { Request, Response } from 'express';
import { UpdatePatientService } from './UpdatePatientService';

class UpdatePatientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { data } = request.body;

    const {
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
    } = data;

    const updatePatientService = new UpdatePatientService();

    const patient = await updatePatientService.execute({
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
    });

    return response.status(201).json(patient)
  }
}

export { UpdatePatientController }