import jwt from 'jsonwebtoken';
import models from '../models';
import dotenv from 'dotenv';
dotenv.config()

const SECRET_KEY = process.env.SECRETKEY;

const checkToken = async (token:string) =>{
    let __id = null;
    try{
        const {_id}:any = await jwt.decode(token);
        __id:_id;
    }catch(e){
        return false;
    }

    const user:any = await models.User.findOne({_id:__id, state:1});

    if(user){
        const token:any = jwt.sign({ _id: __id }, SECRET_KEY!, {expiresIn:'30d'});
        return {token, rol:user.rol};
    }else{
        return false;
    }
}

export default class Token{

    async encode (_id:any):Promise<string> {
        const token = await jwt.sign({ _id }, SECRET_KEY!, {expiresIn:'30d'});
        return token;
    }

    async decode(token: any): Promise<any> {
        try {
            const { _id }: any = await jwt.verify(token, SECRET_KEY!);
            const user = await models.User.findOne({_id, state:1});
            if(user) return user
            else return false

        } catch (e) {
            const newToken = await checkToken(token);
            return newToken;
        }
    }
    async simpledecode(token:any): Promise<any> {
        try {
            const decoded: any = await jwt.verify(token, SECRET_KEY!);
            return decoded

        } catch (e) {
            new Error("Cannot decode")
        }
    }
}