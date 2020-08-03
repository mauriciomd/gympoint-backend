import { Router } from 'express';
import { container } from 'tsyringe';

import RequireAuthenticateMiddleware from '../../../../modules/users/infra/middlewares/RequireAuthentication';
import sessionRoutes from '../../../../modules/users/infra/routes/session.routes';
import membershipRoutes from '../../../../modules/memberships/infra/routes/membership.routes';
import studentAdminRoutes from '../../../../modules/students/infra/routes/students.admin.routes';
import studentPublicRoutes from '../../../../modules/students/infra/routes/students.public.routes';
import enrollmentRouter from '../../../../modules/enrollments/infra/routes/enrollment.routes';
import checkinsRoutes from '../../../../modules/checkins/infra/routes/checkin.routes';
import helpOrdersPublicRoutes from '../../../../modules/helpOrders/infra/routes/helpOrders.public.routes';
import helpOrdersAdminRoutes from '../../../../modules/helpOrders/infra/routes/helpOrders.admin.routes';

const router = Router();
const authMiddleware = container.resolve(RequireAuthenticateMiddleware);

router.use('/sessions', sessionRoutes);
router.use('/checkins', checkinsRoutes);
router.use('/help-orders', helpOrdersPublicRoutes);
router.use('/students', studentPublicRoutes);

router.use(authMiddleware.ensure.bind(authMiddleware));
router.use('/memberships', membershipRoutes);
router.use('/students', studentAdminRoutes);
router.use('/enrollments', enrollmentRouter);
router.use('/help-orders', helpOrdersAdminRoutes);

export default router;
