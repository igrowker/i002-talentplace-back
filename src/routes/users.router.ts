import { Router } from "express";
import userController from "../controllers/user.controller";

const usersRouter: Router = Router();


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
 */
usersRouter.get("/me", userController.getUserValidate)

/**
 * @swagger
 * /api/v1/users/me:
 *   put:
 *     summary: Actualiza los datos del usuario actual.
 *     tags:
 *       - Usuarios
 *     responses:
 *       200:
 *         description: Datos del usuario actualizados correctamente.
 */

usersRouter.put("/me", userController.editUserData)

export default usersRouter