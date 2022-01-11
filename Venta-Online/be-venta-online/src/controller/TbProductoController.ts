import { validate } from "class-validator";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { tbProducto } from "../entity/tbProducto";
import { tbTipoProducto } from "../entity/tbTipoProducto";
import { tbUsuario } from "../entity/tbUsuario";

export class TbProductoController {
    static getAll = async (req: Request, res: Response) => {
        const productoReq = getRepository(tbProducto); // Conexion a la tabla productos 

        let lista;// Variable donde guardaremos nuestros productos 

        try {
            lista = await productoReq.find({ relations: ["tipoProducto", "tbUsuario"], where: { estado: 1  } })// Consulta a la tabla productos por los productos que contiene
        } catch (error) {
            res.status(404).json({ mensaje: 'Algo fue mal!' });
        }

        if (lista.length > 0) {// Validamos que nuestra variable lista no este vacia 
            res.send(lista);// Mostramos los productos
        } else {
            res.status(201).json(lista);
        }

    }

    static getAllByUser = async (req: Request, res: Response) => {
        const productoReq = getRepository(tbProducto); // Conexion a la tabla productos 
        const { id } = req.params;
        let lista;// Variable donde guardaremos nuestros productos 


        try {
            // Query que busca los productos de un unico usuario
             lista = await productoReq.createQueryBuilder('producto')
                                      .innerJoinAndSelect("producto.tipoProducto", "tipo")
                                      .innerJoinAndSelect("producto.tbUsuario", "usuario")
                                      .where("usuario.idUsuario =  :idUsuario", {idUsuario: id})
                                      .andWhere({estado: 1})
                                      .getMany();

        } catch (error) {
            console.log(error);
            res.status(404).json({ mensaje: 'Algo fue mal!' });
        }

        if (lista.length > 0) {// Validamos que nuestra variable lista no este vacia 
            res.send(lista);// Mostramos los productos
        } else {
            res.status(201).json(lista);
        }

    }

    static getAllByType = async (req: Request, res: Response) => {
        const productoReq = getRepository(tbProducto); // Conexion a la tabla productos 
        const { tipo } = req.params;
        let lista;// Variable donde guardaremos nuestros productos 


        try {
            // Query que busca los productos de por el tipo de producto
             lista = await productoReq.createQueryBuilder('producto')
                                      .innerJoinAndSelect("producto.tipoProducto", "tipo")
                                      .innerJoinAndSelect("producto.tbUsuario", "usuario")
                                      .where("tipo.nombreTipoProducto = :nombreTipoProducto", {nombreTipoProducto: tipo})
                                      .andWhere({estado: 1})
                                      .getMany();

        } catch (error) {
            console.log(error);
            res.status(404).json({ mensaje: 'Algo fue mal!' });
        }

        if (lista.length > 0) {// Validamos que nuestra variable lista no este vacia 
            res.send(lista);// Mostramos los productos
        } else {
            res.status(201).json(lista);
        }

    }

    static getById = async (req: Request, res: Response) => {
        const productoReq = getRepository(tbProducto);// Conexion a la tabla productos 

        const { id } = req.params;// Tomamos de los parametros que envia el cliente el id del producto


        try {
            const producto = await productoReq.findOneOrFail(id, { relations: ["tipoProducto", "tbUsuario"], where: { estado: 1 } })//Consultamos si el producto con ese id y esa relacion existe en la tabla
            res.send(producto);//Mostramos el producto
        } catch (error) {
            res.status(201).json({ mensaje: 'No hay resultados!' });
        }

    }

