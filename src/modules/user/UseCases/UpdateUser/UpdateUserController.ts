import { Request, Response } from "express";
import { UpdateUserService } from "./UpdateUserService";

class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response> {

    const {data} = request.body;

    const {      
      userName, 
      userCPF, 
      userEmail, 
      userPhone, 
      userTelephone, 
      id 
    } = data;

    const updateUserService = new UpdateUserService();

    const user = await updateUserService.execute({
      userName, 
      userCPF, 
      userEmail, 
      userPhone, 
      userTelephone, 
      id
    });

    return response.status(201).json(user);
  }
}

  export { UpdateUserController }