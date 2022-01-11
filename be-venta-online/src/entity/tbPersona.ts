import { IsNotEmpty } from "class-validator";
import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
/**
 * Tabla donde almacenaremos los datos basicos de la persona
 */
export class tbPersona {
    //Llave primaria
    @PrimaryGeneratedColumn()
    idPersona: number;

    //Columna con longitud maxima de 50 caracteres
    @Column({type: "varchar", length: 50})
    @IsNotEmpty()
    nombre: string;

    @Column({nullable: true})
    @IsNotEmpty()
    apellido1: string;

    @Column({nullable: true})
    @IsNotEmpty()
    apellido2: string;

    @Column({type: "int"})
    @IsNotEmpty()
    telefono: number;

    @Column()
    @IsNotEmpty()
    fechaNac: Date;

    @Column()
    @IsNotEmpty()
    estado: boolean;

}
