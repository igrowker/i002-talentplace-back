import express, { NextFunction, Request, Response } from "express"
import router from "./routes/principal.router"
import cors from "cors"
import IError from "./interfaces/iError.interface";
import rateLimit from "express-rate-limit";
import { loggerGlobal } from "./middlewares/logger.middleware";

// const limiter = rateLimit({
//   windowMs: 10 * 60 * 1000,
//   max: 100,
//   message: 'Demasiadas solicitudes desde esta IP, por favor intente de nuevo después de 15 minutos'
// });

const server = express();
server.use(cors());
server.use(express.json());
server.use(loggerGlobal);
// server.use(limiter);
server.use(router);

// manejo los errores y los muestra en .json
server.use((err: IError , req: Request, res: Response, next: NextFunction ) => {
    res.status(err.code || 500).json(err);
});

export default server;
