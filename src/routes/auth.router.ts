import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import JwtVerifyMiddleware from "../middlewares/jwtVerify.middleware";

const authRouter: Router = Router();

authRouter.post("/2fa/setup", JwtVerifyMiddleware.jwtVerify , AuthController.postAuth2FaSetup);
authRouter.post("/2fa/verify", AuthController.postAuth2FaVerify);

export default authRouter;