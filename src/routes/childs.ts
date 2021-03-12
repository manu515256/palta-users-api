import UsuarioController from '../controller/user.controller';
import upload from '../middleware/fileHandler';
import routerx from 'express-promise-router';
import Auth from '../middleware/auth';
import { Iauth } from '../interfaces'
const usuarioController = new UsuarioController();
let auth: Iauth = new Auth();
const router = routerx();

router.post('/add', upload.single('profilePic'), usuarioController.addchild);
router.get('/list', auth.verifyUser, usuarioController.listchilds);

export default router;
