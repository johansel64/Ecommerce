import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { tbProducto } from "./tbProducto";

@Entity()
/**
 * En esta tabla tendremos almacenados cada tipo de producto 
 */
export class tbTipoProducto {
    //Llave primaria
    @PrimaryGeneratedColumn()
    idTipoProducto: number;

    @Column({nullable: true})
    nombreTipoProducto: string;

    //Relacion con la tabla de producto
    @OneToMany(() => tbProducto, tbProducto => tbProducto.tipoProducto)
    tbProducto: tbProducto[];
    
}