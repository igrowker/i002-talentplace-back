import { Router } from "express";
import userController from "../controllers/user.controller";
import jwtVerifyMiddleware from "../middlewares/jwtVerify.middleware";
import jwtIdMatchVerifyMiddleware from "../middlewares/jwtIdMatchVerify.middleware";
import jwtRolVerify from "../middlewares/jwtRolVerify.middleware";

const usersRouter: Router = Router();

usersRouter.get("/",
    jwtVerifyMiddleware.jwtVerify,
    jwtRolVerify(["admin"]),
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
 */
usersRouter.get("/me",
    jwtVerifyMiddleware.jwtVerify,
    jwtIdMatchVerifyMiddleware.jwtIdMatchVerify,
    jwtRolVerify(["admin", "junior"]),
    userController.getUserProfile
);

usersRouter.put("/me",
    jwtVerifyMiddleware.jwtVerify,
    jwtIdMatchVerifyMiddleware.jwtIdMatchVerify,
    jwtRolVerify(["admin", "junior"]),
    userController.editUserData
);

export default usersRouter