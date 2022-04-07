import { Request, Response } from "express";
import { GetOneUserService } from "./GetOneUserService";

class GetOneUserController {
  async handle(request: Request, response: Response): Promise<Response> {

    const { id } = request.body;

    const getOneUserService = new GetOneUserService();

    const user = await getOneUserService.execute({
      id
    });

    return response.status(201).json(user);
  }
}

  export { GetOneUserController }