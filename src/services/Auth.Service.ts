import * as speakeasy from "speakeasy";
import * as qrcode from "qrcode";
import { AppDataSource } from "../config/typeorm.config";
import Usuarios from "../entities/usuario";
import IQrCodeData from "../interfaces/IQrCodeData.interface";

const UserRepository = AppDataSource.getRepository(Usuarios);

const auth2FaSetupService = async (userId: number) => {
    const secret = speakeasy.generateSecret({
        name: process.env.SPEAKEASY_NAME
    })
    try {
        const user:Partial<Usuarios> = await findUserById(userId);

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
        const user = await UserRepository.findOneBy({id});
        
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

    const user: Partial<Usuarios> = await findUserById(userId);

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

const updateUserSecret2Fa = async (userId: Partial<Usuarios>, secret: string) => {

    try {

        if(!userId.autenticacion2FAHabilitada) {
            await UserRepository.update(userId, {
                autenticacion2FAHabilitada: true,
                autenticacion2FASecreto: secret
            });            
        }
    } catch (error) {
        throw error;
    }
}


export default {
    auth2FaSetupService,
    auth2FaVerifyService
}