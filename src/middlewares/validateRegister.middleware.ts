import { Request, Response, NextFunction } from 'express';

const validateRegisterData = (req: Request, res: Response, next: NextFunction) => {
  const { nombre, apellido, telefono, pais, tipo, email, contrasenia } = req.body;

  // Verificar nombre, email, contrasenia y confirmarContrasenia
  if (!nombre || !apellido || !telefono || !pais || !tipo || !email || !contrasenia) {
    throw { message: 'Campos obligatorios', code: 400 };
  }

  // Verificar el formato del email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw { message: 'Formato de correo electrónico no válido', code: 400 };
  }

    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

    // Verificar que no haya caracteres especiales en nombre, apellido, telefono, pais y tipo
    if (specialCharRegex.test(nombre)) {
        throw { message: 'El nombre no debe contener caracteres especiales.', code: 400 };
    }

    if (specialCharRegex.test(apellido)) {
        throw { message: 'El apellido no debe contener caracteres especiales.', code: 400 };
    }

    if (specialCharRegex.test(telefono)) {
        throw { message: 'El teléfono no debe contener caracteres especiales.', code: 400 };
    }

    if (specialCharRegex.test(pais)) {
        throw { message: 'El país no debe contener caracteres especiales.', code: 400 };
    }

    if (specialCharRegex.test(tipo)) {
        throw { message: 'El tipo no debe contener caracteres especiales.', code: 400 };
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