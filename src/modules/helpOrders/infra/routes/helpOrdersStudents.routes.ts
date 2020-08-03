import { Router } from 'express';

import HelpOrderController from '../controllers/HelpOrderController';

const router = Router();
const helpOrderController = new HelpOrderController();

router.post('/:studentId', helpOrderController.create);
// router.get('/', helpOrderController.index);

export default router;
