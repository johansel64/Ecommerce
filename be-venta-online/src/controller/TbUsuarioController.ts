import { validate } from "class-validator";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { tbUsuario } from "../entity/tbUsuario";
import { tbPersona } from "../entity/tbPersona";
import { tbDireccion } from "../entity/tbDireccion";

export class TbUsuarioController{

    /**
     * En esta funcion obtendremos la lista de los usuarios que se encuentren activos
     */
    static getAll = async (req: Request, res: Response) => {
        const usuarioRepo = getRepository(tbUsuario);// Conexion al repositorio
        
        let lista;

        //solicitamos la lista a la base de datos
        try {
            lista = await usuarioRepo.find({relations: ["tbPersona","tbDireccion"], where:{estado:1}})
        } catch (error) {
            res.status(404).json({mensaje:'Algo fue mal!'});
        }

        //validamos si trae datos
        if(lista.length > 0){
            res.send(lista);
        } else {
            res.status(404).json({mensaje:'No hay resultados!'});
        }

    }

    /***
     * Funcion para obtener un usuario por el id
     */
    static getById = async (req: Request, res: Response)=>{
        const usuarioRepo = getRepository(tbUsuario);// Conexion al repositorio

        const {id} = req.params;
        
        //solicitar dato a la base de datos
        try {
            const usuario = await usuarioRepo.findOneOrFail(id,{relations: ["tbPersona","tbDireccion"], where:{estado:1}})
            res.send(usuario);
        } catch (error) {
            res.status(404).json({mensaje:'No hay resultados!'});
        }


    }

    /**
     * Funcion para agregar un nuevo usuario 
     */
    static new = async (req: Request, res: Response) => {
        //Conexiones a los repositorios
        const usuarioRepo = getRepository(tbUsuario);
        const personaRepo = getRepository(tbPersona);
        const direccionRepo = getRepository(tbDireccion);

        //Parametros que vienen del body
        const {
            nombreUsuario, email, password, role, 
            nombre, apellido1, apellido2, telefono, fechaNac,
            provincia, canton, ubicacionExacta
        } = req.body;

        let usuario = new tbUsuario();
        let usuarioPersona = new tbPersona();
        let usuarioDireccion = new tbDireccion();

        //Validar datos de usuario
        if(!nombreUsuario){
            res.status(404).json({mensaje:'Falta correo nombreUsuario!'})
        }
        if(!email){
            res.status(404).json({mensaje:'Falta tipo email!'})
        }
        if(!password){
            res.status(404).json({mensaje:'Falta tipo password!'})
        }
        if(!role){
            res.status(404).json({mensaje:'Falta tipo usuario!'})
        }

        //Validar datos de persona
        if(!nombre){
            res.status(404).json({mensaje:'Falta nombre!'})
        }
        if(!apellido1){
            res.status(404).json({mensaje:'Falta apellido 1!'})
        }
        if(!apellido2){
            res.status(404).json({mensaje:'Falta apellido 2!'})
        }
        if(!fechaNac){
            res.status(404).json({mensaje:'Falta apellido 2!'})
        }
        if(!telefono){
            res.status(404).json({mensaje:'Falta teléfono!'})
        }

        //Validar datos de direccion
        if(!provincia){
            res.status(404).json({mensaje:'Falta provincia!'})
        }
        if(!canton){
            res.status(404).json({mensaje:'Falta canton!'})
        }
        if(!ubicacionExacta){
            res.status(404).json({mensaje:'Falta ubicación exacta!'})
        }


        /**
         * Asignamos los datos segun correspondan
         */
        usuarioDireccion.provincia = provincia;
        usuarioDireccion.canton = canton;
        usuarioDireccion.ubicacionExacta = ubicacionExacta;
        usuarioDireccion.estado = true;

        usuarioPersona.nombre = nombre;
        usuarioPersona.apellido1 = apellido1;
        usuarioPersona.apellido2 = apellido2;
        usuarioPersona.telefono = telefono;
        usuarioPersona.fechaNac = fechaNac;
        usuarioPersona.estado = true;
        
        usuario.nombreUsuario = nombreUsuario;
        usuario.email = email;
        usuario.password = password;
        usuario.role = role;
        usuario.estado = true;
        usuario.tbPersona = usuarioPersona;
        usuario.tbDireccion = usuarioDireccion;
        

        //Validamos si no tenemos errores
        const validateOpt = {validationError: {target:false, value:false}};
        const errores = await validate(usuario, validateOpt);
        if(errores.length > 0){
            return res.status(400).json(errores)
        }
        
        //encriptamos la contraseña
        usuario.hashPassword();


        //Guardamos el usuario
        try {
            await direccionRepo.save(usuarioDireccion);
            await personaRepo.save(usuarioPersona);
            await usuarioRepo.save(usuario);
        } catch (error) {
            return res.status(409).json({mensaje:'El usuario ya existe!'})
        }

        return res.status(201).json({mensaje:"Usuario creado!"})
        
    }

