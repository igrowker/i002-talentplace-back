import { Router } from "express";
import projectController from "../controllers/project.controller";


const projectRouter: Router = Router();

projectRouter.get("/",
    projectController.getAllProjects
);

projectRouter.get("/:id", projectController.editProject)

//Para empresa
projectRouter.post("/", projectController.postNewProject)

projectRouter.put("/:id", projectController.editProject)

projectRouter.delete("/:id", projectController.deleteProject)

export default projectRouter