import { Router } from 'express';

import featureFlagsRoutes from './FeatureFlags/FeatureFlags.routes';
import turbineConfigRoutes from './TurbineConfig/TurbineConfig.routes';
import chatAIRoutes from './ChatAI/ChatAI.routes';
import { ADMIN_PATHS } from '@infygen/constants';

const router = Router();

router.use(`/${ADMIN_PATHS.FEATURE_FLAGS}`, featureFlagsRoutes);
router.use(`/${ADMIN_PATHS.TURBINE_CONFIG}`, turbineConfigRoutes);
router.use('/chat', chatAIRoutes);

export default router;