import { Column, Entity, ManyToOne, JoinColumn, OneToMany, BeforeInsert, PrimaryColumn } from "typeorm";
import Usuario from "./usuario";
import Aplicacion from "./aplicacion";
import Pago from "./pago";
import Comentario from "./comentario";
import { ulid } from "ulid";

@Entity({
    name: "proyectos"
})
export default class Proyecto {

    @PrimaryColumn()
    id: string;

    @Column()
    titulo: string;

    @Column()
    descripcion: string;

    @Column({ name: "empresa_id" })
    empresaId: string;

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

    @BeforeInsert()
    generateUlid() {
      this.id = ulid();
    }
}
