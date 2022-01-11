import { Request, Response } from "express";
import { tbPersona } from "../entity/tbPersona";
import { createQueryBuilder, getRepository } from "typeorm";

export class TbPersonaController{

    /**
     * Funcion para obtener la lista de las personas que esten activas
     */
    static getAll = async (req: Request, res: Response): Promise<Response> =>{
        const personas = await getRepository(tbPersona).find();// Conexion al repositorio
        return res.json(personas);

    }

    /**
     * Funcion para obtener la persona por el id
     */
    static getById = async (req: Request, res: Response)=>{
        const persona = await getRepository(tbPersona).findOne(req.params.id)
        return res.json(persona);

    }

    /**
     * Funcion para agregar a una persona
     */
    static new = async (req: Request, res: Response) => {
        const nuevaPersona = getRepository(tbPersona).create(req.body);
        const resultado = await getRepository(tbPersona).save(nuevaPersona);
        return res.json(resultado);
        
    }

    /**
     * Funcion para modificar una persona
     */
    static modify = async (req: Request, res: Response)=>{
        const persona = await getRepository(tbPersona).findOne(req.params.id);
        if(persona){
            getRepository(tbPersona).merge(persona, req.body);
            const resultado = getRepository(tbPersona).save(persona);
            return res.json(resultado);
        }
        return res.status(404).json({msg: 'No se encontro una persona'})
    }

    /**
     * Funcion para eliminar una persona
     */
    static delete = async (req: Request, res: Response)=>{
        const persona = await getRepository(tbPersona).delete(req.params.id)
        return res.json(persona);
    }

/*     static prueba = async (req: Request, res: Response)=>{
        const resultado = await getRepository(tbPersona).createQueryBuilder('persona')
                                              .where('persona.nombre = :nombre', {nombre: "Johansel"})
                                              .getOne();
        return res.json(resultado);
    } */
}