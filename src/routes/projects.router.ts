import { Router } from "express";
import projectController from "../controllers/project.controller";
import jwtVerifyMiddleware from "../middlewares/jwtVerify.middleware";
import jwtIdMatchVerifyMiddleware from "../middlewares/jwtIdMatchVerify.middleware";
import jwtRolVerify from "../middlewares/jwtRolVerify.middleware";
import validateProjectUpdate from "../middlewares/validateProjectUpdate.middleware"
import validateNewProject from "../middlewares/validateNewProject.middleware";


const projectRouter: Router = Router();

/**
 * @swagger
 * /api/v1/projects/:
 *   get:
 *     summary: Obtiene los detalles de todos los proyectos.
 *     tags:
 *       - Proyectos
 *     responses:
 *       200:
 *         description: Detalles de los proyectos obtenidos correctamente.
 *         example:
 *           - id: string
 *             titulo: string
 *             descripcion: string
 *             requisitos: string
 *             modalidad: string
 *             estado: boolean
 *           - id: string
 *             titulo: string
 *             descripcion: string
 *             requisitos: string
 *             modalidad: string
 *             estado: boolean
 */
projectRouter.get("/", projectController.getAllProjects);

/**
 * @swagger
 * /api/v1/projects/{id}:
 *   get:
 *     summary: Obtiene los detalles de un proyecto.
 *     tags:
 *       - Proyectos
 *     responses:
 *       200:
 *         description: Detalles de un proyecto obtenidos correctamente.
 *         example:
 *           - id: string
 *             titulo: string
 *             descripcion: string
 *             requisitos: string
 *             modalidad: string
 *             estado: boolean
 *             empresa: string
 *             aplicacion: string
 *             pago: string
 *             comentario: string
 */
projectRouter.get("/:id",
    jwtVerifyMiddleware.jwtVerify,
    jwtIdMatchVerifyMiddleware.jwtIdMatchVerify,
    jwtRolVerify(['empresa', 'junior', 'admin']),
    projectController.getProyectById
);

// Para empresa

/**
 * @swagger
 * /api/v1/projects/{id}:
 *   post:
 *     summary: Crear nuevo proyecto.
 *     tags:
 *       - Proyectos
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Edición de las habilidades solicitadas o la categoría del proyecto.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             titulo:
 *               type: string
 *             descripcion:
 *               type: string
 *             requisitos:
 *               type: string
 *             empresaId:
 *               type: string
 *             modalidad:
 *               type: string
 *             estado:
 *               type: string
 *             habilidades:
 *               type: string
 *             categoria:
 *               type: string
 *     responses:
 *       200:
 *         description: Creación de un proyecto correctamente.
 *         content:
 *           application/json:
 *             example:
 *               id: string
 *               titulo: string
 *               descripcion: string
 *               requisitos: string
 *               modalidad: string
 *               estado: boolean
 */
projectRouter.post("/:id",
    jwtVerifyMiddleware.jwtVerify,
    jwtIdMatchVerifyMiddleware.jwtIdMatchVerify,
    jwtRolVerify(['empresa']),
    validateNewProject,
    projectController.postNewProject
);

/**
 * @swagger
 * /api/v1/projects/:id:
 *   put:
 *     summary: Editar la categoría o las habilidades.
 *     tags:
 *       - Proyectos
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Edición de las habilidades solicitadas o la categoría del proyecto.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             habilidades:
 *               type: string
 *             categoria:
 *               type: string
 *     responses:
 *       200:
 *         description: Edición de las habilidades o categoría de un proyecto correctamente.
 *         example:
 *           message: Proyecto ${titulo} eliminado con éxito
 */
projectRouter.put("/:id",
    jwtVerifyMiddleware.jwtVerify,
    jwtIdMatchVerifyMiddleware.jwtIdMatchVerify,
    jwtRolVerify(['empresa']),
    validateProjectUpdate,
    projectController.editProjectById
);

/**
 * @swagger
 * /api/v1/projects/:id:
 *   delete:
 *     summary: Elimina un proyecto.
 *     tags:
 *       - Proyectos
 *     responses:
 *       200:
 *         description: Proyecto borrado correctamente.
 *         example:
 *           message: Proyecto ${titulo} eliminado con exito
 */
projectRouter.delete("/:id",
    jwtVerifyMiddleware.jwtVerify,
    jwtIdMatchVerifyMiddleware.jwtIdMatchVerify,
    jwtRolVerify(['empresa']),
    projectController.deleteProjectById
);

export default projectRouter