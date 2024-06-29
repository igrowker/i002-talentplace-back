import * as speakeasy from "speakeasy";
import * as qrcode from "qrcode";
import QrCodeDataDto from "../dto/IQrCodeData.dto";
import { AppDataSource } from "../config/typeorm.config";

const auth2FaSetupService = async (userId: string) => {
    const secret = speakeasy.generateSecret({
        name: process.env.SPEAKEASY_NAME
    })
    try {
        //LOGICA PARA INSERTAR el secreto a la columna 2fa_secret de cada userId
        console.log({userId});        

        const qrCodeDatUrL = await qrcode.toDataURL(secret.otpauth_url);
        return qrCodeDatUrL;        
        
    } catch (error) {
        throw error;
    }
}

const auth2FaVerifyService = async (codeData: QrCodeDataDto) => {

    // data temporal
    const dataTemp: QrCodeDataDto = {
        secret: "ER%u9wHPDH:<7l{N$UvM&w3UnMN^5sMf",
        encoding: "ascii",
        token: "851056"
    }

    try {                
        const verified = speakeasy.totp.verify(dataTemp);
        return verified;
    } catch (error) {
        throw error;
    }
}

const updateUserSecret2Fa = async (userId: string, secret: string) => {

    // Logica para actualizar el secreto del usuario en la base de datos
    // const user = await AppDataSource.getRepository(User);
}


export default {
    auth2FaSetupService,
    auth2FaVerifyService
}