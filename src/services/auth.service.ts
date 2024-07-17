import * as speakeasy from "speakeasy";
import * as qrcode from "qrcode";
import { AppDataSource } from "../config/typeorm.config";
import IQrCodeData from "../interfaces/iQrCodeData.interface";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Usuario from "../entities/usuario";
import UserDto from "../dto/user.dto";

const userRepository = AppDataSource.getRepository(Usuario);

const auth2FaSetupService = async (userId: string) => {
    const secret = speakeasy.generateSecret({
        name: process.env.SPEAKEASY_NAME
    })
    try {
        const user = await findUserById(userId);

        // actualizo el secret
        await updateUserSecret2Fa(user , secret.ascii);
        //retorno la data del qr
        const qrCodeDatUrL = await qrcode.toDataURL(secret.otpauth_url);
        return qrCodeDatUrL;
        
    } catch (error) {
        throw error;
    }
}

const findUserById = async (id: string) => {
    try {
        const user = await userRepository.findOneBy({id});
        
        if (!user) throw ({
            message: `No existe el usuario con id ${id}`,
            code: 404
        });
        return user;
        
    } catch (error) {
        throw error;
    }
}

const auth2FaVerifyService = async (userId: string, token: string) => {    

    const user: Partial<Usuario> = await findUserById(userId);

    const dataVerified: IQrCodeData = {
        secret: user.autenticacion2FASecreto,
        encoding: "ascii",
        token,
    }

    try {                
        const verified = speakeasy.totp.verify(dataVerified);        
        return verified;
    } catch (error) {
        throw error;
    }
}

const updateUserSecret2Fa = async (user: Usuario, secret: string) => {

    try {

        if(!user.autenticacion2FAHabilitada) {
            await userRepository.update(user.id, {
                autenticacion2FAHabilitada: true,
                autenticacion2FASecreto: secret
            });            
        }
    } catch (error) {
        throw error;
    }
}

const createUser = async (userData: UserDto )=> {
    try {

      const existingUser = await userRepository.findOne({ where: { email: userData.email } });
      if (existingUser) {
        throw { message: 'Ya existe un usuario con este correo electrónico', code: 409 };
      }

      const hashedPassword = await bcrypt.hash(userData.contrasenia, 5);
  
      const newUser = userRepository.create({
        ...userData,
        contrasenia: hashedPassword,
      });
  
      await userRepository.save(newUser);
      
      return { message: 'Usuario creado exitosamente'};
    } catch (error) {
      throw error;
    }
  };
  
  const authLogin = async (email: string , contrasenia: string ) => {
    try {
      
      const user = await userRepository.findOne({ where: { email } });
      if (!user) {
        throw { message: 'Correo electrónico o contraseña incorrectos', code: 401 };
      }
      
      const passwordMatch = await bcrypt.compare(contrasenia, user.contrasenia);
      if (!passwordMatch) {
        throw { message: 'Correo electrónico o contraseña incorrectos', code: 401 };
      }
  
      const token = jwt.sign(
        { userId: user.id, email: user.email, tipo: user.tipo },
        process.env.JWT_SECRET,
        { expiresIn: '72h' }
      );

      user.updatedAt = new Date();
      await userRepository.save(user);
  
      return ({
        message: 'Inicio de sesión exitoso',
        refreshToken: token,
        user: {
          id: user.id,
          apellido: user.apellido,
          nombre: user.nombre,
          telefono: user.telefono,
          pais: user.pais,
          tipo: user.tipo,
          email: user.email
        }
      });
    } catch (error) {
      throw error;
  } 
};


export default {
    auth2FaSetupService,
    auth2FaVerifyService,
    createUser,
    authLogin
}