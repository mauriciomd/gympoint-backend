import { Router } from 'express';
import StudentController from '../controllers/StudentController';

const router = Router();
const studentController = new StudentController();

router.post('/', studentController.create);

export default router;
