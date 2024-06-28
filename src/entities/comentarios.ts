import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "comentarios"
})
export default class Comentarios {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "proyecto_id" })
    proyectoId: number;

    @Column({ name: "usuario_id" })
    usuarioId: number;

    @Column()
    comentario: string;

    @Column()
    puntuación: number;
}
