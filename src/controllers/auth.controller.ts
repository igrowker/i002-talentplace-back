import { Request, Response } from "express";
import authServices from "../services/auth.service";
import catchAsync from "../utils/catchAsync.util";

const postUser= async (req: Request, res: Response) => {
    const { nombre, apellido, telefono, pais, email, contrasenia } = req.body;
    const createUser = await authServices.createUser( nombre, apellido, telefono, pais, email, contrasenia );
    res.status(200).json(createUser);
  }; 
  
  const authLogin = async (req: Request, res: Response) => {
    const { email , contrasenia } = req.body;
    const userLogin = await authServices.authLogin( email, contrasenia );
      res.status(200).json(userLogin);
  }

const postAuth2FaSetup = async (req: Request, res: Response) => {
    const { userId } = req.body;
    const setupQrCode = await authServices.auth2FaSetupService(userId);
    res.status(200).json(setupQrCode);
}

const postAuth2FaVerify = async (req: Request, res: Response) => {
    const { userId, token } = req.body;
    const verifyStatus = await authServices.auth2FaVerifyService(userId, token);
    res.status(200).json({message: "Verificacion realizada con exito", verifyStatus});
}

export default {
    postAuth2FaSetup: catchAsync(postAuth2FaSetup),
    postAuth2FaVerify: catchAsync(postAuth2FaVerify),
    postUser: catchAsync(postUser),
    authLogin: catchAsync(authLogin)
}