import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { tbUsuario } from "../entity/tbUsuario";
import * as jwt from 'jsonwebtoken';
import config from "../config/config";

/**
 * Controlador para el inicio de sesion
 */
export class AuthController {

    /**
     * Funcion para validar el inicio de sesion, en caso de
     * que los datos coincidan, devuelve un token con un tiempo de expiracion 
     * tambien deevuelve el role y el id del usuario
     */
    static login = async (req:Request, res:Response) => {
        const {email, password} = req.body;

        if(!(email && password)){
            return res.status(400).json({mensaje:'Correo o contraseña requerida!'})
        }

        const usuarioRepo = getRepository(tbUsuario);//Conexion al repositorio
        let usuario: tbUsuario;



        try {
            usuario = await usuarioRepo.findOneOrFail({where:{email}});//Validacion del usuario en la base de datos

        } catch (error) {
            res.status(400).json({mensaje:'Correo o contraseña incorrecta!'});//Respuesta invalida
           
        }
   
        if(!usuario.checkPassword(password)){
            res.status(400).json({mensaje:'Correo o contraseña incorrecta!'});//Respuesta invalida
        }

        const token = jwt.sign({userId:usuario.idUsuario, correo:usuario.email}, config.jwtSecretKey, {expiresIn:'20m'});//Creacion del token
        
        res.status(200).json({mensaje:'OK',token:token, role: usuario.role, usuario: usuario.idUsuario});//Respuesta correcta
        
    }
}