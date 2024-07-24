import { Router } from "express";
import appsController from "../controllers/apps.controller";
import jwtVerifyMiddleware from "../middlewares/jwtVerify.middleware";

const appsRouter: Router = Router();

/**
 * @swagger
 * /applications/:{userId}:
 *   get:
 *     summary: Obtiene una lista de aplicaciones del usuario autenticado
 *     tags:
 *       - Aplicación
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         description: ID del usuario autenticado
 *         required: true
 *         schema:
 *           type: string
 *   
 *     responses:
 *       200:
 *         description: Lista de aplicaciones de proyectos del usuario
 *         content:
 *           application/json:
 *             example:
 *               - { id: 1, proyectoId: "abc123", juniorId: "user123", estado: true }
 *               - { id: 2, proyectoId: "def456", juniorId: "user123", estado: false }
 *       404:
 *         description: No se encontraron aplicaciones para el usuario.
 */
appsRouter.get("/", jwtVerifyMiddleware.jwtVerify, appsController.getAllApplicationsUserValidate)


/**
 * @swagger
 * /applications/:{userId}:
 *   post:
 *     summary: Cargar la aplicación a un proyecto del usuario
 *     tags:
 *       - Aplicación
 *     parameters:
 *       - in: path
 *         name: userId
 *         description: ID del usuario autenticado
 *         required: true
 *       - in: body
 *         name: application
 *         description: Datos de la aplicación
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             userId:
 *               type: string
 *             proyectoId:
 *               type: string
 *   
 *     responses:
 *       200:
 *         description: Se verifica que el proyecto exista y que el usuario no aplicara ya antes de ser así tendrá otras respuestas validadas
 *         content:
 *           application/json:
 *             example:
 *               Aplicacion realizada con exito!
 *             
 *       400:
 *         description: El formato de los datos enviados es incorrecto o faltan campos requeridos.
 *       404:
 *         description: No se encontraron aplicaciones para el usuario o el proyecto no existe.
 */
//appsRouter.post("/", jwtVerifyMiddleware.jwtVerify, appsController.postApplyToProject)
appsRouter.post("/", appsController.postApplyToProject)

export default appsRouter