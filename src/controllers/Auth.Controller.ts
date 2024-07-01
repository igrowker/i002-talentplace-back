import { Request, Response } from "express";
import authServices from "../services/Auth.Service";
import catchAsync from "../utils/CatchAsync.Util";

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
    postAuth2FaVerify: catchAsync(postAuth2FaVerify)
}