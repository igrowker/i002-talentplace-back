import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "payments"
})
export default class Payments {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "proyecto_id" })
    proyectoId: number;

    @Column({ name: "empresa_id" })
    empresaId: number;

    @Column({ name: "junior_id" })
    juniorId: number;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    monto: number;

    @Column()
    estado: string;
}
