import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import Usuarios from "./usuario";
import Aplicaciones from "./aplicaciones";
import Pagos from "./pagos";
import Comentarios from "./comentarios";

@Entity({
    name: "proyectos"
})
export default class Proyectos {

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
        default: "active"
    })
    status: string;

    @ManyToOne(() => Usuarios, (usuario) => usuario.projects)
    @JoinColumn({ name: "empresa_id" })
    empresa: Usuarios;

    @OneToMany(() => Aplicaciones, (aplicaciones) => aplicaciones.proyectoId)
    aplicaciones: Aplicaciones[];

    @OneToMany(() => Pagos, (pagos) => pagos.proyectoId)
    pagos: Pagos[];

    @OneToMany(() => Comentarios, (comentarios) => comentarios.proyectoId)
    comentarios: Comentarios[];
}
