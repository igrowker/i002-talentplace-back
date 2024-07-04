import { Router } from "express";
import appsController from "../controllers/apps.controller";

const appsRouter: Router = Router();

//Lista de usuarios validados
appsRouter.get("/", appsController.getAllUsersValidate)

appsRouter.post("/", appsController.postNewProject)

export default appsRouter