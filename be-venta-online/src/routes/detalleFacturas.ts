import { Router } from "express";
import { TbDetalleFacturaController } from "../controller/TbDetalleFacturaController";
import { checkJwt } from "../middleware/jwt";
import { checkRole } from "../middleware/role";

const router = Router();
/**********************************
 *   RUTAS DE DETALLES FACTURAS   *
 **********************************/


//Obtiene todo
router.get('/', [checkJwt], checkRole(['admin','user']),TbDetalleFacturaController.getAll);

//Obtiene el id
router.get('/:id', [checkJwt], checkRole(['admin','user']),TbDetalleFacturaController.getById);

//Obtiene detalles de una factura especifica.con
router.get('/:idFactura', [checkJwt], checkRole(['admin','user']), TbDetalleFacturaController.getByIdFactura);

//crear
router.post('/', [checkJwt], checkRole(['admin']), TbDetalleFacturaController.new);

//modifica
router.patch('/:id', [checkJwt], checkRole(['admin']),TbDetalleFacturaController.modify);

//elimina
router.delete('/:id', [checkJwt], checkRole(['admin']),TbDetalleFacturaController.delete);

export default router;