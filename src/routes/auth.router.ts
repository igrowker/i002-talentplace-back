import { Router } from "express";
import JwtVerifyMiddleware from "../middlewares/jwtVerify.middleware";
import authController from "../controllers/auth.controller";
import rateLimiter from "../middlewares/rateLimited.middleware";
import validateLoginData from "../middlewares/validateLogin.middleware"
import validateRegisterData from "../middlewares/validateRegister.middleware";

const authRouter: Router = Router();

/**
 * @swagger
 * /auth/2fa/setup:
 *   post:
 *     summary: Configuración de autenticación de dos factores (2FA)
 *     tags:
 *       - Autenticación
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Datos para configurar 2FA
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             userId:
 *               type: number
 *   
 *     responses:
 *       200:
 *         description: QR Code generado para la configuración de 2FA
 *         content:
 *           application/json:
 *             example:
 *               qrCodeUrl: "https://example.com/qr-code.png"
 */
authRouter.post("/2fa/setup", JwtVerifyMiddleware.jwtVerify , authController.postAuth2FaSetup);


/**
 * @swagger
 * /auth/2fa/verify:
 *   post:
 *     summary: Verificación de autenticación de dos factores (2FA)
 *     tags:
 *       - Autenticación
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Datos para verificar 2FA
 *         required: true
 *         schema:
 *           type: object
 *           properties:
  *             nombre:
 *               type: string
 *             email:
 *               type: string
 *             contrasenia:
 *               type: string
 *             tipo:
 *               type: string
 *     responses:
 *       200:
 *         description: Estado de verificación de 2FA
 *         content:
 *           application/json:
 *             example:
 *               message: "Verificación realizada con éxito"
 *               verifyStatus: true
 */
authRouter.post("/2fa/verify", authController.postAuth2FaVerify);
authRouter.post("/register", validateRegisterData, authController.postUser);
authRouter.post("/login", validateLoginData, authController.authLogin);

export default authRouter;