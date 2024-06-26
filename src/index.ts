import server from "./server";
import "reflect-metadata";
import { AppDataSource } from "./config/typeorm.config";
// import { preloadAppointmentsData, preloadCredentialsData, preloadUsersData } from "./helpers/Preload.Data";
// import * as pgvector from 'pgvector/pg';

async function serverOn() {
  try {
    await AppDataSource.initialize();

    console.log("Conexion a la base de datos realizada con exito");
    server.listen(process.env.PORT, () => {
      console.log(
        `Jarvis operativo y atento señor, en guardia mediante sus ${process.env.PORT} millones de neurotransmisores`
      );
    });
  } catch (error) {
    console.error("Error al inicializar el servidor:", error);
  }
}
// levanto el server
serverOn();
