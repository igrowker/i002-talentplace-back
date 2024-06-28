import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Proyecto from "./proyecto";
import Aplicaciones from "./aplicaciones";
import Pagos from "./pagos";
import Comentarios from "./comentarios";

@Entity({
    name: "usuarios"
})
export default class Users {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    email: string;

    @Column()
    contraseña: string;

    @Column({
        type: "enum",
        enum: ["junior", "empresa", "admin"],
        default: "junior"
    })
    tipo: string;

    @Column({ name: "2fa_enabled" })
    twoFactorAuthEnabled: boolean;

    @Column({ name: "2fa_secret" })
    twoFactorAuthSecret: string;

    @OneToMany(() => Proyecto, (project) => project.empresaId)
    projects: Proyecto[];

    @OneToMany(() => Aplicaciones, (application) => application.juniorId)
    applications: Aplicaciones[];

    @OneToMany(() => Pagos, (payment) => payment.empresaId)
    paymentsMade: Pagos[];

    @OneToMany(() => Pagos, (payment) => payment.juniorId)
    paymentsReceived: Pagos[];

    @OneToMany(() => Comentarios, (feedback) => feedback.usuarioId)
    feedbacks: Comentarios[];
}
