import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import Usuarios from "./Usuario";
import Aplicaciones from "./Aplicacion";
import Pagos from "./Pago";
import Comentarios from "./Comentario";

@Entity({
    name: "proyectos"
})
export default class Proyecto {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    titulo: string;

    @Column()
    descripcion: string;

    @Column({ name: "empresa_id" })
    empresaId: number;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    presupuesto: number;

    @Column({
        default: "active"
    })
    estado: string;

    @ManyToOne(() => Usuarios, (usuario) => usuario.projecto)
    @JoinColumn({ name: "empresa_id" })
    empresa: Usuarios;

    @OneToMany(() => Aplicaciones, (aplicaciones) => aplicaciones.proyectoId)
    aplicaciones: Aplicaciones[];

    @OneToMany(() => Pagos, (pagos) => pagos.proyectoId)
    pagos: Pagos[];

    @OneToMany(() => Comentarios, (comentarios) => comentarios.proyectoId)
    comentarios: Comentarios[];
}
