import { IsNotEmpty } from "class-validator";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { tbFactura } from "./tbFactura";
import { tbProducto } from "./tbProducto";

@Entity()

/**
 *  Tabla donde guardaremos todos los detalles de factura 
 */

export class tbDetalleFactura {

    //Llave primaria
    @PrimaryGeneratedColumn()
    idDetalleFactura: number;

    @Column()
    @IsNotEmpty()
    cantidadProducto: number;

    @Column()
    @IsNotEmpty()
    estado: boolean;

    //Relacion con la tabla factura
    @ManyToOne(() => tbFactura, tbFactura => tbFactura.tbDetalleFactura)
    @JoinColumn({name: 'idFacturaFk'})
    tbFactura: tbFactura;

    //Relacion con la tabla Producto
    @ManyToOne(() => tbProducto, tbProducto => tbProducto.tbDetalleFactura)
    @JoinColumn({name: 'idProductoFk'})
    tbProducto: tbProducto;



}