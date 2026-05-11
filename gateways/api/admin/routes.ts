import { Router } from 'express';

import featureFlagsRoutes from './FeatureFlags/FeatureFlags.routes';
import { ADMIN_PATHS } from '@infygen/constants';

const router = Router();

router.use(`/${ADMIN_PATHS.FEATURE_FLAGS}`, featureFlagsRoutes);

export default router;
