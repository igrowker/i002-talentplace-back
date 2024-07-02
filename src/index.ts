import server from "./server";
import "reflect-metadata";
import { AppDataSource } from "./config/Typeorm.config";
import { preloadUsersData } from "./helpers/PreloadData.Helper";

async function serverOn() {
  try {
    await AppDataSource.initialize();

    console.log("Conexion a la base de datos realizada con exito");

    // preload data
    await preloadUsersData();

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
