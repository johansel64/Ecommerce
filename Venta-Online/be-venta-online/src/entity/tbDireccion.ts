import { IsNotEmpty } from "class-validator";
import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne} from "typeorm";
import { tbUsuario } from "./tbUsuario";

@Entity()

/**
 * Tabla donde almacenaremos las direcciones de los usuarios
 */
export class tbDireccion {
    //Llave primaria
    @PrimaryGeneratedColumn()
    idDireccion: number;

    @Column()
    @IsNotEmpty()
    provincia: string;

    @Column()
    @IsNotEmpty()
    canton: string;

    @Column()
    ubicacionExacta: string;

    @Column()
    estado: boolean;



}