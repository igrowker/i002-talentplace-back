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
            code: 404
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

const createUser = async (nombre: string, contrasenia: string, email: string)=> {
    try {

      const existingUser = await userRepository.findOne({ where: { email } });
      if (existingUser) {
        throw { message: 'Ya existe un usuario con este correo electrónico', code: 409 };
      }

      const hashedPassword = await bcrypt.hash(contrasenia, 5);
  
      const newUser = userRepository.create({
        nombre,
        contrasenia: hashedPassword,
        email,
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
          nombre: user.nombre,
          email: user.email,
          tipo: user.tipo
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