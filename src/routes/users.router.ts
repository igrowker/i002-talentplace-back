import { Router } from "express";
import userController from "../controllers/user.controller";
import jwtVerifyMiddleware from "../middlewares/jwtVerify.middleware";
import jwtIdMatchVerifyMiddleware from "../middlewares/jwtIdMatchVerify.middleware";
import jwtRolVerify from "../middlewares/jwtRolVerify.middleware";

const usersRouter: Router = Router();

/**
 * @swagger
 * /api/v1/users/:
 *   get:
 *     summary: Obtiene los detalles de todos los usuarios.
 *     tags:
 *       - Usuarios
 *     responses:
 *       200:
 *         description: Detalles de los usuarios obtenidos correctamente.
 *         example:
 *           - id: string
 *             nombre: string
 *             email: string
 *             tipo: junior/empresa
 *             autenticacion2FAHabilitada: boolean
 *           - id: string
 *             nombre: string
 *             email: string
 *             tipo: junior/empresa
 *             autenticacion2FAHabilitada: boolean
 */
usersRouter.get("/",
    // jwtVerifyMiddleware.jwtVerify,
    // jwtRolVerify(["admin"]),
    userController.getAllUsers
);

/**
 * @swagger
 * /api/v1/users/me:
 *   get:
 *     summary: Obtiene los detalles del usuario actual.
 *     tags:
 *       - Usuarios
 *     responses:
 *       200:
 *         description: Detalles del usuario obtenidos correctamente.
 *         example:
 *           id: string
 *           nombre: string
 *           email: string
 *           tipo: junior/empresa
 */
usersRouter.get("/me",
    jwtVerifyMiddleware.jwtVerify,
    jwtIdMatchVerifyMiddleware.jwtIdMatchVerify,
    jwtRolVerify(["admin", "junior"]),
    userController.getUserProfile
);

/**
 * @swagger
 * /api/v1/users/me:
 *   put:
 *     summary: Edita los detalles del usuario actual.
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Datos a editar del usuario actual
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             email:
 *               type: string
 *     responses:
 *       200:
 *         description: Edición de los detalles del usuario elaborados correctamente.
 *         example:
 *           name: string
 *           email: string
 *           tipo: junior/empresa
 */
usersRouter.put("/me",
    jwtVerifyMiddleware.jwtVerify,
    jwtIdMatchVerifyMiddleware.jwtIdMatchVerify,
    jwtRolVerify(["admin", "junior"]),
    userController.editUserData
);

export default usersRouter