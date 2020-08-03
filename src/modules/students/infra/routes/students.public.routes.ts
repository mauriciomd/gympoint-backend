import { Router } from 'express';
import StudentController from '../controllers/StudentController';

const router = Router();
const studentController = new StudentController();

router.get('/show', studentController.show);

export default router;
