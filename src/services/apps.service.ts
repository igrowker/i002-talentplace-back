import { AppDataSource } from "../config/typeorm.config"
import Aplicacion from "../entities/aplicacion"
import Usuario from "../entities/usuario";

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

        if (applications.length === 0) return {message: "No tienes ninguna aplicacion"}

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

        if(!verifyExistingProject) throw ({
            message: "No se encontro el proyecto en la base de datos",
            code: 404
        })

        const verifyExistingApplication = await applicationRepository.findOne({
            where: {proyectoId: proyectoId, juniorId: userId}
        })

        if(verifyExistingApplication) throw({
            message: "El junior ya ha aplicado a este proyecto",
            code: 302
        })

        if(verifyExistingProject.estado) throw ({
            message: "Este proyecto ya ha sido aplicado",
            code: 302
        })

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