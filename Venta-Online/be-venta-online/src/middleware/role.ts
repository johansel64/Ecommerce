import { NextFunction, Request, Response } from "express"
import { getRepository } from "typeorm";
import { tbUsuario } from "../entity/tbUsuario";

/*Se valida el rol para asi dar acceso a los diferentes funcionalidades de la aplicación */

export const checkRole = (roles: Array<string>) => {
    return async(req:Request, res: Response, next: NextFunction) => {
        const {userId} = res.locals.jwtPayload;
        const userRepo = getRepository(tbUsuario);
        let usuario: tbUsuario;

        console.log(res.locals.jwtPayload)
        console.log(userId)

        try {
            usuario = await userRepo.findOneOrFail({where:{idUsuario: userId}})
        } catch (error) {
            return res.status(401).json({mensaje:'No autorizado!'})
        }


        if(roles.includes(usuario.role)){
            next();
        } else {
            return res.status(401).json({mensaje:'Rol no autorizado!'})
        }
    }
}