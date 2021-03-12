import UsuarioController from '../controller/user.controller';
import upload from '../middleware/fileHandler';
import routerx from 'express-promise-router';
import Auth from '../middleware/auth';
import {Iauth} from '../interfaces'
const usuarioController = new UsuarioController();
let auth: Iauth = new Auth();
const router = routerx();


router.put('/deactivate', auth.verifyUser, usuarioController.deactivate);
router.post('/add', upload.single('profilePic'), usuarioController.add);
router.put('/activate', auth.verifyUser, usuarioController.activate);
router.delete('/remove', auth.verifyAdmin, usuarioController.remove);
router.put('/update', auth.verifyUser, usuarioController.update);
router.get('/query', auth.verifyUser, usuarioController.query);
router.get('/list', auth.verifyAdmin, usuarioController.list);
router.post('/login', usuarioController.login);

export default router;
