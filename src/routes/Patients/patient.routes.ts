import { Router } from "express";
import { CreatePatientController } from "../../modules/patient/UseCases/CreatePatient/CreatePatientController";
import { DeletePatientController } from "../../modules/patient/UseCases/DeletePatient/DeletePatientController";
import { FindOnePatientController } from "../../modules/patient/UseCases/FindOnePatient/FindOnePatientController";
import { GetPatientController } from "../../modules/patient/UseCases/GetPatient/GetPatientController";
import { UpdatePatientController } from "../../modules/patient/UseCases/UpdatePatient/UpdatePatientController";

const patientRoutes = Router();

const createPatientController = new CreatePatientController();
patientRoutes.post('/create', createPatientController.handle);

const getPatientController = new GetPatientController();
patientRoutes.post('/find', getPatientController.handle);

const findOnePatientController = new FindOnePatientController();
patientRoutes.post('/findOne', findOnePatientController.handle);

const updatePatientController = new UpdatePatientController();
patientRoutes.post('/update', updatePatientController.handle);

const deletePatientController = new DeletePatientController();
patientRoutes.post('/delete', deletePatientController.handle);

export { patientRoutes }