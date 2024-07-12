import { BeforeInsert, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { ulid } from "ulid";
import Proyecto from "./proyecto";

@Entity({
    name: "categorias"
})
export default class Categoria {

    @PrimaryColumn()
    id: string;

    @Column()
    nombre: string;

    @OneToMany(() => Proyecto, (proyecto) => proyecto.categoria)
    proyecto: Proyecto;

    @BeforeInsert()
    generateUlid() {
      this.id = ulid();
    }
}
