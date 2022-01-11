import { Router } from "express";
import { TbPersonaController } from "../controller/TbPersonaController";

const router = Router();

/*******************************
 *      RUTAS DE PERSONAS      *
 *******************************/


//Obtiene todo
router.get('/', TbPersonaController.getAll);

//Obtiene el id
router.get('/:id', TbPersonaController.getById);

//crear
router.post('/', TbPersonaController.new);

//modifica
router.patch('/:id', TbPersonaController.modify);

//elimina
router.delete('/:id', TbPersonaController.delete);

/* router.get('/', TbPersonaController.prueba); */

export default router;