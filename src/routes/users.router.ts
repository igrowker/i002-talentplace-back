import { Router } from "express";
import userController from "../controllers/user.controller";
import jwtVerifyMiddleware from "../middlewares/jwtVerify.middleware";

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
usersRouter.get("/me", jwtVerifyMiddleware.jwtVerify, userController.getUserProfile);

usersRouter.put("/me", jwtVerifyMiddleware.jwtVerify, userController.editUserData);

export default usersRouter