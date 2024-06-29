import { DataSource } from "typeorm"
import { config as dotenvConfig } from 'dotenv';
import Usuarios from "../entities/usuario";
import Aplicaciones from "../entities/aplicaciones";
import Comentarios from "../entities/comentarios";
import Pagos from "../entities/pagos";
import Proyectos from "../entities/proyecto";


dotenvConfig({ path: '.env' });

export const AppDataSource = new DataSource({
    type: "postgres",
    port: 5432,
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME_DATABASE,
    dropSchema: true,
    synchronize: true,
    logging: true,
    entities: [ Usuarios , Aplicaciones , Comentarios , Pagos , Proyectos ],
    subscribers: [],
    migrations: [],
})