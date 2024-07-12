import { NextFunction, Request, Response } from "express";
import IError from "../interfaces/iError.interface";

// Definir el tipo de la función controller  <= sugerencia chatgpt
type ControllerFunction = (req: Request, res: Response, next: NextFunction)  => Promise<void>;

// function de orden superior que recibe el controller y si tiene un error lo envia al manejador de errores de express
const catchAsync = (controller: ControllerFunction) => {
    return (req: Request, res: Response, next: NextFunction) => {
        controller(req, res, next).catch((err) => {

            //hardcodeo la estructura del error
            const errorDb: IError = {
                message: err.message,
                code: err.code,
                detail: err.detail,
                hint: err.hint,
                schema: err.schema,
                table: err.table,
                column: err.column,
                constraint: err.constraint
            };

            errorDb.table ? next({errorDb}) : next(err);

        });
    };
}; 

export default catchAsync;