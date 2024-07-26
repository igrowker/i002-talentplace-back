import { AppDataSource } from "../config/typeorm.config"
import Aplicacion from "../entities/aplicacion"
import Usuario from "../entities/usuario";
import projectService from "./project.service";

const applicationRepository = AppDataSource.getRepository(Aplicacion);
const userRepository = AppDataSource.getRepository(Usuario);

const getApplicationsUser= async (userId: string)=>{
    try{
        const user: Usuario = await userRepository.findOneBy({id: userId});
    
        if (!user) throw ({
            message: "No existe un usuario con ese id",
            code: 404
        });

        const applications = await applicationRepository.find({
            where: {juniorId: userId}
        });

        if (applications.length === 0) return [];

        return applications;
    }
    catch (error) {
        throw error;
    }
}

const postApplyUserToProject = async (userId: string, proyectoId: string)=>{

    if(!userId || !proyectoId) throw ({
        message: "Es requisito el userId y el proyectoId",
        code: 400
    });

    try{
        await projectService.getProjectByIdService(proyectoId);

        const verifyExistingApplication = await applicationRepository.findOne({
            where: {
                proyectoId,
                juniorId: userId
            }
        });

        if(verifyExistingApplication) throw({
            message: "Ya aplicaste a este proyecto",
            code: 302
        });
            
        const newApplication = new Aplicacion();
        newApplication.proyectoId = proyectoId;
        newApplication.juniorId = userId;
        newApplication.estado = true;    
        
        await applicationRepository.save(newApplication);

        return {message: "Aplicacion realizada, ¡mucha suerte!"}
    }

    catch (error) {
        throw error;
    }
}

export default {
    getApplicationsUser,
    postApplyUserToProject
}