    static new = async (req: Request, res: Response) => {
        const tipoProductoReq = getRepository(tbTipoProducto);// Conexion a la tabla Tipo producto
        const productoReq = getRepository(tbProducto);// Conexion a la tabla productos 
        const usuarioReq = getRepository(tbUsuario);// Conexion a la tabla usuario 
        // Tomamos los parametros para guardar nuestro producto que envia el cliente por el metodo post 
        const { cantidad, nombre, descripcion, URLimagen, precioUnitario, nombreTipoProducto, idUsuario } = req.body;
        
        let producto = new tbProducto();// Declaramos un nuevo producto vacio
        let tp = new tbTipoProducto();// Declaramos un nuevo tipo de producto vacio
        let usa = new tbUsuario();// Declaramos un nuevo usuario vacio


        try {
            //Consultamos el tipo del producto por el campo nombreTipoProducto
            tp = await tipoProductoReq.findOneOrFail({ where: { nombreTipoProducto: nombreTipoProducto } });
            //Consultamos el usuario 
            usa = await usuarioReq.findOneOrFail({ where: { idUsuario: idUsuario } });
        } catch (error) {
            console.log(error.message);
            return res.status(409).json({ mensaje: 'El tipo de producto no existe!' })
        }



        // Validamos que la cantidad no este vacia y que no sea menor a 1
        if (!cantidad || cantidad < 1) { res.status(404).json({ mensaje: 'Falta la cantidad o cantidad es menor a 1!' }) };

        // Validamos que el nombre no este vacio
        if (!nombre) { res.status(404).json({ mensaje: 'Falta el nombre del producto!' }) }

        
        if (!descripcion) { res.status(404).json({ mensaje: 'Falta la descripcion del producto!' }) }

        // Validamos que el wl producto tenga una imagen
        if (!URLimagen) { res.status(404).json({ mensaje: 'Falta la imagen del producto!' }) }

        // Validamos que el precioUnitario no este vacio
        if (!precioUnitario) { res.status(404).json({ mensaje: 'Falta el precioUnitario del producto!' }) }

        // Validamos que el tipoProducto no este vacio
        if (!nombreTipoProducto) { res.status(404).json({ mensaje: 'Falta nombre de tipo de producto!' }) }

        // Validamos que el idUsuario no este vacio
        if (!idUsuario) { res.status(404).json({ mensaje: 'Falta nombre de idUsuario!' }) }


        producto.cantidad = cantidad;//Le pasamos la cantidad al producto
        producto.nombre = nombre;//Le pasamos el nombre al producto
        producto.descripcion = descripcion;//Le pasamos la descripcion al producto
        producto.URLimagen = URLimagen;//Le pasamos la imagen al producto
        producto.precioUnitario = precioUnitario;//Le pasamos el precioUnitario al producto
        producto.estado = true;//Le pasamos el estado definido en true al producto
        producto.tipoProducto = tp;//Le pasamos el tipoProducto al producto
        producto.tbUsuario = usa;//Le pasamos el usuario al producto


        const validateOpt = { validationError: { target: false, value: false } };
        const errores = await validate(producto, validateOpt);
        if (errores.length > 0) {//Validamos si existe algun error
            return res.status(400).json(errores);//Retornamos los errores
        }

        try {
            
            await productoReq.save(producto);//Guardamos el producto 

        } catch (error) {
            console.log(error.message)
            return res.status(409).json({ mensaje: 'Error al agregar el producto!' })

        }

        res.status(201).json("Producto agregado con exito!")

    }

