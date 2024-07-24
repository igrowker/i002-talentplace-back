import { Column, Entity, ManyToOne, JoinColumn, OneToMany, PrimaryColumn, BeforeInsert, ManyToMany } from "typeorm";
import Usuario from "./usuario";
import Aplicacion from "./aplicacion";
import Pago from "./pago";
import Comentario from "./comentario";
import { ulid } from "ulid";
import Categoria from "./categoria";
import { Habilidad } from "./habilidad";

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

    @Column()
    requisitos: string;

    @Column({ name: "empresa_id" })
    empresaId: string;

    @Column({name: "empresa_nombre", nullable: true})
    empresaNombre: string;

    // @Column({ type: "decimal", precision: 10, scale: 2 })
    // presupuesto: number;

    @Column({
        type: "enum",
        enum: ["remoto", "hibrido", "presencial"],
        default: "presencial"
    })
    modalidad: string;

    @Column({
        default: false
    })
    estado: boolean;
    
    @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    fechaCreacion: Date;

    @ManyToMany(() => Habilidad, (habilidad) => habilidad.proyecto, { eager: true })
    habilidades: Habilidad[];

    @ManyToOne(() => Categoria, (categoria) => categoria.proyecto, { eager: true })
    categoria: Categoria;

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
