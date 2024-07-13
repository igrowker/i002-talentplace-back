import { AppDataSource } from "../config/typeorm.config"
import Aplicacion from "../entities/aplicacion"

const applicationRepository = AppDataSource.getRepository(Aplicacion);

const getApplicationsUser= async (userId: string)=>{
    try{
        const applications = await applicationRepository.find({
            where: {juniorId: userId}
        });

        return applications;
    }
    catch (error) {
        throw error;
    }
}

const postApplyUserToProject = async (userId: string, proyectoId: string)=>{

    try{
        const verifyExistingProject = await applicationRepository.findOne({
            where: {proyectoId: proyectoId}
        })

        if(!verifyExistingProject){
            throw new Error("No se encontro el proyecto en la base de datos");
        }

        const verifyExistingApplication = await applicationRepository.findOne({
            where: {proyectoId: proyectoId, juniorId: userId}
        })

        if(verifyExistingApplication){
            throw new Error("El junior ya ha aplicado a este proyecto");
        }

        if(verifyExistingProject.estado){
            throw new Error("Este proyecto ya ha sido aplicado");
        }

        verifyExistingProject.estado = true;
        await applicationRepository.save(verifyExistingProject);

        const newApplication = new Aplicacion();
            newApplication.proyectoId = proyectoId;
            newApplication.juniorId = userId;
            newApplication.estado = true;

        await applicationRepository.save(newApplication);
        return console.log("Aplicacion realizada con exito")
    }

    catch (error) {
        throw error;
    }
}

export default {
    getApplicationsUser,
    postApplyUserToProject
}