import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Project from "./projects";
import Application from "./applications";
import Payment from "./payments";
import Feedback from "./feedback";

@Entity({
    name: "users"
})
export default class Usuario {

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

    @OneToMany(() => Project, (project) => project.empresa)
    projects: Project[];

    @OneToMany(() => Application, (application) => application.junior)
    applications: Application[];

    @OneToMany(() => Payment, (payment) => payment.empresa)
    paymentsMade: Payment[];

    @OneToMany(() => Payment, (payment) => payment.junior)
    paymentsReceived: Payment[];

    @OneToMany(() => Feedback, (feedback) => feedback.usuario)
    feedbacks: Feedback[];
}
