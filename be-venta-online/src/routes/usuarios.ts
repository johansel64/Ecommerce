import { Router } from "express";
import { TbUsuarioController } from "../controller/TbUsuarioController";
import { checkJwt } from "../middleware/jwt";
import { checkRole } from "../middleware/role";

const router = Router();

/*******************************
 *      RUTAS DE USUARIOS      *
 *******************************/


//Obtiene todo
router.get('/', [checkJwt], checkRole(['admin','user']), TbUsuarioController.getAll);

//Obtiene el id
router.get('/:id', [checkJwt], checkRole(['admin','user']), TbUsuarioController.getById);

//crear
router.post('/',  TbUsuarioController.new);

//modifica
router.patch('/:id', [checkJwt], checkRole(['admin']), TbUsuarioController.modify);

//elimina
router.delete('/:id', [checkJwt], checkRole(['admin']), TbUsuarioController.delete);

export default router;