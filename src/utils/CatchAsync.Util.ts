import { NextFunction, Request, Response } from "express";

// Definir el tipo de la función controller  <= sugerencia chatgpt
type ControllerFunction = (req: Request, res: Response, next: NextFunction)  => Promise<void>;

// function de orden superior que recibe el controller y si tiene un error lo envia al manejador de errores de express
const catchAsync = (controller: ControllerFunction) => {
    return (req: Request, res: Response, next: NextFunction) => {
        controller(req, res, next).catch((err) => next(err));
    };
}; 

export default catchAsync;