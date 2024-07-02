import { DataSource } from "typeorm"
import { config as dotenvConfig } from 'dotenv';
import Aplicaciones from "../entities/aplicacion";
import Comentarios from "../entities/comentario";
import Pagos from "../entities/pago";
import { Proyecto } from "../entities/proyecto";
import { Usuario } from "../entities/usuario";

dotenvConfig({ path: '.env' });

export const AppDataSource = new DataSource({
    type: "postgres",
    port: 5432,
    // host: 'postgresdb',
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME_DATABASE,
    dropSchema: true,
    synchronize: true,
    logging: false,
    entities: [ Usuario , Aplicaciones , Comentarios , Pagos , Proyecto ],
    subscribers: [],
    migrations: [],
})