import { Router } from 'express';
import { container } from 'tsyringe';

import RequireAuthenticateMiddleware from '../../../../modules/users/infra/middlewares/RequireAuthentication';
import sessionRoutes from '../../../../modules/users/infra/routes/session.routes';
import membershipRoutes from '../../../../modules/memberships/infra/routes/membership.routes';

const router = Router();
const authMiddleware = container.resolve(RequireAuthenticateMiddleware);

router.use('/sessions', sessionRoutes);

router.use(authMiddleware.ensure);
router.use('/memberships', membershipRoutes);

export default router;
