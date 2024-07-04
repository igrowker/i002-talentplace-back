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

usersRouter.put("/me", userController.editUserData)

export default usersRouter