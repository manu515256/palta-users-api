import Token from '../services/token';
import { Request, Response, NextFunction } from 'express';
import {Itoken} from '../interfaces';
let tokenService:Itoken = new Token();

export default class Auth {

    async verifyGuest (req:Request, res:Response, next:NextFunction) {
        
        if(!req.headers.token) return res.status(401).send({message:'No token found'});

        const response: any = await tokenService.decode(req.headers.token);
        
        if(response.rol == 1 || response.rol == 2 || response.rol == 3){
            next();
        }else{
            return res.status(403).send({message:'Not autorized'});
        }
    }

    async verifyUser (req: Request, res: Response, next: NextFunction) {

        if (!req.headers.token) return res.status(401).send({ message: 'No token found' });

        const response:any = await tokenService.decode(req.headers.token);
        
        if (response.rol == 1 || response.rol == 2) {
            next();
        } else {
            return res.status(403).send({ message: 'Not autorized' });
        }
    }

    async verifyAdmin (req: Request, res: Response, next: NextFunction) {

        if (!req.headers.token) return res.status(401).send({ message: 'No token found' });

        const response:any = await tokenService.decode(req.headers.token);
        
        if (response.rol == 1) {
            next();
        } else {
            return res.status(403).send({ message: 'Not autorized' });
        }
    }
}