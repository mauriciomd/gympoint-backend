import { Router } from 'express';

import EnrollmentController from '../controllers/EnrollmentController';

const router = Router();
const enrollmentController = new EnrollmentController();

router.post('/', enrollmentController.create);
router.get('/', enrollmentController.index);
router.delete('/:enrollmentId', enrollmentController.delete);

export default router;
