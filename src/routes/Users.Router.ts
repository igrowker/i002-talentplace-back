import { Router } from "express";
import UsersController from "../controllers/User.Controller";

const usersRouter: Router = Router();

usersRouter.get("/me", UsersController.getUserValidate)

usersRouter.put("/me", UsersController.editUserData)


export default usersRouter