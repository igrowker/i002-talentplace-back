import * as speakeasy from "speakeasy";
import * as qrcode from "qrcode";
import { AppDataSource } from "../config/typeorm.config";
import IQrCodeData from "../interfaces/iQrCodeData.interface";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Usuario from "../entities/usuario";

const userRepository = AppDataSource.getRepository(Usuario);

const auth2FaSetupService = async (userId: number) => {
    const secret = speakeasy.generateSecret({
        name: process.env.SPEAKEASY_NAME
    })
    try {
        const user:Partial<Usuario> = await findUserById(userId);

        // actualizo el secret
        await updateUserSecret2Fa(user , secret.ascii);
        //retorno la data del qr
        const qrCodeDatUrL = await qrcode.toDataURL(secret.otpauth_url);
        return qrCodeDatUrL;
        
    } catch (error) {
        throw error;
    }
}

const findUserById = async (id: number) => {
    try {
        const user = await userRepository.findOneBy({id});
        
        if (!user) throw ({
            message: `No existe el usuario con id ${id}`,
            code: 404,
            error: "ID inválido"
        });
        return user;
        
    } catch (error) {
        throw error;
    }
}

const auth2FaVerifyService = async (userId: number, token: string) => {    

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

const updateUserSecret2Fa = async (userId: Partial<Usuario>, secret: string) => {

    try {

        if(!userId.autenticacion2FAHabilitada) {
            await userRepository.update(userId, {
                autenticacion2FAHabilitada: true,
                autenticacion2FASecreto: secret
            });            
        }
    } catch (error) {
        throw error;
    }
}

const createUser = async (nombre: string, contrasenia: string, email: string, tipo: string): Promise<Usuario> => {
    try {
      const hashedPassword = await bcrypt.hash(contrasenia, 10);
  
      const newUser = userRepository.create({
        nombre,
        contrasenia: hashedPassword,
        email,
        tipo,
      });
  
      await userRepository.save(newUser);
  
      return newUser;
    } catch (error) {
      throw error;
    }
  };
  
  const authLogin = async (email: string , contrasenia: string ) => {
    try {
    
      const user = await userRepository.findOne({ where: { email } });
      if (!user) {
        throw {
          message: 'No existe el usuario',
          code: 404,
          error: 'Usuario incorrecto'
        };
      }
  
      const passwordMatch = await bcrypt.compare(contrasenia, user.contrasenia);
      if (!passwordMatch) {
        throw {
          message: 'Contraseña incorrecta',
          code: 401,
          error: 'Contraseña incorrecta'
        };
      }
  
      const token = jwt.sign(
        { userId: user.id, username: user.nombre },
        process.env.JWT_SECRET,
        { expiresIn: '48h' }
      );

      user.updatedAt = new Date();
      await userRepository.save(user);
  
      return {
        message: 'Inicio de sesión exitoso',
        refreshToken: token
      };
  
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