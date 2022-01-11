import { Router } from "express";
import { AuthController } from "../controller/AuthController";


const router = Router();

//Ruta del login
router.post('/login', AuthController.login);

export default router;