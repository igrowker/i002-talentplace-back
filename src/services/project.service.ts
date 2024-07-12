import { AppDataSource } from "../config/typeorm.config";
import Proyecto from "../entities/proyecto";
import Usuario from "../entities/usuario";


const projectRepository = AppDataSource.getRepository(Proyecto);
const userRepository = AppDataSource.getRepository(Usuario);

const getAllProjectsService = async () =>{

    try {        
        const projects: Proyecto[] = await projectRepository.find();
        return projects
    } catch (error) {
        throw error;
    }
}

export default {
    getAllProjectsService,
}