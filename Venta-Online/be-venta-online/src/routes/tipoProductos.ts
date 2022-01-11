import { Router } from "express";
import { TbTipoProductoController } from "../controller/TbTipoProductoController";

const router = Router();

/***************************************
 *      RUTAS DE TIPO DE PRODUCTO      *
 **************************************/



//Obtiene todo
router.get('/', TbTipoProductoController.getAll);

//Obtiene el id
router.get('/:id', TbTipoProductoController.getById);

//crear
router.post('/', TbTipoProductoController.new);

//modifica
router.patch('/:id', TbTipoProductoController.modify);

//elimina
router.delete('/:id', TbTipoProductoController.delete);

export default router;