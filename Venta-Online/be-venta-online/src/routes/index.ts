import { Router } from "express";
import { checkJwt } from "../middleware/jwt";
import auth from "./auth";
import detalleFacturas from "./detalleFacturas";
import detalleFacturasById from "./detalleFacturaById";
import direcciones from "./direcciones";
import facturas from "./facturas";
import personas from "./personas";
import productos from "./productos";
import tipoProductos from "./tipoProductos";
import usuarios from "./usuarios";

/*******************************
 *                             *
 *           RUTAS             *
 *                             *
 *******************************/


const router = Router();

router.use('/persona' ,personas);
router.use('/direccion', direcciones);
router.use('/tipoProducto', tipoProductos);
router.use('/producto', productos);
router.use('/factura', facturas);
router.use('/detalleFactura', detalleFacturas);
router.use('/detalleFacturaById', detalleFacturasById);

router.use('/usuario', usuarios);
router.use('/auth', auth);

export default router;