import { Request, Response, NextFunction } from 'express';

const validateLoginData = (req: Request, res: Response, next: NextFunction) => {
  const { email, contrasenia } = req.body;
  if (!email || !contrasenia) {
    return res.status(400).json({ message: 'Correo electrónico y contraseña son obligatorios' });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Formato de correo electrónico no válido' });
  }
  next();
};

export default validateLoginData;
