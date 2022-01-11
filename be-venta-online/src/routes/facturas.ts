import { Router } from "express";
import { TbFacturaController } from "../controller/TbFacturaController";
import { checkJwt } from "../middleware/jwt";
import { checkRole } from "../middleware/role";

const router = Router();

/*******************************
 *      RUTAS DE FACTURAS      *
 *******************************/

//Obtiene todo
router.get('/', [checkJwt], checkRole(['admin','user']),TbFacturaController.getAll);

//Obtiene el id
router.get('/:id', [checkJwt], checkRole(['admin','user']),TbFacturaController.getById);

//crear
router.post('/', [checkJwt], checkRole(['admin']),TbFacturaController.new);

//modifica
router.patch('/:id', [checkJwt], checkRole(['admin']),TbFacturaController.modify);

//elimina
router.delete('/:id', [checkJwt], checkRole(['admin']),TbFacturaController.delete);

export default router;