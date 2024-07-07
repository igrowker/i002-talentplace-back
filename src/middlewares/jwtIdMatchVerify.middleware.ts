import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync.util";
import { JwtPayload } from "jsonwebtoken";

const jwtIdMatchVerify = async (req: Request, res: Response, next: NextFunction) => {
    //data payload
    const userPayloadData = req.user as JwtPayload;
    //data de param o body
    const { id } = req.body;

    if(userPayloadData.userId !== id) throw ({
        message: 'Error en la validacion de datos, ingresa con tu cuenta.',
        code: 401
    })

    return next()
}
export default {
    jwtIdMatchVerify: catchAsync(jwtIdMatchVerify)
}