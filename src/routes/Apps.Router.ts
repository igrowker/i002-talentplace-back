import { Router } from "express";
//import AppsController from "../controllers/Apps.Controllers";


const appsRouter: Router = Router();

appsRouter.get("/", (_req, res)=>{
    //Obtener lista de aplicaciones del usuario autenticado.
})

appsRouter.post("/", (_req, res)=>{
    //Aplicar a un proyecto (junior)
})

export default appsRouter