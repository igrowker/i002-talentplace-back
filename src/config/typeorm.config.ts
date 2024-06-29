import { DataSource } from "typeorm"
import { config as dotenvConfig } from 'dotenv';
import Usuarios from "../entities/usuario";


dotenvConfig({ path: '.env' });

export const AppDataSource = new DataSource({
    type: "postgres",
    port: 5432,
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dropSchema: true,
    synchronize: true,
    logging: false,
    entities: [ Usuarios ],
    subscribers: [],
    migrations: [],
})