import { Request, Response } from "express";
import authServices from "../services/auth.services";
import catchAsync from "../utils/catch-async.util";

const postAuth2FaSetup = async (req: Request, res: Response) => {
    const { userId } = req.body;
    const setupQrCode = await authServices.auth2FaSetupService(userId);
    res.status(200).json(setupQrCode);
}

const postAuth2FaVerify = async (req: Request, res: Response) => {
    const { secret, encoding, token } = req.body;
    const verifyQrCode = await authServices.auth2FaVerifyService({ secret, encoding, token });
    res.status(200).json({message: "Verificacion en proceso", verifyQrCode});
}

export default {
    postAuth2FaSetup: catchAsync(postAuth2FaSetup),
    postAuth2FaVerify: catchAsync(postAuth2FaVerify)
}