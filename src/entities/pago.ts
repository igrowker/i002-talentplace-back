import { BeforeInsert, Column, Entity, PrimaryColumn } from "typeorm";
import { ulid } from "ulid";

@Entity({
    name: "pagos"
})
export default class Pago {

    @PrimaryColumn()
    id: string;

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

    @BeforeInsert()
    generateUlid() {
      this.id = ulid();
    }
}
