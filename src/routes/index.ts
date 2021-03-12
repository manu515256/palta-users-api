import routerx from 'express-promise-router';
import userRouter from './user';
import childRouter from './childs';

const router = routerx();

router.use('/user', userRouter);
router.use('/childs', childRouter);

export default router;
