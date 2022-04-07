import { Request, Response } from "express";
import { ChangePasswordUserService } from "./ChangePasswordUserService";

class ChangePasswordUserController {
  async handle(request: Request, response: Response): Promise<Response> {

    const { email, password, newPassword } = request.body;

    const changePasswordUserService = new ChangePasswordUserService();

    const user = await changePasswordUserService.execute({
      email, password, newPassword
    });

    return response.status(201).json(user);
  }
}

  export { ChangePasswordUserController }