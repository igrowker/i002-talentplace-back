import { Request, Response, NextFunction } from 'express';

const validateProjectUpdate = (req: Request, res: Response, next: NextFunction) => {
    const { projectId, categoria, habilidades } = req.body;

    const specialCharRegex = /[@#$%^&*()"{}|<>]/;

    if (!projectId || typeof projectId !== 'string' || specialCharRegex.test(projectId)) {
      throw { message: 'El id del proyecto es necesario y debe ser texto.', code: 400 };
    }

    if (!categoria || typeof categoria !== 'string' || specialCharRegex.test(categoria)) {
      throw { message: 'La categoría del proyecto es obligatoria y debe ser texto', code: 400 };
    }

    if (!Array.isArray(habilidades) || habilidades.some(h => typeof h !== 'string' || specialCharRegex.test(h))) {
      throw { message: 'Las habilidades del proyecto son obligatorias y debe ser texto', code: 400 };
    }

    next();
};

export default validateProjectUpdate;
