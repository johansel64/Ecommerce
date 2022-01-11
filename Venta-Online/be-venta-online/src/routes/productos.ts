import { Router } from "express";
import { TbProductoController } from "../controller/TbProductoController";
import { checkJwt } from "../middleware/jwt";
import { checkRole } from "../middleware/role";

const router = Router();


/*******************************
 *      RUTAS DE PRODUCTOS     *
 *******************************/


//Obtiene todo
router.get('/', TbProductoController.getAll);

router.get('/byType/:tipo', TbProductoController.getAllByType);

router.get('/byUser/:id', [checkJwt], checkRole(['admin','user']), TbProductoController.getAllByUser);

//Obtiene el id
router.get('/:id', [checkJwt], checkRole(['admin','user']), TbProductoController.getById);

//crear
router.post('/', [checkJwt], checkRole(['admin']), TbProductoController.new);

//modifica
router.patch('/:id',[checkJwt], checkRole(['admin']), TbProductoController.modify);

//modifica
router.patch('/quantity/:id',[checkJwt], checkRole(['admin']), TbProductoController.modifyQuantity);

//elimina
router.delete('/:id',[checkJwt], checkRole(['admin']), TbProductoController.delete);

export default router;