import { Request, Response, NextFunction } from 'express';

const validateRegisterData = (req: Request, res: Response, next: NextFunction) => {
  const { nombre, apellido, telefono, pais, email, contrasenia } = req.body;

  // Verificar nombre, email, contrasenia y confirmarContrasenia
  if (!nombre || !apellido || !telefono || !pais || !email || !contrasenia) {
    throw { message: 'Campos obligatorios', code: 400 };
  }

  // Verificar el formato del email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw { message: 'Formato de correo electrónico no válido', code: 400 };
  }

  // Función para validar la fortaleza de la contraseña
  const validatePasswordStrength = (password: string): boolean => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
  };
  if (!validatePasswordStrength(contrasenia)) {
    throw { message: 'La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un número', code: 400 };
  }

  // // Verificar que la contraseña y la confirmación coincidan
  // if (contrasenia !== confirmarContrasenia) {
  //   throw { message: 'Las contraseñas no coinciden', code: 400 };
  // }

  next();
};

export default validateRegisterData;

