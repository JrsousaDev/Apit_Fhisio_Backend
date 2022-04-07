import { Request, Response } from "express";
import { CreateMatriculationService } from "./CreateMatriculationService";

class CreateMatriculationController {
  async handle(request: Request, response: Response): Promise<Response> {
  
    const { data } = request.body

    const { 
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
      dayOfSessions = 'sexta-feira',
      dueDate,
      singleTime,
    } = data;

    const createMatriculationService = new CreateMatriculationService();

    const matriculation = await createMatriculationService.execute({
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
      dayOfSessions,
      dueDate,
      singleTime,
      status: 'matriculado',
    });

    return response.status(201).json(matriculation);
  }
}

  export { CreateMatriculationController }