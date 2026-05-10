import { Router } from 'express';

import adminControlsRoutes from './AdminControls/AdminControls.routes';
import featureFlagsRoutes from './FeatureFlags/FeatureFlags.routes';
import { ADMIN_PATHS } from '@infyenergy/constants';

const router = Router();

router.use(`/${ADMIN_PATHS.ADMIN_CONTROLS}`, adminControlsRoutes);
router.use(`/${ADMIN_PATHS.FEATURE_FLAGS}`, featureFlagsRoutes);

export default router;
