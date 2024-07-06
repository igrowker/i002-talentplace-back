import { Request, Response, NextFunction } from 'express';

const validateRegisterData = (req: Request, res: Response, next: NextFunction) => {
  const { nombre, email, contrasenia, confirmarContrasenia } = req.body;

  // Verifica la presencia de nombre, email, contrasenia y confirmarContrasenia
  if (!nombre || !email || !contrasenia || !confirmarContrasenia) {
    return res.status(400).json({ message: 'Nombre, correo electrónico, contraseña y confirmación de contraseña son obligatorios' });
  }

  // Verifica el formato del email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Formato de correo electrónico no válido' });
  }

  // Verifica que la contraseña y la confirmación de la contraseña coincidan
  if (contrasenia !== confirmarContrasenia) {
    return res.status(400).json({ message: 'Las contraseñas no coinciden' });
  }

  next();
};

export default validateRegisterData;
