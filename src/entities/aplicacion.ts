import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "aplicaciones"
})
export default class Aplicacion {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "proyecto_id" })
    proyectoId: string;

    @Column({ name: "junior_id" })
    juniorId: string;

    @Column()
    estado: string;
}