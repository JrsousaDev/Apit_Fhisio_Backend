import { Request, Response } from "express";
import { AuthenticatePatientService } from "./AuthenticatePatientService";

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticatePatientController = new AuthenticatePatientService();

    const token = await authenticatePatientController.execute({ email, password });

    return response.status(200).json(token);
  }
}


export { AuthenticateUserController }