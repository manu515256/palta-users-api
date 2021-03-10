import models from '../models';
import bcrypt from 'bcryptjs';
import Token from '../services/token';
import { Request, Response, NextFunction } from 'express';
import { Itoken } from '../interfaces'
let token: Itoken = new Token();

const DEFAULT_ERROR = 'An error ocurred in the request'

export default class UsuarioController {

    async add(req: Request, res: Response, next: NextFunction): Promise<void>  {

        try {

            if (req.file) req.body.profilepic = req.file.filename
            
            req.body.password = await bcrypt.hash(req.body.password, 10)

            const reg = await models.User.create(req.body);

            res.status(200).json(reg);

        } catch (e) {
            res.status(500).send({
                message: DEFAULT_ERROR
            });
            next(e);
        }
    }

    async addchild(req: Request, res: Response, next: NextFunction): Promise<void>  {

        try {


            const parentToken:any = await token.simpledecode(req.headers.token);
            console.log(parentToken._id)
            if (req.file) req.body.profilepic = req.file.filename
            
            req.body.parentId = parentToken._id
            req.body.password = await bcrypt.hash(req.body.password, 10)
            console.log(req.body)
            const reg = await models.Child.create(req.body);
            
            res.status(200).json(reg);
        }catch(e){
            next(e);
            res.status(500).send(DEFAULT_ERROR)
        }
    }

    async query(req: Request, res: Response, next: NextFunction): Promise<void>  {

        try {
            const reg = await models.User.findOne({ _id: req.query._id });

            if (!reg) {

                const regChild = await models.Child.find({ _id: req.query._id })
                                

                if(!regChild){
                    res.status(404).send({
                    message: 'This entry does not exist'
                    });
                    
                } else res.status(200).json(regChild)      

            } else res.status(200).json(reg);

        } catch (e) {
            res.status(500).send({
                message: DEFAULT_ERROR
            });
            next(e);
        }
    }

    async listchilds(req: Request, res: Response, next: NextFunction): Promise<void>  {

        try {

            const parentToken: any = await token.simpledecode(req.headers.token);
            
            let limit:any = req.query.limit || 10;
            let skip: any = req.query.page || 0;
            skip = skip * limit

            const reg = await models.Child.find({ parentId: parentToken._id})
                                            .sort({ 'createdAt': 1 })
                                            .limit(limit)
                                            .skip(Number(skip))
                                            .populate('user');
            res.status(200).json(reg);

        } catch (e) {
            res.status(500).send({
                message: DEFAULT_ERROR
            });
            next(e);
        }
    }

    async list(req: Request, res: Response, next: NextFunction): Promise<void>  {

        try {

            const reg = await models.User.find()
                                         .sort({ 'createdAt': -1 });
            res.status(200).json(reg);
        
        } catch (e) {
            res.status(500).send({
                message: DEFAULT_ERROR
            });
            next(e);
        }
    }

    async update (req:Request, res:Response, next:NextFunction): Promise<void>  {
        
        try {

            let pass = req.body.password;
            const reg0:any = await models.User.findOne({ _id: req.body._id });
            
            if (pass != reg0.password) {
                req.body.password = await bcrypt.hash(req.body.password, 10);
            }

            const reg = await models.User.findByIdAndUpdate({ _id: req.body._id }, 
                { rol: req.body.rol, name: req.body.name, email: req.body.email, password: req.body.password, workRole: req.body.workrole });
            
                res.status(200).json(reg);

        } catch (e) {
            res.status(500).send({
                message: DEFAULT_ERROR
            });
            next(e);
        }
    }

    async remove(req: Request, res: Response, next: NextFunction): Promise<void>   {

        try {

            const reg = await models.User.findByIdAndDelete({ _id: req.body._id });
            res.status(200).json(reg);

        } catch (e) {
            res.status(500).send({
                message: DEFAULT_ERROR
            });
            next(e);
        }
    }

    async activate(req: Request, res: Response, next: NextFunction): Promise<void>  {

        try {

            const reg = await models.User.findByIdAndUpdate({ _id: req.body._id }, { state: 1 });
            res.status(200).json(reg)
        } catch (e) {
            res.status(500).send({
                message: DEFAULT_ERROR
            });
            next(e);
        }
    }

    async deactivate(req: Request, res: Response, next: NextFunction): Promise<void>  {

        try {

            const reg = await models.User.findByIdAndUpdate({ _id: req.body._id }, { state: 0 });
            res.status(200).json(reg);

        } catch (e) {
            res.status(500).send({
                message: DEFAULT_ERROR
            });
            next(e);
        }
    }

    async login(req: Request, res: Response, next: NextFunction): Promise<void>  {

        try {

            let user:any = await models.User.findOne({ email: req.body.email, state: 1 });

            if (user) {  
                let match:any = await bcrypt.compare(req.body.password, user.password);
                if (match) {
                    let tokenReturn = await token.encode(user._id);
                    res.status(200).json({ user, tokenReturn });
                } else {
                    res.status(404).send({ message: 'Wrong password' });
                }
            } else {
                res.status(404).send({ message: 'User does not exist' })
            }

        } catch (e) {
            res.status(500).send({
                message: DEFAULT_ERROR
            });
            next(e);
        }
    }
}