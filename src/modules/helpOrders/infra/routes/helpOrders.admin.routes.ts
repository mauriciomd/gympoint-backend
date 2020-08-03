import { Router } from 'express';

import HelpAnswerController from '../controllers/HelpAnswerController';
import HelpOrderController from '../controllers/HelpOrderController';

const router = Router();
const helpAnswerController = new HelpAnswerController();
const helpOrderController = new HelpOrderController();

router.post('/:orderId/answer', helpAnswerController.create);
router.get('/', helpOrderController.index);

export default router;
