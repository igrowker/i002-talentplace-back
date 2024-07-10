import { BeforeInsert, Column, Entity, PrimaryColumn } from "typeorm";
import { ulid } from "ulid";

@Entity({
    name: "aplicaciones"
})
export default class Aplicacion {

    @PrimaryColumn()
    id: string;

    @Column({ name: "proyecto_id" })
    proyectoId: string;

    @Column({ name: "junior_id" })
    juniorId: string;

    @Column( {default: false})
    estado: boolean;

    @BeforeInsert()
    generateUlid() {
      this.id = ulid();
    }
}