import { Router } from 'express';
import { container } from 'tsyringe';

import RequireAuthenticateMiddleware from '../../../../modules/users/infra/middlewares/RequireAuthentication';
import sessionRoutes from '../../../../modules/users/infra/routes/session.routes';
import membershipRoutes from '../../../../modules/memberships/infra/routes/membership.routes';
import studentRoutes from '../../../../modules/students/infra/routes/students.routes';
import enrollmentRouter from '../../../../modules/enrollments/infra/routes/enrollment.routes';

const router = Router();
const authMiddleware = container.resolve(RequireAuthenticateMiddleware);

router.use('/sessions', sessionRoutes);

router.use(authMiddleware.ensure.bind(authMiddleware));
router.use('/memberships', membershipRoutes);
router.use('/students', studentRoutes);
router.use('/enrollments', enrollmentRouter);

export default router;
