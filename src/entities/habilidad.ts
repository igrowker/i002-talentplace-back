import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from "typeorm";
import { ulid } from "ulid";
import Proyecto from "./proyecto";

@Entity({
    name: "habilidades"
})
export class Habilidad {

  @PrimaryColumn()
  id: string;

  @Column()
  nombre: string;

  @ManyToMany(() => Proyecto, (proyecto) => proyecto.habilidades, {
    cascade: true
  })
  @JoinTable({
    name: 'proyectos_habilidades',
  })
  proyecto: Proyecto[];

  @BeforeInsert()
  generateUlid() {
    this.id = ulid();
  }
}