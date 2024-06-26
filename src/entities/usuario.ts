import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Proyecto from "./Proyecto";
import Aplicaciones from "./Aplicacion";
import Pagos from "./Pago";
import Comentarios from "./Comentario";

@Entity({
    name: "usuarios"
})
export default class Usuario {

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

    @Column({ name: "2fa_enabled", default: false })
    autenticacion2FAHabilitada: boolean;

    @Column({ name: "2fa_secret", nullable: true })
    autenticacion2FASecreto: string;

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
