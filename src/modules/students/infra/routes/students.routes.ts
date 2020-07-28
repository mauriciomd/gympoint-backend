import { Router } from 'express';
import StudentController from '../controllers/StudentController';

const router = Router();
const studentController = new StudentController();

router.post('/', studentController.create);
router.get('/', studentController.index);
router.get('/:studentId', studentController.show);

export default router;
