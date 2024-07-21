
import { AppDataSource } from "../config/typeorm.config";
import * as bcrypt from "bcryptjs";
import Usuario from "../entities/usuario";
import { preloadUsers } from "./usersData.helper";
import Proyecto from "../entities/proyecto";
import { preloadProjects } from "./projectsData.helper";
import Categoria from "../entities/categoria";
import { Habilidad } from "../entities/habilidad";
import habilityService from "../services/hability.service";
import categoryService from "../services/category.service";

const UserRepository = AppDataSource.getRepository(Usuario);
const ProjectRepository = AppDataSource.getRepository(Proyecto);

export const preloadUsersData = async () => {
    await AppDataSource.manager.transaction(async (transactionalEntityManager) => {

        const users = await UserRepository.find();
        
        if(users.length)
            return console.log(`No se hizo precarga de usuarios porque ya hay ${users.length} usuarios cargados`);            

        // users
        for await(const user of preloadUsers) {
            const newUser = await UserRepository.create({
                ...user,
                contrasenia: await bcrypt.hash(user.contrasenia, 10)
            });
            await transactionalEntityManager.save(newUser);
        }

        console.log("Precarga de Usuarios del Preload realizada con éxito");        

    })

    await AppDataSource.manager.transaction(async (transactionalEntityManager) => {

        //user con rol empresa
        const userCompany = await UserRepository.findOneBy({email: "nicoausa@gmail.com"});               
        
        //proyectos
        for await(const project of preloadProjects) {

            const existingProject = await ProjectRepository.findOne({
                where: { titulo: project.titulo },
                relations: ['categoria', 'habilidades']
            });

            //agrego categoria
            const category: Categoria = await categoryService.postNewCategory(project.categoria);
            //agrego habilidades
            const habilities: Habilidad[] = await habilityService.postNewHability(project.habilidades);
            //update project
            if (existingProject) {
                existingProject.categoria = category;
                existingProject.habilidades = habilities;
                existingProject.empresaNombre = userCompany.nombre;
    
                await transactionalEntityManager.save(existingProject);
            } else {
                const newProject = ProjectRepository.create({
                    ...project,
                    empresaId: userCompany.id,
                    empresaNombre: userCompany.nombre,
                    categoria: category,
                    habilidades: habilities
                });
                await transactionalEntityManager.save(newProject);
            }
        }

        console.log("Precarga de Proyectos del Preload realizada con éxito");        
        
    })
}