import { Router } from "express";
import { CreateEnterpriseController } from "../../modules/enterprise/UseCases/CreateEnterprise/CreateEnterpriseController";
import { FindOneEnterpriseController } from "../../modules/enterprise/UseCases/FindOneEnterprise/FindOneEnterpriseController";
import { UpdateEnterpriseController } from "../../modules/enterprise/UseCases/UpdateEnterprise/UpdateEnterpriseController";

const enterpriseRoutes = Router();

const createEnterpriseController = new CreateEnterpriseController();
enterpriseRoutes.post('/create-enterprise', createEnterpriseController.handle);

const findOneEnterpriseController = new FindOneEnterpriseController();
enterpriseRoutes.post('/findOne', findOneEnterpriseController.handle);

const updateEnterpriseController = new UpdateEnterpriseController();
enterpriseRoutes.post('/update', updateEnterpriseController.handle);

export { enterpriseRoutes }