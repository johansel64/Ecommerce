import { Router } from "express";
import { TbDireccionController } from "../controller/TbDireccionController";


const router = Router();

/**********************************
 *      RUTAS DE DIRECCIONES      *
 **********************************/

//Obtiene todo
router.get('/', TbDireccionController.getAll);

//Obtiene el id
router.get('/:id',TbDireccionController.getById);

//crear
router.post('/',TbDireccionController.new);

//modifica
router.patch('/:id',TbDireccionController.modify);

//elimina
router.delete('/:id',TbDireccionController.delete);

export default router;