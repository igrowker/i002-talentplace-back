
import { AppDataSource } from "../config/Typeorm.config";
import Usuarios from "../entities/Usuario";
import { preloadUsers } from "./UsersData.Helper";

const UserRepository = AppDataSource.getRepository(Usuarios);

export const preloadUsersData = async () => {
    await AppDataSource.manager.transaction(async (transactionalEntityManager) => {

        const users = await UserRepository.find();
        
        if(users.length) return console.log(`No se hizo precarga de datos porque ya hay ${users.length} datos cargados`);
        // users
        for await(const user of preloadUsers) {
            const newUser = await UserRepository.create(user);
            await transactionalEntityManager.save(newUser);
        }
        console.log("Precarga de Usuarios del Preload realizada con éxito");        
    })
}