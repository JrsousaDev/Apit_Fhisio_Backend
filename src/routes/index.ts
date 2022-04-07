import { Router } from "express";
import { enterpriseRoutes } from "./Enterprise/enterprise.routes";
import { userRoutes } from "./Users/user.routes";
import { patientRoutes } from "./Patients/patient.routes";
import { matriculationRoutes } from "./Matriculation/matriculation.routes";
import { auth } from "../middlewares/auth";

const routes = Router();

routes.use('/user', userRoutes)

routes.use(auth);

routes.use('/enterprise', enterpriseRoutes);
routes.use('/patient', patientRoutes);
routes.use('/matriculation', matriculationRoutes);

export { routes };