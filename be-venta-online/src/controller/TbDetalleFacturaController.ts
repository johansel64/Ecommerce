import { Request, Response } from 'express';
import { loadavg } from 'os';
import { getRepository, RelationId } from 'typeorm';
import { tbDetalleFactura } from '../entity/tbDetalleFactura';
import { tbFactura } from '../entity/tbFactura';
import { tbProducto } from '../entity/tbProducto';

export class TbDetalleFacturaController {
  /**
   * Funcion para obtener la lista de todos los detalles de facturas
   * los cuales deben tener el estado en true.
   */
  static getAll = async (req: Request, res: Response) => {
    const repoDetalleFact = getRepository(tbDetalleFactura);// Conexion a al repositorio de detalle de factura
    let lista;

    /**
     * Obtenemos la lista de todos los detalles de factura
     */
    try {
      lista = await repoDetalleFact.find({
        relations: ['tbProducto', 'tbFactura'],
        where: { estado: 1 },
      });
    } catch (error) {
      res.status(404).json({ mensaje: 'Algo salio mal.' });//Error
    }

    /**
     * Validamos si la lista viene con datos
     */
    if (lista.length > 0) {
      res.send(lista);
    } else {
      res.status(404).json({ mensaje: 'No hay resultados.' });
    }
  };

  /**
   * Funcion para obtener el detalle de factura por su Id
   */
  static getById = async (req: Request, res: Response) => {
    const repoDetalleFact = getRepository(tbDetalleFactura);// Conexion a al repositorio de detalle de factura
    const { id } = req.params;// parametros que viene por metodo get

    /**
     * Buscamos el detalle de factura
     */
    try {
      const detalleFactura = await repoDetalleFact.findOneOrFail({
        where: { idDetalleFactura: id, estado: 1 },
        relations: ['tbProducto', 'tbFactura'],
      });

      //console.log(detalleFactura);

      res.send(detalleFactura);
    } catch (error) {
      res
        .status(404)
        .json({ mensaje: 'No se encontro el detalle de factura.' });
    }
  };


  /**
   * Funcion para obtener la lista de detalles de factura por el Id de la factura
   */
  static getByIdFactura = async (req: Request, res: Response) => {
    const repoDetalleFact = getRepository(tbDetalleFactura);// Conexion a al repositorio de detalle de factura
    const { id } = req.params;
    let lista;


    /**
     * Busqueda de los detalles que coincidan con el id de la factura
     */
    try {
      //lista = await repoDetalleFact.find({where: {estado:1, tbFactura:idFactura}, relations: ["tbProducto"]});
      lista = await repoDetalleFact
        .createQueryBuilder('tbdetalleFactura')
        .innerJoinAndSelect("tbdetalleFactura.tbProducto", "producto")
        .innerJoinAndSelect("tbdetalleFactura.tbFactura", "factura")
        .where('factura.idFactura = :idFactura', { idFactura: id })
        .andWhere({ estado: 1 })
        .getMany();
    } catch (error) {
      res.status(404).json({ mensaje: 'Algo salio mal.' });
    }

    /**
     * Validacion de si la lista viene con datos
     */
    if (lista.length > 0) {
      res.send(lista);
    } else {
      res.status(404).json({ mensaje: 'No hay resultados.' });
    }
  };

  /**
   * Funcion para registrar un nuevo estado de factura,
   * se valida que todos los espacios lleguen completos, en caso de no estarlos
   * se retorna un mensaje.
   */
  static new = async (req: Request, res: Response) => {
    const repoDetalleFact = getRepository(tbDetalleFactura);// Conexion a al repositorio de detalle de factura
    const repoFactura = getRepository(tbFactura);// Conexion a al repositorio de factura
    const repoProducto = getRepository(tbProducto);// Conexion a al repositorio de producto
    const { cantidadProducto, idFactura, idProducto } = req.body;//Datos que vienen en el body

    let detalleFactura = new tbDetalleFactura();
    let fact = new tbFactura();
    let produc = new tbProducto();

    /**
     * Solicitud a la base de datos
     */
    try {
      fact = await repoFactura.findOneOrFail({
        where: { idFactura: idFactura, estado: 1 },
      });
      produc = await repoProducto.findOneOrFail({
        where: { idProducto: idProducto, estado: 1 },
      });
    } catch (error) {
      res.send(404).json({ mensaje: 'Factura no existe.' });//Respuesta de error
    }

    /**
     * Verificacion de que los datos esten completos
     */
    if (!cantidadProducto) {
      res.status(404).json({ mensaje: 'Falta la cantidad de producto' });
    }
    if (!idFactura) {
      res.status(404).json({ mensaje: 'Falta la factura.' });
    }
    if (!idProducto) {
      res.status(404).json({ mensaje: 'Falta la factura.' });
    }

    /**
     * Asignacion de los valores
     */
    detalleFactura.cantidadProducto = cantidadProducto;
    detalleFactura.tbFactura = fact;
    detalleFactura.tbProducto = produc;
    detalleFactura.estado = true;

    /**
     * Guardamos en la base de datos
     */
    try {
      await repoDetalleFact.save(detalleFactura);
    } catch (error) {
      return res
        .status(409)
        .json({ mensaje: 'Fallo al crear el detalle de factura.' });//Mensaje error
    }

    res.status(201).json({ mensaje: 'Detalle de factura creado.' });//Respuesta valida
  };

