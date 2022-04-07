import { Request, Response } from "express";
import { CreateUserService } from "./CreateUserService";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {

    const { data } = request.body;

    const {
      name, 
      email, 
      password, 
      gender, 
      city,
      street,
      state, 
      cpf, 
      phone, 
      telephone 
     } = data;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
      name, 
      email, 
      password, 
      gender, 
      state, 
      city, 
      street, 
      type_user: "EMPRESA", 
      cpf, 
      phone, 
      telephone
    });

    return response.status(201).json(user);
  }
}

  export { CreateUserController }