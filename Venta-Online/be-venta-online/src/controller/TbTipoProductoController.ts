import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { tbTipoProducto } from "../entity/tbTipoProducto";

export class TbTipoProductoController{

    /**
     * Funcion para obtener la lista de los tipos de producto
     */
    static getAll = async (req: Request, res: Response): Promise<Response> =>{
        const tipoProductos = await getRepository(tbTipoProducto).find();
        return res.json(tipoProductos);

    }

    /**
     * Funcion para obtener un tipo de producto por id
     */
    static getById = async (req: Request, res: Response)=>{
        const tipoProducto = await getRepository(tbTipoProducto).findOne(req.params.id)
        return res.json(tipoProducto);

    }

    /**
     *Funcion para agregar un nuevo tipo de producto 
     */
    static new = async (req: Request, res: Response) => {
        const nuevoTipoProducto = getRepository(tbTipoProducto).create(req.body);
        const resultado = await getRepository(tbTipoProducto).save(nuevoTipoProducto);
        return res.json(resultado);
        
    }

    /**
     * Funcion para modificar un tipo de producto
     */
    static modify = async (req: Request, res: Response)=>{
        const tipoProducto = await getRepository(tbTipoProducto).findOne(req.params.id);
        if(tipoProducto){
            getRepository(tbTipoProducto).merge(tipoProducto, req.body);
            const resultado = getRepository(tbTipoProducto).save(tipoProducto);
            return res.json(resultado);
        }

        return res.status(404).json({msg: 'No se encontro ese tipo de Producto'})
        
    }

    /**
     * Funcion para eliminar un tipo de producto
     */
    static delete = async (req: Request, res: Response)=>{
        const tipoProducto = await getRepository(tbTipoProducto).delete(req.params.id)
        return res.json(tipoProducto);

    }
}