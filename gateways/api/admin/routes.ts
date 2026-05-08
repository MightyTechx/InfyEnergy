import { Router } from 'express';

import adminControlsRoutes from './AdminControls/AdminControls.routes';
import { ADMIN_PATHS } from '@infyenergy/constants';

const router = Router();

router.use(`/${ADMIN_PATHS.ADMIN_CONTROLS}`, adminControlsRoutes);

export default router;
