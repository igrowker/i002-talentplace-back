import { Router } from "express";
import projectController from "../controllers/project.controller";
import jwtVerifyMiddleware from "../middlewares/jwtVerify.middleware";
import jwtIdMatchVerifyMiddleware from "../middlewares/jwtIdMatchVerify.middleware";
import jwtRolVerify from "../middlewares/jwtRolVerify.middleware";
import validateProjectUpdate from "../middlewares/validateProjectUpdate.middleware"
import validateNewProject from "../middlewares/validateNewProject.middleware";


const projectRouter: Router = Router();

projectRouter.get("/",
    projectController.getAllProjects
);

projectRouter.get("/categories",
    projectController.getAllCategories,
);

projectRouter.get("/:id",
    jwtVerifyMiddleware.jwtVerify,
    jwtIdMatchVerifyMiddleware.jwtIdMatchVerify,
    jwtRolVerify(['empresa', 'junior', 'admin']),
    projectController.getProyectById
);

//Para empresa
projectRouter.post("/:id",
    jwtVerifyMiddleware.jwtVerify,
    jwtIdMatchVerifyMiddleware.jwtIdMatchVerify,
    jwtRolVerify(['empresa', 'admin']),
    validateNewProject,
    projectController.postNewProject
);

projectRouter.put("/:id",
    jwtVerifyMiddleware.jwtVerify,
    jwtIdMatchVerifyMiddleware.jwtIdMatchVerify,
    jwtRolVerify(['empresa', 'admin']),
    validateProjectUpdate,
    projectController.editProjectById
);

projectRouter.delete("/:id",
    jwtVerifyMiddleware.jwtVerify,
    jwtIdMatchVerifyMiddleware.jwtIdMatchVerify,
    jwtRolVerify(['empresa', 'admin']),
    projectController.deleteProjectById
);

projectRouter.get("/user/:id",
    jwtVerifyMiddleware.jwtVerify,
    jwtIdMatchVerifyMiddleware.jwtIdMatchVerify,
    jwtRolVerify(['empresa', 'admin']),
    projectController.getAllProjectsByUserId
);

export default projectRouter