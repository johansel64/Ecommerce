import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { tbDetalleFactura } from "./tbDetalleFactura";
import { tbTipoProducto } from "./tbTipoProducto";
import { tbUsuario } from "./tbUsuario";

@Entity()
@Unique(['nombre'])

/**
 * Tabla donde guardaremos los productos que vaya publicando cada usuario
 */
export class tbProducto {
    //Llave primaria
    @PrimaryGeneratedColumn()
    idProducto: number;

    @Column({nullable: true})
    cantidad: number;

    @Column({nullable: true})
    nombre: string;

    @Column({nullable: true})
    descripcion: string;

    @Column({nullable: true})
    URLimagen: string;

    @Column({ type: 'decimal', precision: 5, scale: 2, default: 0, nullable: true})
    precioUnitario: number;

    @Column()
    estado: boolean;

    //Relacion con la tabla de usuarios
    @ManyToOne(() => tbUsuario, tbUsuario => tbUsuario.tbProducto)
    @JoinColumn({name: 'idUsuarioFk'})
    tbUsuario: tbUsuario;

    //Relacion con la tabla de tipo de producto
    @ManyToOne(() => tbTipoProducto, tbTipoProducto => tbTipoProducto.tbProducto)
    @JoinColumn({name: 'idTipoProductoFk'})
    tipoProducto: tbTipoProducto;

    //Relacion con la factura del producto
    @OneToMany(() => tbDetalleFactura, tbDetalleFactura => tbDetalleFactura.tbProducto)
    tbDetalleFactura: tbDetalleFactura[];

}