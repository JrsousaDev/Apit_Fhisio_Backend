import { Router } from "express";
import { CreateMatriculationController } from "../../modules/matriculation/UseCases/CreateMatriculation/CreateMatriculationController";
import { DeleteMatriculationController } from "../../modules/matriculation/UseCases/DeleteMatriculation/DeleteMatriculationController";
import { GetMatriculationController } from "../../modules/matriculation/UseCases/GetMatriculation/GetMatriculationController";

const matriculationRoutes = Router();

const createMatriculationController = new CreateMatriculationController();
matriculationRoutes.post('/create', createMatriculationController.handle);

const getMatriculationController = new GetMatriculationController();
matriculationRoutes.post('/find', getMatriculationController.handle);

const deleteMatriculationController = new DeleteMatriculationController();
matriculationRoutes.post('/delete', deleteMatriculationController.handle);


export { matriculationRoutes }