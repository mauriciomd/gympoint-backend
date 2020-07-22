import { Router } from 'express';

import sessionRoutes from '../../../../modules/users/infra/routes/session.routes';

const router = Router();

router.use('/sessions', sessionRoutes);

export default router;
