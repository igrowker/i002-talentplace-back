import { Router } from "express";
import AppsController from "../controllers/Apps.Controllers";


const appsRouter: Router = Router();

//Lista de usuarios validados
appsRouter.get("/", AppsController.getAllUsersValidate)

appsRouter.post("/", AppsController.postNewProject)

export default appsRouter