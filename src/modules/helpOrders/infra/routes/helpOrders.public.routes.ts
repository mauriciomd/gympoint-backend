import { Router } from 'express';

import HelpOrderController from '../controllers/HelpOrderController';

const router = Router();
const helpOrderController = new HelpOrderController();

router.post('/:studentId', helpOrderController.create);
router.get('/:studentId', helpOrderController.show);

export default router;
