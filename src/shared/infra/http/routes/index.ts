import { Router } from 'express';

import sessionRoutes from '../../../../modules/users/infra/routes/session.routes';
import membershipRoutes from '../../../../modules/memberships/infra/routes/membership.routes';

const router = Router();

router.use('/sessions', sessionRoutes);
router.use('/memberships', membershipRoutes);

export default router;
