import { Request, Response, NextFunction } from 'express';

const validateProjectUpdate = (req: Request, res: Response, next: NextFunction) => {
    const { projectId, categoria, habilidades } = req.body;

    if (projectId !== undefined && typeof projectId !== 'string') {
      throw { message: 'El id del proyecto es necesario y debe ser texto.', code: 400 };
    }

    if (categoria !== undefined && typeof categoria !== 'string') {
      throw { message: 'La categoria es obligatoria y debe ser texto.', code: 400 };
    }

    if (habilidades !== undefined && !Array.isArray(habilidades)) {
      throw { message: 'Las habilidades son obligatorias y debe ser texto.', code: 400 };
    }

    next();
};

export default validateProjectUpdate;
