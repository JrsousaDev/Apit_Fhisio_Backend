import { Request, Response } from "express";
import { DeleteUserService } from "./DeleteUserUserService";

class DeleteUserController {
  async handle(request: Request, response: Response): Promise<Response> {

    const { email } = request.body;

    const deleteUserService = new DeleteUserService();
    const user = await deleteUserService.execute({
      email
    });

    return response.status(201).json(user);
  }
}

  export { DeleteUserController }