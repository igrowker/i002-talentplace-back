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
 * /projects/:
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
 * /projects/categories:
 *   get:
 *     summary: Obtiene todas las categorias para un proyectos.
 *     tags:
 *       - Proyectos
 *     responses:
 *       200:
 *         description: Las categorias para los proyectos obtenidas correctamente.
 *         example:
 *           - id: string
 *             name: string
 *           - id: string
 *             name: string
 *           - id: string
 *             name: string
 */
projectRouter.get("/categories",
    projectController.getAllCategories,
);

/**
 * @swagger
 * /projects/:{id}:
 *   get:
 *     summary: Obtiene los detalles de un proyecto.
 *     tags:
 *       - Proyectos
 *     security:
 *       - bearerAuth: []
  *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
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
 * /projects/:{id}:
 *   post:
 *     summary: Crear nuevo proyecto.
 *     tags:
 *       - Proyectos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del proyecto
 *         schema:
 *           type: string
 *       - in: body
 *         name: body
 *         description: Edición de las habilidades solicitadas o la categoría del proyecto.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             titulo:
 *               type: string
 *               example: "Titulo de prueba"
 *             descripcion:
 *               type: string
 *               example: "Esta descripción es de prueba"
 *             requisitos:
 *               type: string
 *               example: "HTML, CSS, JS, REACT, SQL"
 *             empresaId:
 *               type: string
 *             modalidad:
 *               type: string
 *               example: "Hibrido"
 *             estado:
 *               type: string
 *               example: "Activa"
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
    jwtRolVerify(['empresa', 'admin']),
    validateNewProject,
    projectController.postNewProject
);

/**
 * @swagger
 * /projects/:{id}:
 *   put:
 *     summary: Editar la categoría o las habilidades.
 *     tags:
 *       - Proyectos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del proyecto
 *         schema:
 *           type: string
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
    jwtRolVerify(['empresa', 'admin']),
    validateProjectUpdate,
    projectController.editProjectById
);

/**
 * @swagger
 * /projects/:{id}:
 *   delete:
 *     summary: Elimina un proyecto.
 *     tags:
 *       - Proyectos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Proyecto borrado correctamente.
 *         example:
 *           message: Proyecto ${titulo} eliminado con exito
 */
projectRouter.delete("/:id",
    jwtVerifyMiddleware.jwtVerify,
    jwtIdMatchVerifyMiddleware.jwtIdMatchVerify,
    jwtRolVerify(['empresa', 'admin']),
    projectController.deleteProjectById
);

/**
 * @swagger
 * /projects/user/:{id}:
 *   get:
 *     summary: Obtiene lps proyectos agregados por la empresa.
 *     tags:
 *       - Proyectos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Una lista de proyectos agregados por la empresa obtenidos correctamente.
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
projectRouter.get("/user/:id",
    jwtVerifyMiddleware.jwtVerify,
    jwtIdMatchVerifyMiddleware.jwtIdMatchVerify,
    jwtRolVerify(['empresa', 'admin']),
    projectController.getAllProjectsByUserId
);

export default projectRouter