import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { tbDireccion } from "../entity/tbDireccion";

export class TbDireccionController{

    /**
     * Con esta funcion obtenemos todas las direcciones 
     */
    static getAll = async (req: Request, res: Response) => {
        const repoDireccion = getRepository(tbDireccion);// Conexion al repositorio
        let lista;

        /**
         * Cargar la lista
         */
        try {
            lista = await repoDireccion.find({where: {estado:true}});
        } catch (err) {
            res.status(404).json({mensaje:'Algo salio mal'});
        }
        
        /**
         * Validacion si tiene datos
         */
        if(lista.length > 0) {
            res.send(lista);
        } else {
            res.status(404).json({mensaje:"No hay resultados."});
        }
    }

    /**
     * Obtiene la direccion especifica del usuario
     */
    static getById = async (req: Request, res: Response)=>{
        const repoDireccion = getRepository(tbDireccion);// Conexion al repositorio
        const { id } = req.params;

        //Busqueda de la direccion
        try {
            const factura = await repoDireccion.findOneOrFail({where: {idDireccion: id}});
            res.send(factura);
        } catch(error) {
            res.status(404).json({mensaje:"No se encontro la factura."});
        }

    }

    /**
     * Funcion para crear una nueva direccion para el usuario
     */
    static new = async (req: Request, res: Response) => {
        const repoDireccion = getRepository(tbDireccion);// Conexion al repositorio
        const {provincia, canton, ubicacionExacta} = req.body;// datos que vienen en el body
        
        let direccion = new tbDireccion;

        //validacion de los datos
        if (!provincia) {
            res.status(404).json({mensaje:"Falta la provincia."});
        }
        if (!canton) {
            res.status(404).json({mensaje:"Falta el canton."});
        }
        if (!ubicacionExacta) {
            res.status(404).json({mensaje:"Falta la ubicacion exacta) {."});
        }

        //asignacion de los datos
        direccion.provincia = provincia;
        direccion.canton = canton;
        direccion.ubicacionExacta = ubicacionExacta;
        direccion.estado = true;
        
        //Guardamos la nueva direccion
        try {
            await repoDireccion.save(direccion);
        } catch (error) {
            res.status(404).json({mensaje:"Algo salio mal."});
        }

        res.status(201).json({mensaje:"Direccion creada exitosamente!"});

    }


    /**
     * Funcion para modificar la informacion de la direccion
     */
    static modify = async (req: Request, res: Response)=>{
        const repoDireccion = getRepository(tbDireccion);// Conexion al repositorio
        const {id} = req.params;
        const {provincia, canton, ubicacionExacta} = req.body;// datos que vienen en el body
        
        let direccion = new tbDireccion;

        //buscamos la direccion con el id
        try {
            direccion = await repoDireccion.findOneOrFail({where: {idDireccion:id}});
        } catch (error) {
            res.status(404).json({mensaje:"No se encontro la direccion."})
        }


        // Validamos los datos recibidos
        if (!provincia) {
            res.status(404).json({mensaje:"Falta la provincia."});
        }
        if (!canton) {
            res.status(404).json({mensaje:"Falta el canton."});
        }
        if (!ubicacionExacta) {
            res.status(404).json({mensaje:"Falta la ubicacion exacta) {."});
        }

        //asignacion de datos recibidos
        direccion.provincia = provincia;
        direccion.canton = canton;
        direccion.ubicacionExacta = ubicacionExacta;
        
        //Guardamos la factura modificada
        try {
            await repoDireccion.save(direccion);
        } catch (error) {
            res.status(404).json({mensaje:"Algo salio mal."});
        }

        res.status(201).json({mensaje:"Direccion modificada exitosamente!"});
        
    }


    /**
     * Funcion para eliminar una direccion, pero lo que hacemos es cambiarle el estado para 
     * tenerla desactivada
     */
    static delete = async (req: Request, res: Response)=>{
        const repoDireccion = getRepository(tbDireccion);// Conexion al repositorio
        const {id} = req.params;
        
        let direccion = new tbDireccion;

        //Busqueda de la direccion
        try {
            direccion = await repoDireccion.findOneOrFail({where: {idDireccion:id}});
        } catch (error) {
            res.status(404).json({mensaje:"No se encontro la direccion."})
        }

        //Asignacion del estado
        direccion.estado = false;
        

        //Guardamos la direccion con el estado en false
        try {
            await repoDireccion.save(direccion);
        } catch (error) {
            res.status(404).json({mensaje:"Algo salio mal."});
        }

        res.status(201).json({mensaje:"Direccion eliminada exitosamente!"});
    }
}