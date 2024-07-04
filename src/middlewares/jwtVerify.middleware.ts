import { NextFunction, Request, Response } from 'express';
import jwtService from "jsonwebtoken";
import CustomJwtPayload from '../interfaces/iPayloadCustom.interface';
import catchAsync from '../utils/catchAsync.util';

const jwtVerify = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {

    const isToken = req.headers['authorization'];

    if (!isToken) throw ({
        message: 'Necesitas loguearte para acceder a esta seccion.',
        code: 401
    });

    const token = req.headers['authorization'].split(' ')[1] ?? '';
    const secret = process.env.JWT_SECRET;

    try {
        const payload = jwtService.verify(token, secret) as CustomJwtPayload;        
        payload.iatDate = new Date(payload.iat * 1000); // emitido
        payload.expDate = new Date(payload.exp * 1000); // expiracion

        payload.tipo =
          payload.tipo === 'admin'
            ? ['admin']
            : payload.tipo === 'empresa'
              ? ['empresa']
              : ['junior'];  
        req.user = payload;
  
        return next();
      } catch (error) {
        throw ({
            message: 'Token invalido o vencido.',
            code: 401
        });;
      }
};

export default {
    jwtVerify: catchAsync(jwtVerify)
}
