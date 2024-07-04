import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import Usuario from "./usuario";
import Aplicacion from "./aplicacion";
import Pago from "./pago";
import Comentario from "./comentario";

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

    @ManyToOne(() => Usuario, (usuario) => usuario.projecto)
    @JoinColumn({ name: "empresa_id" })
    empresa: Usuario;

    @OneToMany(() => Aplicacion, (aplicaciones) => aplicaciones.proyectoId)
    aplicaciones: Aplicacion[];

    @OneToMany(() => Pago, (pagos) => pagos.proyectoId)
    pagos: Pago[];

    @OneToMany(() => Comentario, (comentarios) => comentarios.proyectoId)
    comentarios: Comentario[];
}
