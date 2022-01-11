import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, Unique} from "typeorm";
import { tbFactura } from "./tbFactura";
import {tbPersona} from './tbPersona';
import * as bcrypt from 'bcryptjs';
import { tbDireccion } from "./tbDireccion";
import { tbProducto } from "./tbProducto";

@Entity()
@Unique(['email'])
/**
 * Tabla donde guardaremos los datos de los usuarios
 */
export class tbUsuario {
    //Llave primaria
    @PrimaryGeneratedColumn()
    idUsuario: number;

    @Column({unique: true, nullable: true})
    @IsNotEmpty()
    nombreUsuario: string;

    @Column({type: "varchar", length: 50, nullable: true})
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Column({nullable: true})
    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @Column({nullable: true})
    @IsNotEmpty()
    role: string;

    @Column()
    @IsNotEmpty()
    estado: true;

    //Relacion con la tabla persona
    @OneToOne(() => tbPersona)
    @JoinColumn({name: "idPersonaFk"})
    tbPersona: tbPersona;
    
    //Relacion con la tabla direccion
    @OneToOne(() => tbDireccion)
    @JoinColumn({name: "idDireccionFk"})
    tbDireccion: tbDireccion;
    
    //Relacion con la tabla factura
    @OneToMany(() => tbFactura, tbFactura => tbFactura.tbUsuario)
    tbFactura: tbFactura[];

    //relacion con la tabla de productos
    @OneToMany(() => tbProducto, tbProducto => tbProducto.tbUsuario)
    tbProducto: tbProducto[];



    //Funcion para encriptar las contraseñas y guardarlas en la base de datos
    hashPassword():void{
        const salt = bcrypt.genSaltSync(10);
        this.password =bcrypt.hashSync(this.password, salt);
    }

    //Funcion para verificar que la contraseña sea valida
    checkPassword(password:string): boolean{
        return bcrypt.compareSync(password, this.password);
    }
    
}