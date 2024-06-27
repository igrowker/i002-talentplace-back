import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import Usuario from "./users";
import Application from "./applications";
import Payment from "./payments";
import Feedback from "./feedback";

@Entity({
    name: "projects"
})
export default class Project {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ name: "empresa_id" })
    empresaId: number;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    budget: number;

    @Column({
        default: "active" // Estado por defecto
    })
    status: string;

    @ManyToOne(() => Usuario, (usuario) => usuario.projects)
    @JoinColumn({ name: "empresa_id" })
    empresa: Usuario;

    @OneToMany(() => Application, (application) => application.project)
    applications: Application[];

    @OneToMany(() => Payment, (payment) => payment.project)
    payments: Payment[];

    @OneToMany(() => Feedback, (feedback) => feedback.project)
    feedbacks: Feedback[];
}
