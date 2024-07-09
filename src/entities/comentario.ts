import { BeforeInsert, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { ulid } from "ulid";

@Entity({
    name: "comentarios"
})
export default class Comentario {

    @PrimaryColumn()
    id: string;

    @Column({ name: "proyecto_id" })
    proyectoId: string;

    @Column({ name: "usuario_id" })
    usuarioId: string;

    @Column()
    comentario: string;

    @Column()
    puntuación: number;

    @BeforeInsert()
    generateUlid() {
      this.id = ulid();    }
}
