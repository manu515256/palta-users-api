import UsuarioController from '../controller/user.controller';
import upload from '../middleware/fileHandler';
import routerx from 'express-promise-router';
import Auth from '../middleware/auth';
import {Iauth} from '../interfaces'
const usuarioController = new UsuarioController();
let auth: Iauth = new Auth();
const router = routerx();

router.post('/addchild', upload.single('profilePic'), usuarioController.addchild);
router.get('/listchilds', auth.verifyAdmin, usuarioController.listchilds);
router.put('/deactivate', auth.verifyAdmin, usuarioController.deactivate);
router.post('/add', upload.single('profilePic'), usuarioController.add);
router.put('/activate', auth.verifyAdmin, usuarioController.activate);
router.delete('/remove', auth.verifyAdmin, usuarioController.remove);
router.put('/update', auth.verifyAdmin, usuarioController.update);
router.get('/query', auth.verifyAdmin, usuarioController.query);
router.get('/list', auth.verifyAdmin, usuarioController.list);
router.post('/login', usuarioController.login);

export default router;