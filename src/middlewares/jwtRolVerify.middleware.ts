
import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import catchAsync from "../utils/catchAsync.util";

const jwtRolVerify = (roles: string[]) => {

    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {

        const userPayload = req.user as JwtPayload;
        //sin rol y payload
        if (!userPayload || !userPayload.tipo) throw ({
            message: 'No tienes permiso para acceder a esta sección.',
            code: 403
        });
        //busco rol
        const hasRequiredRole = roles.some(role => userPayload.tipo.includes(role));

        if (!hasRequiredRole) throw ({
            message: 'No tienes permiso para acceder a esta sección.',
            code: 403
        });

        return next();
    });

}

export default jwtRolVerify;