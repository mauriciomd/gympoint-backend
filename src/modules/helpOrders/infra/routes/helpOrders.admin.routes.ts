import { Router } from 'express';

import HelpAnswerController from '../controllers/HelpAnswerController';

const router = Router();
const helpAnswerController = new HelpAnswerController();

router.post('/:orderId/answer', helpAnswerController.create);

export default router;
