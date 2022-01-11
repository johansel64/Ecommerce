import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { tbFactura } from "../entity/tbFactura";
import { tbUsuario } from "../entity/tbUsuario";

export class TbFacturaController{
    
    /**
     * Funcion con la que obtenemos la lista de todas 
     * las facturas registradas en la tabla
     */
    static getAll = async (req: Request, res: Response) => {
        const repoFactura = getRepository(tbFactura);// Conexion al repositorio
        let lista;

        //Se obtiene la lista de facturas
        try {
            lista = await repoFactura.find({relations: ["tbUsuario"], where: {estado: true}});
        } catch (error) {
            res.status(404).json({mensaje:'Algo salio mal'})
        }

        //validacion si viene con datos
        if(lista.length > 0) {
            res.send(lista);
        } else {
            res.status(404).json({mensaje:"No hay resultados."})
        }

    }

    /**
     * Funcion para ontener una factura por el Id, 
     * si no la encuentra retorna un mensaje
     */
    static getById = async (req: Request, res: Response)=>{
        const repoFactura = getRepository(tbFactura);// Conexion al repositorio
        const { id } = req.params;
        
        //Busqueda en la base de datos
        try {
            const factura = await repoFactura.findOneOrFail({where: {idFactura: id}, relations: ["tbUsuario"]});
            res.send(factura);
        } catch(error) {
            res.status(404).json({mensaje:"No se encontro la factura."});
        }

    }


    /**
     * Funcion para registrar una nueva factura,
     * valida que el total de la factura y el IdUsuario 
     * no  esten vacios.
     */
    static new = async (req: Request, res: Response) => {
        const repoFactura = getRepository(tbFactura);// Conexion al repositorio
        const {totalFactura, idUsuario} = req.body;// parametros que vienen por el bodyº
        const repoUsuario = getRepository(tbUsuario);// Conexion al repositorio
        let usuario;
        
        //Busqueda de la factura por el id
        try {
            usuario = await repoUsuario.findOneOrFail(idUsuario);
            
        } catch (error) {
            res.status(404).json({mensaje:"Usuario invalido."});
        }
        //console.log(usuario);

        let factura  = new tbFactura;

        //Validacion de los datos que se quieren asignar 
        if(!totalFactura) {
            res.status(404).json({mensaje:"Falta el total de la factura."});
        }
        if(!usuario) {
            res.status(404).json({mensaje:"Falta el usuario."});
        }

        //Asignacion de los datos
        factura.totalFactura = totalFactura;
        factura.tbUsuario = usuario;
        factura.estado = true;
        
        //Guardamos la factura
        try {
            await repoFactura.save(factura);
        } catch (error) {
            res.status(404).json({mensaje:"Algo salio mal."});
        }

        res.status(201).json(factura);
    }


    /**
     * Funcion para modificar algun campo de la factura
     */
    static modify = async (req: Request, res: Response)=>{
        const repoFactura = getRepository(tbFactura);// Conexion al repositorio
        const {id} = req.params;
        const {totalFactura, idUsuario} = req.body;// parametros que vienen por el body

        let usuario;

        //Buscamos el usuario
        try {
            usuario = getRepository(tbUsuario).findOneOrFail(idUsuario);
        } catch (error) {
            
        }

        let factura;

        //Buscamos la factura
        try {
            factura = await repoFactura.findOneOrFail({where: {idFactura:id}});
        } catch (error) {
            res.status(404).json({mensaje:"No se encontro la factura."})
        }


        // Validamos los datos que vienen por parametro
        if(!totalFactura) {
            res.status(404).json({mensaje:"Falta el total de la factura."});
        }
        if(!usuario) {
            res.status(404).json({mensaje:"Falta el usuario."});
        }

        //Asignacion de los datos
        factura.totalFactura = totalFactura;
        factura.tbUsuario = usuario;
        factura.estado = true;
        
        //Guardamos la factura
        try {
            await repoFactura.save(factura);
        } catch (error) {
            res.status(404).json({mensaje:"Algo salio mal."});
        }

        res.status(201).json({mensaje:"Factura modificada exitosamente!"});
        
    }


    /**
     * Funcion para eliminar una factura.
     * Lo que hacemos es manejarlo por estados y en caso
     * de necesitar eliminar una factura, lo que hacemos es
     * cambiarle el estado a false para que no se muestre
     */
    static delete = async (req: Request, res: Response)=>{
        
        const repoFactura = getRepository(tbFactura);// Conexion al repositorio
        const {idFactura} = req.params;
        let factura;

        //Obtenemos la factura
        try {
            factura = await repoFactura.findOneOrFail(idFactura);
        } catch (error) {
            res.status(404).json({mensaje:"No se encontro la factura."})
        }

        //Asignamos el nuevo estado de la factura
        factura.estado = false;
        
        //Guardamos la factura
        try {
            await repoFactura.save(factura);
        } catch (error) {
            res.status(404).json({mensaje:"Error al eliminar."});
        }

        res.status(201).json({mensaje:"Factura eliminada"});
    }
}