import { Router } from "express";
//import ProjectsController from "../controllers/Projects.Controllers";


const projectRouter: Router = Router();

projectRouter.get("/", (_req, res)=>{
    //Obtendra la lista completa de los proyectos
})

projectRouter.get("/:id", (_req, res)=>{
    //Se obtendra los detalles de un proyecto
})

projectRouter.post("/", (_req, res)=>{
    //Publicar un nuevo proyecto (empresa).
})

projectRouter.put("/:id",(_req, res)=>{
    //Actualizar proyecto.
})

projectRouter.delete("/:id", (_req, res)=>{
    //Eliminar proyecto
})

export default projectRouter