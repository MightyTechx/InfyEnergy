import { Router } from 'express';

import notFoundRoutes from './NotFound/NotFound.routes';
import { CONSULTANT_PATHS } from '@infyenergy/constants';

const router = Router();

router.use(`/${CONSULTANT_PATHS.NOT_FOUND}`, notFoundRoutes);

export default router;
