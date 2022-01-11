import { NextFunction, Request, Response } from "express";
import * as jwt from 'jsonwebtoken';
import config from "../config/config";

/*Se  carga el Payload con los datos Auth para autorizar el acceso al APP. Ademas se 
establece un tiempo para uso del Token */

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
    const token = <string>req.headers['auth'];
    let payload;

    try {
        payload = jwt.verify(token, config.jwtSecretKey);
        res.locals.jwtPayload = payload;
    } catch (error) {
        return res.status(401).json({mensaje:'No autorizado!'})
    }

    const {userId, correo} = payload;

    const newToken = jwt.sign({userId, correo}, config.jwtSecretKey, {expiresIn:'5m'});

    res.setHeader('auth', newToken);

    next();

}