import { Router } from 'express';

import MembershipController from '../controllers/MembershipController';

const router = Router();
const membershipController = new MembershipController();

router.post('/', membershipController.create);
router.get('/', membershipController.index);

export default router;
