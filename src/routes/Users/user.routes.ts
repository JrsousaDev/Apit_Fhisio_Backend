import { Router } from "express";
import { CreateUserController } from "../../modules/user/UseCases/CreateUser/CreateUserController";
import { ChangePasswordUserController } from "../../modules/user/UseCases/ChangePasswordUser/ChangePasswordUserController";
import { DeleteUserController } from "../../modules/user/UseCases/DeleteUser/DeleteUserController";
import { AuthenticateUserController } from "../../modules/user/UseCases/Authenticate/AuthenticateUserController";
import { GetOneUserController } from "../../modules/user/UseCases/GetOneUser/GetOneUserController";
import { UpdateUserController } from "../../modules/user/UseCases/UpdateUser/UpdateUserController";
import { auth } from "../../middlewares/auth";

const userRoutes = Router();

const createUserController = new CreateUserController();
userRoutes.post('/', createUserController.handle);

const authenticateUserController = new AuthenticateUserController();
userRoutes.post('/login', authenticateUserController.handle);

userRoutes.use(auth);

const getOneUserController = new GetOneUserController();
userRoutes.post('/find', getOneUserController.handle)

const changePasswordUserController = new ChangePasswordUserController();
userRoutes.post('/updatePassword', changePasswordUserController.handle);

const updateUserController = new UpdateUserController();
userRoutes.post('/update', updateUserController.handle);

const deleteUserController = new DeleteUserController();
userRoutes.delete('/', deleteUserController.handle);


export { userRoutes }