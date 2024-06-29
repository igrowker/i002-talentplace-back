import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "aplicaciones"
})
export default class Aplicaciones {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "proyecto_id" })
    proyectoId: number;

    @Column({ name: "junior_id" })
    juniorId: number;

    @Column()
    estado: string;
}