    static modify = async (req: Request, res: Response) => {
        const tipoProductoReq = getRepository(tbTipoProducto);// Conexion a la tabla Tipo producto
        const productoReq = getRepository(tbProducto);// Conexion a la tabla producto
        const usuarioReq = getRepository(tbUsuario);// Conexion a la tabla usuario 
        // Tomamos los parametros para modificar nuestro producto que envia el cliente por el metodo post
        const { cantidad, nombre, descripcion, URLimagen, precioUnitario, nombreTipoProducto, idUsuario } = req.body;
        const { id } = req.params;// Tomamos de los parametros que envia el cliente el id del producto

        let producto = new tbProducto();// Declaramos un nuevo producto
        let tp = new tbTipoProducto();// Declaramos un nuevo tipo de producto
        let usa = new tbUsuario();// Declaramos un nuevo usuario vacio


        try {
            //Llenamos nuestro producto con la consulta a la tabla de producto con la relacion tipoProducto
            producto = await productoReq.findOneOrFail(id, { relations: ["tipoProducto"], where: { estado: 1 } })
            //Llenamos nuestro tipo de producto con la consulta el tipo del producto a la tabla tipoProducto por el campo nombreTipoProducto
            tp = await tipoProductoReq.findOneOrFail({ where: { nombreTipoProducto: nombreTipoProducto } })

        } catch (error) {
            console.log(error.message)
            return res.status(409).json({ mensaje: 'El tipo de producto no existe!' })
        }



        // Validamos que la cantidad no este vacia y que no sea menor a 1
        if (!cantidad || cantidad < 1) { res.status(404).json({ mensaje: 'Falta la cantidad o cantidad es menor a 1!' }) };

        // Validamos que el nombre no este vacio
        if (!nombre) { res.status(404).json({ mensaje: 'Falta el nombre del producto!' }) }

        // Validamos que la descipcion no este vacia
        if (!descripcion) { res.status(404).json({ mensaje: 'Falta la descripcion del producto!' }) }

        // Validamos que el wl producto tenga una imagen
        if (!URLimagen) { res.status(404).json({ mensaje: 'Falta la imagen del producto!' }) }

        // Validamos que el precioUnitario no este vacio
        if (!precioUnitario) { res.status(404).json({ mensaje: 'Falta el precioUnitario del producto!' }) }

        // Validamos que el tipoProducto no este vacio
        if (!nombreTipoProducto) { res.status(404).json({ mensaje: 'Falta nombre de tipo de producto!' }) }

        // Validamos que el idUsuario no este vacio
        if (!idUsuario) { res.status(404).json({ mensaje: 'Falta nombre de idUsuario!' }) }

        producto.cantidad = cantidad;//Le pasamos la cantidad al producto
        producto.nombre = nombre;//Le pasamos el nombre al producto
        producto.descripcion = descripcion;//Le pasamos la descripcion al producto
        producto.URLimagen = URLimagen;//Le pasamos la imagen al producto
        producto.precioUnitario = precioUnitario;//Le pasamos el precioUnitario al producto
        producto.tipoProducto = tp;//Le pasamos el tipoProducto al producto
        producto.tbUsuario = usa;//Le pasamos el usuario al producto


        const validateOpt = { validationError: { target: false, value: false } };
        const errores = await validate(producto, validateOpt);
        if (errores.length > 0) {//Validamos si existe algun error
            return res.status(400).json(errores);//Retornamos los errores
        }

        try {
            await productoReq.save(producto);//Actualizamos el producto

        } catch (error) {
            console.log(error.message)
            return res.status(409).json({ mensaje: 'El producto no esta disponible!' })

        }

        res.status(201).json("Producto modificado con exito!")

    }

    static modifyQuantity = async (req: Request, res: Response) => {
        const productoReq = getRepository(tbProducto);// Conexion a la tabla producto

        // Tomamos los parametros para modificar nuestro producto que envia el cliente por el metodo post
        const { cantidad } = req.body;
        const { id } = req.params;// Tomamos de los parametros que envia el cliente el id del producto

        let producto = new tbProducto();// Declaramos un nuevo producto

        try {
            //Llenamos nuestro producto con la consulta a la tabla de producto con la relacion tipoProducto
            producto = await productoReq.findOneOrFail(id, { relations: ["tipoProducto"], where: { estado: 1 } })
        } catch (error) {
            console.log(error.message)
            return res.status(409).json({ mensaje: 'El producto no existe!' })
        }

       
        // Validamos que la cantidad no este vacia y que no sea menor a 1
        if (!cantidad || cantidad < 1 ) { res.status(404).json({ mensaje: 'Falta la cantidad o cantidad es menor a 1!' }) };

        let newCantidad = producto.cantidad - cantidad;

        if ( newCantidad == 0) {
            producto.estado = false;//Le cambiamos el estado al estado ya que no tiene mas productos
        }

        producto.cantidad = newCantidad; //Se asigna la nueva cantidad al producto 

        const validateOpt = { validationError: { target: false, value: false } };
        const errores = await validate(producto, validateOpt);
        if (errores.length > 0) {//Validamos si existe algun error
            return res.status(400).json(errores);//Retornamos los errores
        }

        try {
            await productoReq.save(producto);//Actualizamos el producto

        } catch (error) {
            console.log(error.message)
            return res.status(409).json({ mensaje: 'El producto no esta disponible!' })

        }

        res.status(201).json("Producto modificado con exito!")

    }

    static delete = async (req: Request, res: Response) => {
        const productoReq = getRepository(tbProducto);// Conexion a la tabla producto
        const { id } = req.params;// Tomamos de los parametros que envia el cliente el id del producto
        let producto;//Declaramos una variable producto vacia 

        try {
            producto = await productoReq.findOneOrFail(id);//Llenamos la variable producto con la consulta del producto por el id 
        } catch (error) {
            res.status(409).json({ message: 'Error al eliminar!' })
        }

        producto.estado = false;// Cambiamos el valor del estado del producto a falso para que no se muestre mas

        try {
            await productoReq.save(producto);//Actualizamos el producto con el estado en falso
        } catch (error) {
            return res.status(409).json({ mensaje: 'Error al eliminar!' })
        }

        res.status(201).json("Producto eliminado!")


    }

}
