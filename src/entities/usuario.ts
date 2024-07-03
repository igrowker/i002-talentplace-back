import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Aplicaciones from "./aplicacion";
import Pagos from "./pago";
import Comentarios from "./comentario";
import { Proyecto } from "./proyecto";

@Entity({
    name: "usuarios"
})
export class Usuario {

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

    @Column({name: "update_at", default: new Date})
    updatedAt: Date;
}
