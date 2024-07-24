import { Router } from "express";
import JwtVerifyMiddleware from "../middlewares/jwtVerify.middleware";
import authController from "../controllers/auth.controller";
import rateLimiter from "../middlewares/rateLimited.middleware";
import validateLoginData from "../middlewares/validateLogin.middleware"
import validateRegisterData from "../middlewares/validateRegister.middleware";

const authRouter: Router = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registro de usuario
 *     tags:
 *       - Autenticación
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Datos para registro
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             nombre:
 *               type: string
 *               example: "Juanito"
 *             apellido:
 *               type: string
 *               example: "Pruebas"
 *             numero:
 *               type: string
 *               example: "080808080808"
 *             email:
 *               type: string
 *               example: "prueba123@gmail.com"
 *             contrasenia:
 *               type: string
 *               example: "User123."
 *             tipo:
 *               type: string
 *               example: junior
 *     responses:
 *       200:
 *         description: Estado de registro de usuario
 *         content:
 *           application/json:
 *             example:
 *               message: "Usuario creado exitosamente"
 *       409:
 *         description: Ya existe un usuario con este correo electrónico
 */
authRouter.post("/register", validateRegisterData, authController.postUser);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Logueo de usuario
 *     tags:
 *       - Autenticación
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Datos para iniciar sesión
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               example: "leoausa@gmail.com"
 *             contrasenia:
 *               type: string
 *               example: "User123."
 *     responses:
 *       200:
 *         description: Estado de inicio de sesión del usuario
 *         content:
 *           application/json:
 *             example:
 *               message: "Inicio de sesión exitoso"
 *               refreshToken: https://example.com/qr-code.png
 *               user:
 *                 id: string
 *                 apellido: string
 *                 nombre: string
 *                 telefono: string
 *                 país: string
 *                 tipo: junior/empresa
 *                 email: string
 *       401:
 *         description: Correo electrónico o contraseña incorrectos
 */
authRouter.post("/login", validateLoginData, authController.authLogin);

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



export default authRouter;