    /**
     * Funcion para modificar al usuario, recibe un id de 
     * identificacion y los demas datos
     */
    static modify = async (req: Request, res: Response)=>{
        // Conexiones a los repositorios
        const usuarioRepo = getRepository(tbUsuario);
        const personaRepo = getRepository(tbPersona);
        const direccionRepo = getRepository(tbDireccion)

        // Datos que vienen por el body
        const {
            nombreUsuario, email, password, role, 
            nombre, apellido1, apellido2, telefono, fechaNac,
            provincia, canton, ubicacionExacta
        } = req.body;
        const {id} = req.params;

        let usuario;
        let usuarioPersona;
        let usuarioDireccion;
        

        //Buscamos en la base de datos los datos segun el ID
        try {
            usuario = await usuarioRepo.findOneOrFail(id,{relations: ["tbPersona","tbDireccion"], where:{estado:1}})
            usuarioPersona = await personaRepo.findOneOrFail(usuario.tbPersona.idPersona);
            usuarioDireccion = await direccionRepo.findOneOrFail(usuario.tbDireccion.idDireccion);
        } catch (error) {
            res.status(404).json({mensaje:'No existe usuario!'});
        }

        //Validar datos de usuario
        if(!nombreUsuario){
            res.status(404).json({mensaje:'Falta correo nombreUsuario!'})
        }
        if(!email){
            res.status(404).json({mensaje:'Falta tipo email!'})
        }
        if(!role){
            res.status(404).json({mensaje:'Falta tipo usuario!'})
        }

        //Validar datos de persona
        if(!nombre){
            res.status(404).json({mensaje:'Falta nombre!'})
        }
        if(!apellido1){
            res.status(404).json({mensaje:'Falta apellido 1!'})
        }
        if(!apellido2){
            res.status(404).json({mensaje:'Falta apellido 2!'})
        }
        if(!fechaNac){
            res.status(404).json({mensaje:'Falta apellido 2!'})
        }
        if(!telefono){
            res.status(404).json({mensaje:'Falta teléfono!'})
        }

        //Validar datos de direccion
        if(!provincia){
            res.status(404).json({mensaje:'Falta provincia!'})
        }
        if(!canton){
            res.status(404).json({mensaje:'Falta canton!'})
        }
        if(!ubicacionExacta){
            res.status(404).json({mensaje:'Falta ubicación exacta!'})
        }

  
        /**
         * Asignamos los nuevos valores
         */
        usuarioDireccion.provincia = provincia;
        usuarioDireccion.canton = canton;
        usuarioDireccion.ubicacionExacta = ubicacionExacta;

        usuarioPersona.nombre = nombre;
        usuarioPersona.apellido1 = apellido1;
        usuarioPersona.apellido2 = apellido2;
        usuarioPersona.telefono = telefono;
        usuarioPersona.fechaNac = fechaNac;
        
        usuario.nombreUsuario = nombreUsuario;
        usuario.email = email;
        usuario.role = role;
        usuario.tbPersona = usuarioPersona;
        usuario.tbDireccion = usuarioDireccion;

        console.log(usuario)

        //Validacion d eerrores
        const validateOpt = {validationError: {target:false, value:false}};
        const errores = await validate(usuario, validateOpt);
        if(errores.length > 0){
            return res.status(400).json(errores)
        }
        


        //Guardamos el usuario modificado
        try {
            await direccionRepo.save(usuarioDireccion)
            await personaRepo.save(usuarioPersona);
            await usuarioRepo.save(usuario);
        } catch (error) {
            return res.status(409).json({mensaje:'El usuario ya existe!'})
            console.log(error.message)
        }

        return res.status(201).json({mensaje:"Usuario modificado!"})
        
    }

    /**
     * Funcion para eliminar un usuario cambiando su estado  false 
     */
    static delete = async (req: Request, res: Response)=>{
        const usuarioRepo = getRepository(tbUsuario);
        const {id} = req.params;
        let usuario;

        //Buscamos al usuario
        try {
            usuario = await usuarioRepo.findOneOrFail(id);
        } catch (error) {
            res.status(409).json({message:'Error al eliminar!'})
        }

        //Asignamos su nuevo estado
        usuario.estado = false;

        //Guardamos el usuario con su nuevo estado
        try {
            await usuarioRepo.save(usuario);
        } catch (error) {
            return res.status(409).json({mensaje:'Error al eliminar!'})
        }

        return res.status(201).json({mensaje:"Usuario eliminado!"})


    }
}