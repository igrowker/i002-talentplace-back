import { Router } from "express";
import projectController from "../controllers/project.controller";
import jwtVerifyMiddleware from "../middlewares/jwtVerify.middleware";
import jwtIdMatchVerifyMiddleware from "../middlewares/jwtIdMatchVerify.middleware";
import jwtRolVerify from "../middlewares/jwtRolVerify.middleware";


const projectRouter: Router = Router();

projectRouter.get("/",
    projectController.getAllProjects
);

projectRouter.get("/:id",
    jwtVerifyMiddleware.jwtVerify,
    jwtIdMatchVerifyMiddleware.jwtIdMatchVerify,
    jwtRolVerify(['empresa', 'junior', 'admin']),
    projectController.getProyectById
);

//Para empresa
projectRouter.post("/", projectController.postNewProject)

projectRouter.put("/:id", projectController.editProject)

projectRouter.delete("/:id", projectController.deleteProject)

export default projectRouter