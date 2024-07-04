import { Router } from "express";
import appsController from "../controllers/apps.controller";
import jwtVerifyMiddleware from "../middlewares/jwtVerify.middleware";

const appsRouter: Router = Router();

//Lista de usuarios validados
appsRouter.get("/", jwtVerifyMiddleware.jwtVerify, appsController.getAllUsersValidate)

appsRouter.post("/", jwtVerifyMiddleware.jwtVerify, appsController.postNewProject)

export default appsRouter