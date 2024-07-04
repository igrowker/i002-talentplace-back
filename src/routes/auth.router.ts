import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import JwtVerifyMiddleware from "../middlewares/jwtVerify.middleware";

const authRouter: Router = Router();

/**
 * @swagger
 * /api/v1/auth/2fa/setup:
 *   post:
 *     summary: Configura la autenticación de doble factor (2FA) para un usuario.
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       description: Datos necesarios para configurar 2FA.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *               contrasenia:
 *                 type: string
 *               tipo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Código QR generado para la configuración de 2FA.
 */
authRouter.post("/2fa/setup", JwtVerifyMiddleware.jwtVerify , AuthController.postAuth2FaSetup);

/**
 * @swagger
 * /api/v1/auth/2fa/verify:
 *   post:
 *     summary: Verifica el token de autenticación de doble factor (2FA).
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       description: Datos necesarios para verificar el token.
 *       required: true
 *       content:
 *         application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      userId:
 *                          type: number
 *                      token:
 *                          type: string
 *     responses:
 *       200:
 *         description: Estado de verificación del token.
 */
authRouter.post("/2fa/verify", AuthController.postAuth2FaVerify);

export default authRouter;