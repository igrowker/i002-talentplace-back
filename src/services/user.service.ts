import { Not } from "typeorm";
import bcrypt from "bcryptjs";
import { AppDataSource } from "../config/typeorm.config"
import Usuario from "../entities/usuario"
import habilityService from "./hability.service";

const userRepository = AppDataSource.getRepository(Usuario);

const getUserProfileByIdService = async (userId: string) => {
    //mediante querys
    const userByQuery: Usuario = await userRepository.createQueryBuilder('usuarios')
    .select(["usuarios.id", "usuarios.nombre", "usuarios.email", "usuarios.tipo", "usuarios.autenticacion2FAHabilitada", "usuarios.updatedAt"])
    .where({id: userId})
    .getOne();
    
    const user: Usuario = await userRepository.findOneBy({id: userId});
    
    if (!userByQuery || !user) throw ({
        message: "No existe un usuario con ese id",
        code: 404
    });
    
    //destructurando
    const { id, nombre, apellido, email, tipo, telefono, pais, autenticacion2FAHabilitada, updatedAt } = user;
    return { id , nombre, apellido, email, tipo, telefono, pais, autenticacion2FAHabilitada, updatedAt };
}

const editUserProfileService = async (id: string, userData) => {
    
    const userByQuery: Usuario = await userRepository.createQueryBuilder('usuarios')
        .where({ id })
        .getOne();

    if (!userByQuery) throw ({
        message: "No existe un usuario con ese id",
        code: 404
    });

    if (userData.email) {
        //mediante querys
        // const existingUserWithEmail: Usuario = await userRepository.createQueryBuilder('usuarios')
        //   .where('usuarios.email = :email', { email: userData.email })
        //   .andWhere('usuarios.id != :id', { id })
        //   .getOne();

        //mediante otro metodo
        const existingUserWithEmail: Usuario = await userRepository.findOne({
            where: {
                email: userData.email,
                id: Not(id)
            }
        });

        if (existingUserWithEmail) throw ({
            message: "El correo electrónico ya está en uso, ingrese otro",
            code: 409
        });
    };

    if(!userData.contrasenia) {
        Object.assign(userByQuery, userData);
    }
    else {
        const passwordMatch = await bcrypt.compare(userData.contrasenia, userByQuery.contrasenia);
        if (!passwordMatch) {
          throw { message: 'La contraseña ingresada no es la correcta', code: 401 };
        };
    
        // Actualiza las propiedades del objeto con los datos proporcionados en userData
        const hashedPassword = await bcrypt.hash(userData.nuevaContrasenia, 5);
        Object.assign(userByQuery, {
            ...userData,
            contrasenia: hashedPassword,
        });
    };
    
    await userRepository.save(userByQuery);

    const { nombre, apellido, email, tipo, telefono, pais, autenticacion2FAHabilitada, updatedAt } = userByQuery;
    return { id , nombre, apellido, email, tipo, telefono, pais, autenticacion2FAHabilitada, updatedAt };
}

const getAllUsersService = async () => {
    const users: Usuario[] = await userRepository.createQueryBuilder('usuarios')
    .select(['usuarios.id', 'usuarios.nombre', 'usuarios.email', 'usuarios.tipo', 'usuarios.autenticacion2FAHabilitada', 'usuarios.updatedAt'])
    .getMany();
    
    return users;
}

const getAllUsersHabilitiesService = async () => {
    try {
        const habilities = await habilityService.getAllHabilities();
        return habilities;
        
    } catch (error) {
        throw error;
    }
}

export default {
    getUserProfileByIdService,
    getAllUsersService,
    editUserProfileService,
    getAllUsersHabilitiesService,
}
