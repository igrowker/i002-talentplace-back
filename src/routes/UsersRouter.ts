import { Router } from "express";
import UsersController from "../controllers/User.Controllers";
// aqui ira la validación de usuario de 2FA

const usersRouter: Router = Router();

usersRouter.get("/me", UsersController.getUserValidate)

usersRouter.put("/me", UsersController.editUserData)

export default usersRouter