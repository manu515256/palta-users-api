import {Request, Response, NextFunction} from 'express';

export interface Itoken {
    encode(a: string): Promise<string>,
    decode(a: string[] | string | undefined): Promise<string | boolean>
    simpledecode(a: string[] | string | undefined): Promise<string | boolean>
}

export interface Iauth {
    verifyGuest(a:Request, b:Response, c:NextFunction):void,
    verifyUser(a: Request, b: Response, c: NextFunction):void,
    verifyAdmin(a: Request, b: Response, c: NextFunction):void
}

