import { IsNotEmpty } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { tbDetalleFactura } from "./tbDetalleFactura";
import { tbUsuario } from "./tbUsuario";

@Entity()
/**
 * Tabla donde almacenaremos las facturas
 */
export class tbFactura {

    //Llave primaria
    @PrimaryGeneratedColumn()
    idFactura: number;

    @Column({nullable: true})
    @IsNotEmpty()
    totalFactura: number;

    @Column()
    @IsNotEmpty()
    estado: boolean;

    //Relacion con la tabla usuario
    @ManyToOne(() => tbUsuario, tbUsuario => tbUsuario.tbFactura)
    @JoinColumn({name: 'idUsuarioFk'})
    tbUsuario: tbUsuario;

    //Relacion con la tabla detalleFactura
    @OneToMany(() => tbDetalleFactura, tbDetalleFactura => tbDetalleFactura.tbFactura)
    tbDetalleFactura: tbDetalleFactura[];
}