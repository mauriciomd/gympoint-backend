import { Router } from 'express';
import StudentController from '../controllers/StudentController';

const router = Router();
const studentController = new StudentController();

router.post('/', studentController.create);
router.get('/', studentController.index);
router.get('/:studentId', studentController.show);
router.delete('/:studentId', studentController.delete);
router.put('/:studentId', studentController.update);

export default router;
