import { Router } from "express";
import ProjectsController from "../controllers/Projects.Controller";

const projectRouter: Router = Router();

projectRouter.get("/", ProjectsController.getAllProjects)

projectRouter.get("/:id", ProjectsController.editProject)

//Para empresa
projectRouter.post("/", ProjectsController.postNewProject)

projectRouter.put("/:id", ProjectsController.editProject)

projectRouter.delete("/:id", ProjectsController.deleteProject)


export default projectRouter