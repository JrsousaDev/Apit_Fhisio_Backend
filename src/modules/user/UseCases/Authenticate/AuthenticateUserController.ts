import { Request, Response } from "express";
import { AuthenticateUserService } from "./AuthenticateUserService";

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUserController = new AuthenticateUserService();

    const token = await authenticateUserController.execute({ email, password });

    return response.status(200).json(token);
  }
}


export { AuthenticateUserController }