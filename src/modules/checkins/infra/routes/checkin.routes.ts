import { Router } from 'express';

import CheckinController from '../controllers/CheckinController';

const router = Router();
const checkinController = new CheckinController();

router.post('/:studentId', checkinController.create);
// router.get('/:studentId', checkinController.index);

export default router;
