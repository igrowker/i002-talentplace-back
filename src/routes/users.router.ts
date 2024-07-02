import { Router } from "express";
//import UsersController from "../controllers/Users.Controller";
// aqui ira la validación de usuario de 2FA

const usersRouter: Router = Router();

usersRouter.get("/me", (_req, res)=>{
    //Mostrar el usuario luego de ser validado
    try{}
    catch{}
})

usersRouter.put("/me", (_req, res)=>{
    //Actualizar info del user
    try{}
    catch{}
})

export default usersRouter