import { Router } from "express";
import { TbDetalleFacturaController } from "../controller/TbDetalleFacturaController";
import { checkJwt } from "../middleware/jwt";
import { checkRole } from "../middleware/role";

const router = Router();


//Obtiene datallesFactura segun el id de la factura
router.get('/:id', [checkJwt], checkRole(['admin','user']),TbDetalleFacturaController.getByIdFactura);



export default router;