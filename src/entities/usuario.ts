import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Proyecto from "./proyecto";
import Aplicaciones from "./aplicaciones";
import Pagos from "./pagos";
import Comentarios from "./comentarios";

@Entity({
    name: "usuarios"
})
export default class Usuarios {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    email: string;

    @Column()
    contrasenia: string;

    @Column({
        type: "enum",
        enum: ["junior", "empresa", "admin"],
        default: "junior"
    })
    tipo: string;

    @Column({ name: "2fa_enabled" })
    autentificacionDe2Factores: boolean;

    @Column({ name: "2fa_secret" })
    autenticación2Factores: string;

    @OneToMany(() => Proyecto, (projecto) => projecto.empresaId)
    projecto: Proyecto[];

    @OneToMany(() => Aplicaciones, (aplicacion) => aplicacion.juniorId)
    aplicacion: Aplicaciones[];

    @OneToMany(() => Pagos, (pagos) => pagos.empresaId)
    PagoRealizado: Pagos[];

    @OneToMany(() => Pagos, (pagos) => pagos.juniorId)
    ComentarioRecivido: Pagos[];

    @OneToMany(() => Comentarios, (comentarios) => comentarios.usuarioId)
    comentarios: Comentarios[];
}