  /**
   * Funcion para modificar el detalle de factura,
   * se valida que todos los espacios lleguen completos, en caso de no estarlos
   * se retorna un mensaje.
   */
  static modify = async (req: Request, res: Response) => {
    const repoDetalleFact = getRepository(tbDetalleFactura);// Conexion a al repositorio de factura
    const { cantidadProducto, idFactura, idProducto } = req.body;//Datos que vienen en el body
    const { idDetalleFactura } = req.params;//daros que vienen por get
    let detalleFactura;
    let factura = new tbFactura();
    let producto = new tbProducto();

    //Busqueda de el detalle de factura en la base de datos
    try {
      detalleFactura = await repoDetalleFact.findOneOrFail(idDetalleFactura);
    } catch (error) {
      res
        .status(400)
        .json(404)
        .json({ mensaje: 'Detalle de factura no existe.' });
    }

    //Busqueda del producto
    try {
      producto = await getRepository(tbProducto).findOneOrFail(idProducto);
    } catch (error) {
      res.status(400).json(404).json({ mensaje: 'producto no existe.' });
    }

    //Busqueda de la factua
    try {
      factura = await getRepository(tbFactura).findOneOrFail(idFactura);
    } catch (error) {
      res.status(400).json(404).json({ mensaje: 'Factura no existe.' });
    }


    /**
     * Validaciones de los parametros
     */
    if (!cantidadProducto) {
      res.status(404).json({ mensaje: 'Falta la cantidad de producto' });
    }
    if (!factura) {
      res.status(404).json({ mensaje: 'Falta la factura.' });
    }

    /**
     * Asignacion de los nuevos valores
     */
    detalleFactura.catidadProducto = cantidadProducto;
    detalleFactura.tbFactura = factura;
    detalleFactura.tbProducto = producto;


    /**
     * Guardamos en la base de datos
     */
    try {
      await repoDetalleFact.save(detalleFactura);
    } catch (error) {
      return res
        .status(409)
        .json({ mensaje: 'Fallo al modificar el detalle de factura.' });//Error
    }

    res.status(201).json({ mensaje: 'Detalle de factura modificado.' });//Valido
  };

  /**
   * Funcion para eliminar el detalle de factura
   * Lo que hacemos es manejarlo por estados y en caso
   * de necesitar eliminar un detalle de factura, lo que hacemos es
   * cambiarle el estado a false para que no se muestre.
   */
  static delete = async (req: Request, res: Response) => {
    const repoDetalleFact = getRepository(tbDetalleFactura);// Conexion a al repositorio de detalle de factura
    const { idDetalleFactura } = req.params;//parametro que viene opr get
    let detalleFactura;

    /**
     * Busqueda de el detalle de factura
     */
    try {
      detalleFactura = await repoDetalleFact.findOneOrFail(idDetalleFactura);
    } catch (error) {
      res
        .status(404)
        .json({ mensaje: 'Fallo al eliminar el detalle de factura.' });//error
    }

    detalleFactura.estado = false;

    /**
     * Guardamos el nuevo estado de el detalle de factura
     */
    try {
      await repoDetalleFact.save(detalleFactura);
    } catch (error) {
      return res
        .status(409)
        .json({ mensaje: 'Fallo al eliminar el detalle de factura.' });//Errorº
    }

    res.status(201).send('Detalle de factura eliminada.');//Valido
  };
}
